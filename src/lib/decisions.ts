import { getEntries } from "@/lib/content";

export type DecisionOption = { label: string; body: string };
export type Decision = {
  hash: string;
  slug: string;
  entryTitle: string;
  year: string;
  chosen: string;
  cost: string;
  options: DecisionOption[];
};

/** FNV-1a — deterministic, not random, so the same content always gets the same hash. */
function shortHash(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

/**
 * Reshapes every <Tradeoff> already authored in the case studies' English
 * MDX into a "commit log" of decisions — same regex shape already proven in
 * scripts/postbuild.mjs's renderTradeoff/stripComponents. English-canonical,
 * like /resume.json and /llms.txt: this is a reshape of existing content, not
 * new authoring, so it isn't translated per locale.
 */
export function getDecisions(): Decision[] {
  const decisions: Decision[] = [];

  for (const entry of getEntries("work")) {
    const body = entry.text.en.content;
    const matches = body.matchAll(/<Tradeoff\s+([\s\S]*?)>([\s\S]*?)<\/Tradeoff>/g);

    for (const match of matches) {
      const [, attrs, inner] = match;
      const chosen = attrs.match(/chosen="([^"]*)"/)?.[1] ?? "";
      const cost = attrs.match(/cost="([^"]*)"/)?.[1] ?? "";
      const options = [...inner.matchAll(/<TradeoffOption\s+label="([^"]*)">([\s\S]*?)<\/TradeoffOption>/g)].map(
        ([, label, optBody]) => ({ label, body: optBody.trim().replace(/\s+/g, " ") })
      );

      decisions.push({
        hash: shortHash(`${entry.slug}:${chosen}`),
        slug: entry.slug,
        entryTitle: entry.text.en.title,
        year: entry.year,
        chosen,
        cost,
        options,
      });
    }
  }

  return decisions;
}
