// Fails the build if a work/lab entry's translation is missing or has
// structurally drifted from the English source (a translator who dropped a
// <Tradeoff> block, or kept 2 of 3 <TradeoffOption>s). Chrome-string parity
// (src/lib/i18n.ts) is already enforced by TypeScript itself — TKey requires
// every locale object to have every key, so that class of bug is already a
// compile error. This checks the gap TypeScript can't see: content.ts's
// getEntries() silently falls back to English when a <slug>.<locale>.mdx file
// or field is missing, with no warning anywhere. That silent fallback is what
// this script makes loud.
import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const COLLECTIONS = ["work", "lab"];
// Keep in sync with LOCALES in src/lib/i18n.ts (English excluded — it's the source).
const LOCALES = ["fr", "nl", "fy", "ru"];
const LOCALE_SUFFIX = /\.(fr|nl|fy|ru)\.mdx$/;

function baseFiles(dir) {
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") && !LOCALE_SUFFIX.test(f));
}

/** Counts of each custom JSX component tag (<Tradeoff, <AutonomyLadder, ...) used in an MDX body. */
function componentCounts(body) {
  const counts = {};
  for (const m of body.matchAll(/<([A-Z]\w*)(?=[\s/>])/g)) {
    counts[m[1]] = (counts[m[1]] ?? 0) + 1;
  }
  return counts;
}

const problems = [];

for (const collection of COLLECTIONS) {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) continue;

  for (const file of baseFiles(dir)) {
    const slug = file.replace(/\.mdx$/, "");
    const baseCounts = componentCounts(fs.readFileSync(path.join(dir, file), "utf8"));

    for (const locale of LOCALES) {
      const localeFile = `${slug}.${locale}.mdx`;
      const localePath = path.join(dir, localeFile);

      if (!fs.existsSync(localePath)) {
        problems.push(`${collection}/${localeFile} is missing — getEntries() will silently fall back to English`);
        continue;
      }

      const localeCounts = componentCounts(fs.readFileSync(localePath, "utf8"));
      const tags = new Set([...Object.keys(baseCounts), ...Object.keys(localeCounts)]);

      for (const tag of tags) {
        const expected = baseCounts[tag] ?? 0;
        const actual = localeCounts[tag] ?? 0;
        if (expected !== actual) {
          problems.push(
            `${collection}/${localeFile}: <${tag}> appears ${actual} time(s), but the English source has ${expected}`
          );
        }
      }
    }
  }
}

if (problems.length) {
  console.error("i18n parity check failed:");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(`i18n parity check passed: every ${COLLECTIONS.join("/")} entry has matching ${LOCALES.join("/")} translations.`);
