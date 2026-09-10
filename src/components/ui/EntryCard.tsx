"use client";

// See PageHeader.tsx for why this import exists.
import type {} from "react/canary";
import { ViewTransition } from "react";
import Link from "next/link";
import type { Entry } from "@/lib/content";
import { useLocale } from "@/lib/use-locale";

/** Large work card: index, title, tags, with an accent sweep on hover. */
export function EntryCard({ entry, index }: { entry: Entry; index: number }) {
  const { locale } = useLocale();
  const text = entry.text[locale] ?? entry.text.en;
  return (
    <Link
      href={`/${entry.collection}/${entry.slug}`}
      className="group relative block overflow-hidden p-8 md:p-10"
      data-cursor-label="View"
    >
      {/* accent sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 opacity-[0.12] transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
        style={{ background: entry.color ?? "var(--accent)" }}
      />

      <div className="relative">
        <p className="label mb-10 flex justify-between">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="text-fg-dim">{entry.year}</span>
        </p>

        <ViewTransition name={`${entry.collection}-${entry.slug}-title`}>
          <h3 className="mb-3 text-3xl tracking-tight transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-2 md:text-4xl">
            {text.title}
          </h3>
        </ViewTransition>
        <p className="mb-8 max-w-[48ch] text-fg-muted">{text.summary}</p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {text.tags.map((t) => (
              <li key={t} className="label border border-line px-2 py-1">
                {t}
              </li>
            ))}
          </ul>
          {text.role && <span className="label">{text.role}</span>}
        </div>
      </div>
    </Link>
  );
}
