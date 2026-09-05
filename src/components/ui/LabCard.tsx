"use client";

import Link from "next/link";
import type { Entry } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";
import { HudFrame } from "@/components/ui/HudFrame";

/**
 * Lab entry card. Shared by the lab index and the home teaser, which differ
 * only in the badge and whether the tag row is shown.
 */
export function LabCard({
  entry,
  badge,
  showTags = false,
}: {
  entry: Entry;
  /** Omit to use the first tag, which follows the locale. */
  badge?: string;
  showTags?: boolean;
}) {
  const { locale } = useLocale();
  const text = entry.text[locale] ?? entry.text.en;

  return (
    <HudFrame data-reveal>
      <Link href={`/lab/${entry.slug}`} className="block p-6" data-cursor-label="Open">
        <p className="label mb-6 flex justify-between">
          <span>{badge ?? text.tags[0] ?? ""}</span>
          <span className="text-fg-dim">{entry.year}</span>
        </p>
        <h3 className="mb-2 text-xl">{text.title}</h3>
        <p className="text-sm text-fg-muted">{text.summary}</p>
        {showTags && <p className="label mt-6 text-fg-dim">{text.tags.join(" · ")}</p>}
      </Link>
    </HudFrame>
  );
}
