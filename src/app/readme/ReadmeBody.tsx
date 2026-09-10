"use client";

import { TextScramble } from "@/components/motion/TextScramble";
import { useLocale } from "@/lib/use-locale";
import { pageContent } from "@/lib/page-content";

export function ReadmeBody() {
  const { locale } = useLocale();
  const { readme } = pageContent(locale);

  return (
    <div data-reveal className="prose mx-[var(--gutter)] mb-32">
      <p className="mono mb-8 text-xs text-fg-dim">
        <TextScramble key={locale} text="$ cat README.md" speed={20} />
      </p>
      {readme.map((section) => (
        <div key={section.heading}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
        </div>
      ))}
    </div>
  );
}
