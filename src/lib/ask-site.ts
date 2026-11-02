/**
 * Extractive “answers” for the bounded ask-this-site lab — BM25 retrieval only,
 * same index as Cmd+K search. No model call: stitch the top excerpts into a
 * short reply the UI can cite back to source URLs.
 */
import { search, type SearchIndex, type SearchResult } from "./search";

export type AskSiteReply = {
  citations: SearchResult[];
  /** One paragraph per distinct source (deduped by url), excerpt text only. */
  paragraphs: string[];
};

export function askSite(index: SearchIndex, query: string, limit = 5): AskSiteReply {
  const hits = search(index, query, limit);
  if (hits.length === 0) return { citations: [], paragraphs: [] };

  const seen = new Set<string>();
  const citations: SearchResult[] = [];
  const paragraphs: string[] = [];

  for (const hit of hits) {
    if (seen.has(hit.doc.url)) continue;
    seen.add(hit.doc.url);
    citations.push(hit);
    paragraphs.push(hit.excerpt);
    if (citations.length >= 4) break;
  }

  return { citations, paragraphs };
}
