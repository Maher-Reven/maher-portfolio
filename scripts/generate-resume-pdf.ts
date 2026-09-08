// Generates out/resume.pdf from the exact same content source as
// /resume.json (src/lib/site.ts + src/lib/page-content.ts) — one place
// career data lives, reshaped two ways. Run via `tsx` (not plain node) so it
// can import those .ts modules directly rather than duplicating their data;
// postbuild.mjs and check-i18n-parity.mjs avoid that on purpose since they
// don't need real type-safe data access, but the entire point here is DRY
// from the real source, so the one extra devDependency is worth it.
//
// Pure pdfkit (no headless browser) — deterministic, and its output is
// something this environment can actually verify (valid PDF header, a
// plausible file size) even without a way to render a PDF to look at it.
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { site } from "../src/lib/site";
import { pageContent } from "../src/lib/page-content";

const OUT_DIR = path.join(process.cwd(), "out");
const OUT_PATH = path.join(OUT_DIR, "resume.pdf");

const INK = "#111111";
const MUTED = "#555555";
const ACCENT = "#a855f7";
const RULE = "#dddddd";

async function main(): Promise<void> {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const content = pageContent("en");

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 56, bottom: 56, left: 56, right: 56 },
    info: { Title: `${site.name} — Résumé`, Author: site.name },
  });

  const done = new Promise<void>((resolve, reject) => {
    const stream = fs.createWriteStream(OUT_PATH);
    stream.on("finish", resolve);
    stream.on("error", reject);
    doc.pipe(stream);
  });

  // Header
  doc.font("Helvetica-Bold").fontSize(22).fillColor(INK).text(site.name);
  doc.font("Helvetica").fontSize(12).fillColor(MUTED).text(site.role);
  doc.moveDown(0.5);
  doc
    .font("Courier")
    .fontSize(8)
    .fillColor(ACCENT)
    .text([site.location, site.email, ...site.socials.map((s) => s.href)].join("   ·   "));

  doc.moveDown(1);
  doc
    .strokeColor(RULE)
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .stroke();
  doc.moveDown(1);

  // Experience
  doc.font("Courier-Bold").fontSize(11).fillColor(ACCENT).text("EXPERIENCE");
  doc.moveDown(0.6);

  for (const role of content.roles) {
    doc.font("Helvetica-Bold").fontSize(12).fillColor(INK).text(`${role.title} · ${role.org}`);
    doc.font("Helvetica").fontSize(9).fillColor(MUTED).text(`${role.period} · ${role.place}`);
    doc.moveDown(0.3);
    doc.font("Helvetica").fontSize(10).fillColor(INK);
    for (const point of role.points) {
      doc.text(`–  ${point}`, { lineGap: 2 });
    }
    doc.moveDown(0.8);
  }

  // Education
  doc.font("Courier-Bold").fontSize(11).fillColor(ACCENT).text("EDUCATION");
  doc.moveDown(0.6);
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(INK)
    .text(`${content.education.degree} · ${content.education.org}`);
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(MUTED)
    .text(`${content.education.period} · ${content.education.place} · ${content.education.detail}`);

  doc.end();
  await done;
  console.log(`generate-resume-pdf: wrote ${path.relative(process.cwd(), OUT_PATH)}`);
}

main().catch((err: unknown) => {
  console.error("generate-resume-pdf: failed", err);
  process.exit(1);
});
