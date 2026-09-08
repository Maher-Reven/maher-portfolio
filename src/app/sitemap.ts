import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getEntries } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/experience", "/lab", "/about", "/contact", "/colophon"];
  const work = getEntries("work").map((e) => `/work/${e.slug}`);
  const lab = getEntries("lab").map((e) => `/lab/${e.slug}`);

  return [...staticRoutes, ...work, ...lab].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));
}
