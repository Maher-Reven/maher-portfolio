// Fails the build if a route's first-load JS exceeds its budget. Runs after
// `next build` (which, under output:"export", also writes the static `out/`
// directory), and measures what a browser actually downloads for that
// route — every <script src> the exported HTML references — rather than
// reverse-engineering Next's internal (and Turbopack/App-Router-shaped)
// build-manifest format, which isn't a stable per-route JS listing here.
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "out";

// KB, with ~15% headroom over the size at the time this budget was set.
// Raise deliberately when a route's payload genuinely needs to grow; a CI
// failure here means "explain the regression," not "raise the number."
const BUDGETS = {
  "/": { file: "index.html", kb: 2048 },
  "/work/beyond-autocomplete": { file: "work/beyond-autocomplete.html", kb: 2048 },
  "/work/45-to-1": { file: "work/45-to-1.html", kb: 2048 },
};

function scriptFilesFor(routeFile) {
  const htmlPath = join(OUT_DIR, routeFile);
  if (!existsSync(htmlPath)) {
    throw new Error(`Expected export output at ${htmlPath} — did \`next build\` run first?`);
  }
  const html = readFileSync(htmlPath, "utf8");
  // basePath (set only in CI, see next.config.ts) prefixes the served path but
  // not the physical out/ layout, so match on the /_next/... suffix regardless
  // of what (if anything) precedes it.
  const matches = [...html.matchAll(/"[^"]*(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1]);
  return [...new Set(matches)];
}

function totalBytes(files) {
  let total = 0;
  for (const f of files) {
    const p = join(OUT_DIR, f);
    if (existsSync(p)) total += statSync(p).size;
  }
  return total;
}

let failed = false;
const rows = [];

for (const [route, budget] of Object.entries(BUDGETS)) {
  const files = scriptFilesFor(budget.file);
  const bytes = totalBytes(files);
  const kb = bytes / 1024;
  const over = kb > budget.kb;
  if (over) failed = true;
  rows.push({ route, kb: kb.toFixed(1), budget: budget.kb, status: over ? "OVER" : "ok" });
}

const width = Math.max(...rows.map((r) => r.route.length), "route".length);
console.log(`${"route".padEnd(width)}  actual (KB)  budget (KB)  status`);
for (const r of rows) {
  console.log(`${r.route.padEnd(width)}  ${r.kb.padStart(11)}  ${String(r.budget).padStart(11)}  ${r.status}`);
}

if (failed) {
  console.error("\nperf budget exceeded — see OVER rows above.");
  process.exit(1);
}
