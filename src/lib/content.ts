import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Collection = "work" | "lab";

export type Entry = {
  slug: string;
  collection: Collection;
  title: string;
  summary: string;
  year: string;
  tags: string[];
  role?: string;
  /** hex or css color used for the entry's accent */
  color?: string;
  cover?: string;
  featured?: boolean;
  order?: number;
  content: string;
};

const ROOT = path.join(process.cwd(), "content");

export function getEntries(collection: Collection): Entry[] {
  const dir = path.join(ROOT, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.mdx$/, ""),
        collection,
        title: data.title ?? file,
        summary: data.summary ?? "",
        year: String(data.year ?? ""),
        tags: data.tags ?? [],
        role: data.role,
        color: data.color,
        cover: data.cover,
        featured: data.featured ?? false,
        order: data.order ?? 999,
        content,
      } satisfies Entry;
    })
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || b.year.localeCompare(a.year));
}

export function getEntry(collection: Collection, slug: string): Entry | null {
  return getEntries(collection).find((e) => e.slug === slug) ?? null;
}
