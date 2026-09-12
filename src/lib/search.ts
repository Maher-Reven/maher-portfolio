/**
 * Hand-rolled BM25 — a real ranking algorithm, not a substring match and not
 * a dependency, at a corpus size (tens of documents per locale) where a
 * search library isn't actually earned. Runs entirely client-side against
 * the static index scripts/build-search-index.ts generates.
 */

export type SearchDoc = {
  id: string;
  title: string;
  section?: string;
  url: string;
  text: string;
};

export type SearchResult = {
  doc: SearchDoc;
  score: number;
  excerpt: string;
};

export type SearchIndex = {
  docs: SearchDoc[];
  docTokens: string[][];
  docFreq: Map<string, number>;
  avgDocLength: number;
};

const K1 = 1.2;
const B = 0.75;

// A small multi-language function-word list, not per-locale (tokenize() doesn't
// know which locale it's processing). At this corpus size (tens of docs), IDF
// alone doesn't push common words like "how"/"do"/"you" down far enough —
// without this, a natural-language question scores mostly on its stopwords
// instead of its actual subject.
const STOPWORDS = new Set(
  [
    "the a an is are was were be been being do does did doing how what why who when where which",
    "you your yours i me my mine we our ours to of in on for with and or but not no so if then than",
    "this that these those it its as at by from",
    "le la les un une de du des et ou que qui ce cette pour dans avec comment pourquoi vous votre je",
    "de het een en van in op voor met dat die wat hoe waarom je jouw ik",
    "en het in op foar mei dat dy wat hoe wêrom do dyn ik",
    "и в на с что как почему вы ваш я для от это",
  ].join(" ").split(" ")
);

/** Unicode-aware — letters/numbers in any script, so fr/nl/fy/ru tokenize correctly too. */
function tokenize(text: string): string[] {
  const tokens = text.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [];
  return tokens.filter((t) => !STOPWORDS.has(t));
}

export function buildIndex(docs: SearchDoc[]): SearchIndex {
  const docTokens = docs.map((d) => tokenize(`${d.title} ${d.section ?? ""} ${d.text}`));

  const docFreq = new Map<string, number>();
  for (const tokens of docTokens) {
    for (const term of new Set(tokens)) {
      docFreq.set(term, (docFreq.get(term) ?? 0) + 1);
    }
  }

  const totalLength = docTokens.reduce((sum, tokens) => sum + tokens.length, 0);
  const avgDocLength = totalLength / Math.max(1, docTokens.length);

  return { docs, docTokens, docFreq, avgDocLength };
}

export function search(index: SearchIndex, query: string, limit = 8): SearchResult[] {
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) return [];

  const N = index.docs.length;
  const scores = new Array(N).fill(0);

  for (const term of new Set(queryTerms)) {
    const n = index.docFreq.get(term) ?? 0;
    if (n === 0) continue;
    const idf = Math.log((N - n + 0.5) / (n + 0.5) + 1);

    for (let i = 0; i < N; i++) {
      const tokens = index.docTokens[i];
      if (tokens.length === 0) continue;
      let freq = 0;
      for (const t of tokens) if (t === term) freq++;
      if (freq === 0) continue;

      const denom = freq + K1 * (1 - B + (B * tokens.length) / index.avgDocLength);
      scores[i] += idf * ((freq * (K1 + 1)) / denom);
    }
  }

  return scores
    .map((score, i) => ({ score, doc: index.docs[i] }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score, doc }) => ({ score, doc, excerpt: buildExcerpt(doc.text, queryTerms) }));
}

function buildExcerpt(text: string, queryTerms: string[], radius = 80): string {
  const lower = text.toLowerCase();
  let hitIndex = -1;
  for (const term of queryTerms) {
    const idx = lower.indexOf(term);
    if (idx !== -1 && (hitIndex === -1 || idx < hitIndex)) hitIndex = idx;
  }

  if (hitIndex === -1) {
    return text.length > radius * 2 ? `${text.slice(0, radius * 2).trim()}…` : text;
  }

  const start = Math.max(0, hitIndex - radius);
  const end = Math.min(text.length, hitIndex + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return prefix + text.slice(start, end).trim() + suffix;
}
