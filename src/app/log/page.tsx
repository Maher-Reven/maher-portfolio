import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { HudFrame } from "@/components/ui/HudFrame";
import { LogCommitHash } from "@/components/ui/LogCommitHash";
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
          <HudFrame key={d.hash} id={d.hash} data-reveal className="scroll-mt-28 p-6 md:p-8">
            <p className="mono text-xs text-fg-dim">
              commit <LogCommitHash hash={d.hash} />
            </p>
            <p className="mono text-xs text-fg-dim">
              <Tr k="log.from" />{" "}
              <Link
                href={`/work/${d.slug}`}
                className="text-fg underline decoration-line-strong underline-offset-2 transition-colors hover:text-accent hover:decoration-accent/50"
              >
                {d.entryTitle}
              </Link>
              {" · "}
              {d.year}
            </p>

            <p className="mt-4 pl-4 text-base text-fg">{stripChosenSuffix(d.chosen)}</p>

            <div className="mono mt-4 space-y-2 pl-4 text-xs">
              <p className="label mb-2 text-fg-dim">
                <Tr k="tradeoff.options" />
              </p>
              {d.options.map((o) => {
                const isChosen = o.label === d.chosen;
                return (
                  <div
                    key={o.label}
                    className={
                      isChosen
                        ? "border-l-2 border-accent bg-accent/5 py-2 pl-3"
                        : "border-l-2 border-line py-2 pl-3"
                    }
                  >
                    <p className={isChosen ? "text-accent" : "text-fg-dim line-through decoration-fg-dim/40"}>
                      <span aria-hidden className="select-none">
                        {isChosen ? "+ " : "- "}
                      </span>
                      {stripChosenSuffix(o.label)}
                      {isChosen && (
                        <span className="ml-2 no-underline">
                          {"← "}
                          <Tr k="log.chosen" />
                        </span>
                      )}
                    </p>
                    {o.body && (
                      <p
                        className={
                          isChosen
                            ? "mt-1 text-sm leading-relaxed text-fg-muted"
                            : "mt-1 leading-relaxed text-fg-dim/70 line-through decoration-fg-dim/25"
                        }
                      >
                        {o.body}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="mt-4 pl-4 text-sm leading-relaxed text-fg-muted">{d.cost}</p>

            <p className="mt-6 pl-4">
              <Link href={`/work/${d.slug}`} className="label hover:text-fg">
                <Tr k="log.viewCaseStudy" /> →
              </Link>
            </p>
          </HudFrame>
        ))}
      </Reveal>
    </>
  );
}
