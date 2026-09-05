"use client";

import { HudFrame } from "@/components/ui/HudFrame";
import { Reveal } from "@/components/motion/Reveal";
import { Tr } from "@/components/i18n/Tr";
import { useLocale } from "@/lib/use-locale";
import { pageContent } from "@/lib/page-content";

export function ExperienceList() {
  const { locale } = useLocale();
  const { roles, education } = pageContent(locale);

  return (
    <>
      <Reveal className="mx-[var(--gutter)] mb-16 flex flex-col gap-4" stagger={0.08}>
        {roles.map((r) => (
          <HudFrame key={r.org + r.period} data-reveal className="p-6 md:p-8">
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
              <h3 className="text-xl md:text-2xl">
                {r.title} <span className="text-fg-dim">· {r.org}</span>
              </h3>
              <p className="label shrink-0 text-fg-dim">{r.period}</p>
            </div>
            <p className="label mt-1 text-fg-dim">{r.place}</p>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              {r.points.map((p) => (
                <li key={p.slice(0, 24)} className="flex gap-3">
                  <span className="mt-[0.5em] h-1 w-1 shrink-0 bg-accent" aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </HudFrame>
        ))}
      </Reveal>

      <Reveal className="mx-[var(--gutter)] mb-32">
        <HudFrame data-reveal className="p-6 md:p-8">
          <p className="label mb-2 text-accent">
            <Tr k="page.experience.education" />
          </p>
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
            <h3 className="text-xl md:text-2xl">
              {education.degree} <span className="text-fg-dim">· {education.org}</span>
            </h3>
            <p className="label shrink-0 text-fg-dim">{education.period}</p>
          </div>
          <p className="label mt-1 text-fg-dim">
            {education.place} · {education.detail}
          </p>
        </HudFrame>
      </Reveal>
    </>
  );
}
