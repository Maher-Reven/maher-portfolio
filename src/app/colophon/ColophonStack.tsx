"use client";

import { HudFrame } from "@/components/ui/HudFrame";
import { Reveal } from "@/components/motion/Reveal";
import { useLocale } from "@/lib/use-locale";
import { pageContent } from "@/lib/page-content";

export function ColophonStack() {
  const { locale } = useLocale();
  const { colophon } = pageContent(locale);

  return (
    <Reveal className="mx-[var(--gutter)] mb-32 grid gap-px bg-line md:grid-cols-2" stagger={0.06}>
      {colophon.map(([k, v]) => (
        <HudFrame key={k} data-reveal className="!border-0 bg-bg p-6">
          <p className="label mb-2 text-accent">{k}</p>
          <p className="text-fg-muted">{v}</p>
        </HudFrame>
      ))}
    </Reveal>
  );
}
