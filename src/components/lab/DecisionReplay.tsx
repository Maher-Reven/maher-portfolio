"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/motion";
import { HudFrame } from "@/components/ui/HudFrame";
import { LeadershipNote } from "@/components/ui/LeadershipNote";
import { Tr } from "@/components/i18n/Tr";
import { useLocale } from "@/lib/use-locale";
import type { TKey } from "@/lib/i18n";

/** Same hash as getDecisions() for the Beyond autocomplete tradeoff. */
const LOG_HASH = "a1495e7";

type Choice = "perEngineer" | "mandated" | "shared";
type Step = "intro" | "fork" | "outcome" | "close";

const STEP_ORDER: Step[] = ["intro", "fork", "outcome", "close"];

const OPTION_KEYS: { id: Choice; label: TKey; desc: TKey }[] = [
  {
    id: "perEngineer",
    label: "replay.option.perEngineer.label",
    desc: "replay.option.perEngineer.desc",
  },
  {
    id: "mandated",
    label: "replay.option.mandated.label",
    desc: "replay.option.mandated.desc",
  },
  {
    id: "shared",
    label: "replay.option.shared.label",
    desc: "replay.option.shared.desc",
  },
];

/**
 * Branching replay of the Beyond autocomplete governance tradeoff — four screens,
 * three forks, one leadership close. Fiction labeled; links out to the case study and /log.
 */
export function DecisionReplay() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<Step>("intro");
  const [choice, setChoice] = useState<Choice | null>(null);

  const stepIndex = STEP_ORDER.indexOf(step);

  useGSAP(
    () => {
      if (reduced || !panelRef.current) return;
      gsap.fromTo(panelRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45 });
    },
    { dependencies: [step, reduced] }
  );

  const go = (next: Step) => {
    if (!reduced && panelRef.current) {
      gsap.to(panelRef.current, {
        opacity: 0,
        y: -6,
        duration: 0.2,
        onComplete: () => setStep(next),
      });
    } else {
      setStep(next);
    }
  };

  const pick = (id: Choice) => {
    setChoice(id);
    go("outcome");
  };

  const outcomeTitle = choice ? (`replay.outcome.${choice}.title` as TKey) : "replay.outcome.shared.title";
  const outcomeBody = choice ? (`replay.outcome.${choice}.body` as TKey) : "replay.outcome.shared.body";

  return (
    <HudFrame className="my-10 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3 sm:px-6">
        <span className="label text-fg-dim">
          <Tr k="replay.simulated" />
        </span>
        <span className="mono text-xs text-fg-dim">
          <Tr k="replay.step" /> {stepIndex + 1} / {STEP_ORDER.length}
        </span>
      </div>

      <div ref={panelRef} className="p-4 sm:p-8">
        {step === "intro" && (
          <>
            <h3 className="mono text-sm text-accent">{t("replay.intro.title")}</h3>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">{t("replay.intro.body")}</p>
            <button
              type="button"
              className="label mt-8 border border-line px-4 py-2 text-fg transition-colors hover:border-accent hover:text-accent"
              onClick={() => go("fork")}
            >
              <Tr k="replay.continue" />
            </button>
          </>
        )}

        {step === "fork" && (
          <>
            <h3 className="mono text-sm text-accent">{t("replay.fork.title")}</h3>
            <p className="mt-2 text-xs text-fg-dim">{t("replay.fork.hint")}</p>
            <ul className="mt-6 space-y-3">
              {OPTION_KEYS.map((opt) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    className="w-full border border-line px-4 py-3 text-left transition-colors hover:border-accent"
                    onClick={() => pick(opt.id)}
                  >
                    <span className="mono block text-xs text-fg">{t(opt.label)}</span>
                    <span className="mt-1 block text-sm text-fg-muted">{t(opt.desc)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {step === "outcome" && choice && (
          <>
            <h3 className="mono text-sm text-accent">{t(outcomeTitle)}</h3>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">{t(outcomeBody)}</p>
            {choice === "shared" && (
              <p className="mt-4 border-l-2 border-accent pl-4 text-sm text-fg-muted">
                {t("replay.outcome.shared.cost")}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              {choice !== "shared" && (
                <button
                  type="button"
                  className="label border border-line px-4 py-2 text-fg-dim transition-colors hover:border-line-strong hover:text-fg"
                  onClick={() => go("fork")}
                >
                  <Tr k="replay.back" />
                </button>
              )}
              <button
                type="button"
                className="label border border-line px-4 py-2 text-fg transition-colors hover:border-accent hover:text-accent"
                onClick={() => go("close")}
              >
                <Tr k="replay.continue" />
              </button>
            </div>
          </>
        )}

        {step === "close" && (
          <>
            <h3 className="mono text-sm text-accent">{t("replay.end.title")}</h3>
            <LeadershipNote>
              <Tr k="replay.leadership.body" />
            </LeadershipNote>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <Link
                href="/work/beyond-autocomplete"
                className="mono text-accent underline-offset-4 hover:underline"
              >
                <Tr k="replay.link.caseStudy" /> →
              </Link>
              <Link
                href={`/log#${LOG_HASH}`}
                className="mono text-accent underline-offset-4 hover:underline"
              >
                <Tr k="replay.link.log" /> →
              </Link>
            </div>
            <button
              type="button"
              className="label mt-8 border border-line px-4 py-2 text-fg-dim transition-colors hover:border-line-strong hover:text-fg"
              onClick={() => {
                setChoice(null);
                setStep("intro");
              }}
            >
              <Tr k="replay.restart" />
            </button>
          </>
        )}
      </div>
    </HudFrame>
  );
}
