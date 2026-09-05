"use client";

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
};

export function PageHeader({ code, tk, label, title, intro }: Props) {
  const { t } = useLocale();

  const resolvedLabel = tk ? t(`page.${tk}.label` as TKey) : label ?? "";
  const resolvedTitle = tk ? t(`page.${tk}.title` as TKey) : title ?? "";
  const resolvedIntro = tk ? t(`page.${tk}.intro` as TKey) : intro;

  return (
    <header className="px-[var(--gutter)] pb-16 pt-36">
      <p className="label mb-4">
        <span className="text-accent">{code}</span>
        {" // "}
        {resolvedLabel}
      </p>
      <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.04em]">
        {/* keyed on the resolved text so the scramble replays when the locale
            changes, rather than keeping the previous language's glyphs */}
        <TextScramble key={resolvedTitle} text={resolvedTitle} speed={30} />
      </h1>
      {resolvedIntro && (
        <p className="mt-6 max-w-[52ch] text-lg text-fg-muted">{resolvedIntro}</p>
      )}
    </header>
  );
}
