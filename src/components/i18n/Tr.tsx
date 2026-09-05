"use client";

import { TextScramble } from "@/components/motion/TextScramble";
import { useLocale } from "@/lib/use-locale";
import type { TKey } from "@/lib/i18n";

/**
 * Inline translated text. The locale only exists in the browser, so this is the
 * seam that lets server-rendered pages carry translatable strings without
 * turning every page into a client component.
 */
export function Tr({ k }: { k: TKey }) {
  const { t } = useLocale();
  return <>{t(k)}</>;
}

/**
 * TextScramble needs the resolved string as a value, not a node. Keyed on the
 * text so switching language replays the scramble instead of leaving the
 * previous language's glyphs in place.
 */
export function ScrambleT({
  k,
  as,
  className,
  speed,
  delay,
}: {
  k: TKey;
  as?: "span" | "div";
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const { t } = useLocale();
  const text = t(k);
  return (
    <TextScramble key={text} text={text} as={as} className={className} speed={speed} delay={delay} />
  );
}
