// Writes a plain-markdown twin of every work/lab entry into the static export
// (out/work/<slug>.md, out/lab/<slug>.md) — for /llms.txt, and for anyone who'd
// rather paste prose into an LLM than have it render JSX. Runs after `next
// build` as part of the `build` script; also doubles as a content-integrity
// check (one non-empty twin per published entry), failing the build if one's
// missing.
//
// Plain JS reading MDX directly via gray-matter, rather than importing
// src/lib/content.ts (a .ts module a plain `node` invocation can't require
// without a loader) — duplicates only the handful of lines that matter here.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const OUT_DIR = path.join(ROOT, "out");
const COLLECTIONS = ["work", "lab"];

// Keep in sync with LOCALES in src/lib/i18n.ts — only used to recognise (and
// skip) translated MDX files, since the markdown twin is English-canonical.
const LOCALE_SUFFIX = /\.(fr|nl|fy|ru)\.mdx$/;

function baseFiles(dir) {
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") && !LOCALE_SUFFIX.test(f));
}

/** Turns each <AutonomyTier label="..">body</AutonomyTier> into a numbered line. */
function renderLadder(inner) {
  const tiers = [...inner.matchAll(/<AutonomyTier\s+label="([^"]*)">([\s\S]*?)<\/AutonomyTier>/g)].map(
    ([, label, body]) => ({ label, body: body.trim().replace(/\s+/g, " ") })
  );
  return tiers.map((t, i) => `${i + 1}. **${t.label}** — ${t.body}`).join("\n");
}

/** Turns one <TradeoffOption label="..">body</TradeoffOption> into a bullet. */
function renderTradeoff(attrs, inner) {
  const chosen = attrs.match(/chosen="([^"]*)"/)?.[1] ?? "";
  const cost = attrs.match(/cost="([^"]*)"/)?.[1] ?? "";
  const options = [...inner.matchAll(/<TradeoffOption\s+label="([^"]*)">([\s\S]*?)<\/TradeoffOption>/g)].map(
    ([, label, body]) => ({ label, body: body.trim().replace(/\s+/g, " ") })
  );

  const lines = ["**Options considered:**", ""];
  for (const o of options) {
    const alreadyMarked = /\(chosen\)/i.test(o.label);
    const mark = o.label === chosen && !alreadyMarked ? " — **chosen**" : "";
    lines.push(`- **${o.label}**${mark}: ${o.body}`);
  }
  lines.push("", `**Cost:** ${cost}`);
  return lines.join("\n");
}

// One entry per self-closing interactive component registered in
// src/components/ui/Mdx.tsx — add a line here whenever a new one is added,
// or its raw JSX tag leaks unrendered into the markdown twin.
const SELF_CLOSING_NOTES = {
  SystemsCollapse: "interactive: systems-collapse diagram — see the live page",
  SplineSceneDemo: "interactive: 3D scene — see the live page",
  GenerativeMark: "interactive: generative mark, redrawn each load — see the live page",
  AudioVisualizer: "interactive: microphone-driven frequency visualizer — see the live page",
  AsciiWebcam: "interactive: live camera feed rendered as ASCII — see the live page",
};

/** Replaces the site's interactive MDX components with plain-text prose. */
function stripComponents(body) {
  let out = body;
  for (const [tag, note] of Object.entries(SELF_CLOSING_NOTES)) {
    out = out.replace(new RegExp(`<${tag}\\s*/>`, "g"), `*[${note}]*`);
  }
  out = out.replace(/<Retro>\n?([\s\S]*?)\n?<\/Retro>/g, (_, inner) => inner.trim());
  out = out.replace(/<Tradeoff\s+([\s\S]*?)>([\s\S]*?)<\/Tradeoff>/g, (_, attrs, inner) => renderTradeoff(attrs, inner));
  out = out.replace(/<AutonomyLadder>\n?([\s\S]*?)\n?<\/AutonomyLadder>/g, (_, inner) => renderLadder(inner));
  return out;
}

function frontmatterBlock({ title, summary, year, role, tags }) {
  const meta = [year, role].filter(Boolean).join(" · ");
  return [
    `# ${title}`,
    "",
    summary ? `> ${summary}` : "",
    meta ? meta : "",
    Array.isArray(tags) && tags.length ? tags.join(", ") : "",
    "",
    "---",
    "",
  ]
    .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
    .join("\n");
}

const missing = [];

for (const collection of COLLECTIONS) {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) continue;

  for (const file of baseFiles(dir)) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);

    const header = frontmatterBlock({
      title: data.title ?? slug,
      summary: data.summary,
      year: data.year,
      role: data.role,
      tags: data.tags,
    });
    const body = stripComponents(content).trim();

    const outPath = path.join(OUT_DIR, collection, `${slug}.md`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, `${header}\n${body}\n`);

    if (fs.statSync(outPath).size === 0) missing.push(outPath);
  }
}

if (missing.length) {
  console.error("postbuild: missing or empty markdown twin(s):");
  for (const m of missing) console.error(`  - ${m}`);
  process.exit(1);
}

console.log(`postbuild: wrote markdown twins for ${COLLECTIONS.join(", ")} entries.`);
