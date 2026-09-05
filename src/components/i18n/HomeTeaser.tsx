"use client";

import { useLocale } from "@/lib/use-locale";
import { pageContent } from "@/lib/page-content";

export function HomeTeaser() {
  const { locale } = useLocale();
  return (
    <p className="text-2xl leading-snug tracking-tight md:text-3xl">
      {pageContent(locale).homeTeaser}
    </p>
  );
}
