"use client";

// Side-effect import: pulls in the ViewTransition type augmentation for
// "react" (React canary feature, bundled internally by Next's App Router
// even though node_modules/react itself is stable — see
// node_modules/@types/react/canary.d.ts for the three documented ways to
// load these types; this is the one that needs no tsconfig change).
import type {} from "react/canary";
import { ViewTransition } from "react";
import { TextScramble } from "@/components/motion/TextScramble";
import { useLocale } from "@/lib/use-locale";
import type { TKey } from "@/lib/i18n";

type Props = {
  code: string;
  /**
   * Translation key base for a static page, e.g. "work" reads page.work.label /
   * .title / .intro. Entry pages pass raw label/title/intro instead, since their
   * text comes from MDX front-matter and isn't translated.
   */
  tk?: string;
  label?: string;
  title?: string;
  intro?: string;
  /** Entry pages pass a stable id (e.g. "work-45-to-1-title") shared with the
   * matching list card, so the browser morphs one into the other on
   * navigation instead of cutting between them. */
  viewTransitionName?: string;
};

export function PageHeader({ code, tk, label, title, intro, viewTransitionName }: Props) {
  const { t } = useLocale();

  const resolvedLabel = tk ? t(`page.${tk}.label` as TKey) : label ?? "";
  const resolvedTitle = tk ? t(`page.${tk}.title` as TKey) : title ?? "";
  const resolvedIntro = tk ? t(`page.${tk}.intro` as TKey) : intro;

  const heading = (
    <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.04em]">
      {/* keyed on the resolved text so the scramble replays when the locale
          changes, rather than keeping the previous language's glyphs */}
      <TextScramble key={resolvedTitle} text={resolvedTitle} speed={30} />
    </h1>
  );

  return (
    <header className="px-[var(--gutter)] pb-16 pt-36">
      <p className="label mb-4">
        <span className="text-accent">{code}</span>
        {" // "}
        {resolvedLabel}
      </p>
      {viewTransitionName ? (
        <ViewTransition name={viewTransitionName}>{heading}</ViewTransition>
      ) : (
        heading
      )}
      {resolvedIntro && (
        <p className="mt-6 max-w-[52ch] text-lg text-fg-muted">{resolvedIntro}</p>
      )}
    </header>
  );
}
