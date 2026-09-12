// Generates public/search-index.<locale>.json — one static, fetchable index
// per locale, built from the exact same content sources /resume.json and
// /llms.txt already reshape (not a duplicated copy). Runs via tsx, before
// `next build`, so the static export picks the files up from public/ like
// any other static asset. Gitignored: regenerated on every build, same as
// out/.
import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { getEntries, type Entry, type Collection } from "../src/lib/content";
import { getDecisions } from "../src/lib/decisions";
import { pageContent } from "../src/lib/page-content";
import { LOCALES, type Locale } from "../src/lib/i18n";

type SearchDoc = {
  id: string;
  title: string;
  section?: string;
  url: string;
  text: string;
};

type Section = { heading: string; text: string; anchor?: string };

function cleanText(raw: string): string {
  return raw
    .replace(/<\/?[A-Za-z][\s\S]*?>/g, " ") // JSX/HTML tags — leaves inner text
    .replace(/```\w*\n?|```/g, " ") // fenced code delimiters, keep the content
    .replace(/[#*_`>]/g, "") // remaining markdown emphasis/heading marks
    .replace(/\s+/g, " ")
    .trim();
}

/** Splits an MDX body on ## headings, mirroring rehype-slug's per-file anchors. */
function splitSections(body: string): Section[] {
  const parts = body.split(/^## (.+)$/m);
  const slugger = new GithubSlugger();
  const sections: Section[] = [];

  const intro = cleanText(parts[0] ?? "");
  if (intro) sections.push({ heading: "", text: intro });

  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i].trim();
    const text = cleanText(parts[i + 1] ?? "");
    sections.push({ heading, text, anchor: slugger.slug(heading) });
  }
  return sections;
}

function docsForEntry(entry: Entry, locale: Locale, collection: Collection): SearchDoc[] {
  const text = entry.text[locale] ?? entry.text.en;
  const baseUrl = `/${collection}/${entry.slug}`;
  const docs: SearchDoc[] = [
    {
      id: `${collection}-${entry.slug}-summary`,
      title: text.title,
      url: baseUrl,
      text: [text.title, text.summary, text.tags.join(" ")].join(" "),
    },
  ];

  for (const section of splitSections(text.content)) {
    if (!section.text) continue;
    docs.push({
      id: `${collection}-${entry.slug}-${section.anchor ?? "intro"}`,
      title: text.title,
      section: section.heading || undefined,
      url: section.anchor ? `${baseUrl}#${section.anchor}` : baseUrl,
      text: section.text,
    });
  }
  return docs;
}

/** English-only (decisions.ts reshapes the English MDX source), included in
 * every locale's index deliberately — same tradeoff /resume.json and
 * /llms.txt already make elsewhere on this site. */
function docsForDecisions(): SearchDoc[] {
  return getDecisions().map((d) => ({
    id: `log-${d.hash}`,
    title: d.entryTitle,
    section: "Decision log",
    url: `/log#${d.hash}`,
    text: [d.chosen, d.cost, ...d.options.map((o) => `${o.label} ${o.body}`)].join(" "),
  }));
}

function docsForReadme(locale: Locale): SearchDoc[] {
  return pageContent(locale).readme.map((section, i) => ({
    id: `readme-${i}`,
    title: section.heading,
    section: "README",
    url: "/readme",
    text: section.body,
  }));
}

function buildLocaleIndex(locale: Locale): SearchDoc[] {
  const work = getEntries("work").flatMap((e) => docsForEntry(e, locale, "work"));
  const lab = getEntries("lab").flatMap((e) => docsForEntry(e, locale, "lab"));
  return [...work, ...lab, ...docsForDecisions(), ...docsForReadme(locale)];
}

const OUT_DIR = path.join(process.cwd(), "public");
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const locale of LOCALES) {
  const docs = buildLocaleIndex(locale);
  const outPath = path.join(OUT_DIR, `search-index.${locale}.json`);
  fs.writeFileSync(outPath, JSON.stringify(docs));
  console.log(`build-search-index: wrote ${docs.length} documents to ${path.relative(process.cwd(), outPath)}`);
}
