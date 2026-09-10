import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { HudFrame } from "@/components/ui/HudFrame";
import { Reveal } from "@/components/motion/Reveal";
import { Tr } from "@/components/i18n/Tr";
import { getDecisions } from "@/lib/decisions";

export const metadata: Metadata = { title: "Decision log" };

const stripChosenSuffix = (label: string) => label.replace(/\s*\(chosen\)\s*$/i, "");

export default function LogPage() {
  const decisions = getDecisions();

  return (
    <>
      <PageHeader code="LOG" tk="log" />
      <Reveal className="mx-[var(--gutter)] mb-32 flex flex-col gap-6" stagger={0.1}>
        {decisions.map((d) => (
          <HudFrame key={d.hash} data-reveal className="p-6 md:p-8">
            <p className="mono text-xs text-fg-dim">
              commit <span className="text-fg">{d.hash}</span>
            </p>
            <p className="mono text-xs text-fg-dim">
              Date:{"   "}
              <span className="text-fg">
                {d.year} · {d.entryTitle}
              </span>
            </p>
            <p className="mt-4 pl-4 text-base text-fg">{stripChosenSuffix(d.chosen)}</p>

            <div className="mono mt-4 space-y-1 pl-4 text-xs">
              {d.options.map((o) => {
                const isChosen = o.label === d.chosen;
                return (
                  <p key={o.label} className={isChosen ? "text-accent" : "text-fg-dim"}>
                    {isChosen ? "+ " : "- "}
                    {stripChosenSuffix(o.label)}
                    {isChosen && (
                      <span className="ml-2">
                        {"← "}
                        <Tr k="log.chosen" />
                      </span>
                    )}
                  </p>
                );
              })}
            </div>

            <p className="mt-4 pl-4 text-sm leading-relaxed text-fg-muted">{d.cost}</p>
          </HudFrame>
        ))}
      </Reveal>
    </>
  );
}
