import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { LOCALES, type Locale } from "@/lib/i18n";

export type Collection = "work" | "lab";

/** The parts of an entry that differ per language. */
export type EntryText = {
  title: string;
  summary: string;
  role?: string;
  tags: string[];
  content: string;
};

export type Entry = {
  slug: string;
  collection: Collection;
  /** Language-independent metadata. */
  year: string;
  color?: string;
  cover?: string;
  featured?: boolean;
  order?: number;
  /** Every locale, so the client can switch without a round trip. */
  text: Record<Locale, EntryText>;
};

const ROOT = path.join(process.cwd(), "content");

/**
 * `<slug>.mdx` is English; `<slug>.<locale>.mdx` overrides it. A missing
 * translation falls back to English rather than rendering an empty page, so a
 * new entry is publishable before it has been translated.
 */
function read(dir: string, file: string): { data: Record<string, unknown>; content: string } | null {
  const full = path.join(dir, file);
  if (!fs.existsSync(full)) return null;
  const { data, content } = matter(fs.readFileSync(full, "utf8"));
  return { data, content };
}

function toText(
  parsed: { data: Record<string, unknown>; content: string },
  fallbackFile: string
): EntryText {
  const d = parsed.data;
  return {
    title: (d.title as string) ?? fallbackFile,
    summary: (d.summary as string) ?? "",
    role: d.role as string | undefined,
    tags: (d.tags as string[]) ?? [],
    content: parsed.content,
  };
}

export function getEntries(collection: Collection): Entry[] {
  const dir = path.join(ROOT, collection);
  if (!fs.existsSync(dir)) return [];

  const localeSuffix = new RegExp(`\\.(${LOCALES.filter((l) => l !== "en").join("|")})\\.mdx$`);

  const baseFiles = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") && !localeSuffix.test(f));

  return baseFiles
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const base = read(dir, file)!;
      const en = toText(base, file);

      const text = { en } as Record<Locale, EntryText>;
      for (const locale of LOCALES) {
        if (locale === "en") continue;
        const translated = read(dir, `${slug}.${locale}.mdx`);
        text[locale] = translated ? toText(translated, file) : en;
      }

      const d = base.data;
      return {
        slug,
        collection,
        year: String(d.year ?? ""),
        color: d.color as string | undefined,
        cover: d.cover as string | undefined,
        featured: (d.featured as boolean) ?? false,
        order: (d.order as number) ?? 999,
        text,
      } satisfies Entry;
    })
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || b.year.localeCompare(a.year));
}

export function getEntry(collection: Collection, slug: string): Entry | null {
  return getEntries(collection).find((e) => e.slug === slug) ?? null;
}
