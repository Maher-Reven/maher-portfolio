import { site } from "@/lib/site";
import { getEntries } from "@/lib/content";

// Static under output:"export" — no dynamic functions (params, headers,
// cookies), so Next emits this as a literal file in out/.
export const dynamic = "force-static";

/**
 * A structured briefing for AI crawlers and agents, in the same spirit as the
 * AGENTS.md joke this repo ships for coding agents — the payload here is
 * sincere: a clean summary plus links to the plain-markdown twin of every
 * case study (see scripts/postbuild.mjs), for anyone that would rather read
 * prose than render JSX.
 */
export async function GET() {
  const work = getEntries("work");
  const lab = getEntries("lab");

  const lines = [
    `# ${site.name}`,
    `> ${site.role} — ${site.tagline}`,
    "",
    `Based in ${site.location}. Contact: ${site.email}`,
    "",
    "## Work",
    ...work.map((e) => `- ${e.text.en.title} — ${site.url}/work/${e.slug} (plain text: ${site.url}/work/${e.slug}.md)`),
    "",
    "## Lab",
    ...lab.map((e) => `- ${e.text.en.title} — ${site.url}/lab/${e.slug}`),
    "",
    "## Other",
    `- About: ${site.url}/about`,
    `- Experience: ${site.url}/experience`,
    `- Machine-readable résumé (JSON Resume format): ${site.url}/resume.json`,
    "",
    "Every case study under /work has a plain-markdown twin at the same path with",
    "a .md extension, generated from the same source as the live page.",
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
