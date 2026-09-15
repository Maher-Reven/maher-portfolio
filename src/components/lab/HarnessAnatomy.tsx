"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/motion";
import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";
import { useLocale } from "@/lib/use-locale";
import type { TKey } from "@/lib/i18n";

type LayerKey =
  | "model"
  | "loop"
  | "tools"
  | "permissions"
  | "context"
  | "subagents"
  | "environment";

/** Innermost first — how the harness actually wraps the model. */
const LAYERS: LayerKey[] = ["model", "loop", "tools", "permissions", "context", "subagents", "environment"];

/** Outermost first — the order the X-ray scrub scans through, Environment down to Model. */
const SCAN_ORDER = [...LAYERS].reverse();

const SQUARE_KEYS = SCAN_ORDER.filter((k): k is Exclude<LayerKey, "model"> => k !== "model");
const INSET_STEP = 7; // percent, per square layer, nested outward-in

function insetFor(key: (typeof SQUARE_KEYS)[number]): number {
  return SQUARE_KEYS.indexOf(key) * INSET_STEP;
}

/**
 * EXP-007. The model is a stateless function; everything that makes it "agentic" is
 * harness wrapped around it. Scroll through this like a CT scan — Environment down to
 * the Model core — each threshold crossed brightens a layer and appends a log line.
 * Plain HTML/CSS + one GSAP scrollTrigger-scrubbed timeline, no WebGL: the mechanic is
 * the same sticky-host-over-a-tall-scroll-track SystemsCollapse uses, just without Three.
 */
export function HarnessAnatomy() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<Partial<Record<Exclude<LayerKey, "model">, HTMLDivElement>>>({});
  const modelRef = useRef<HTMLDivElement>(null);
  const logRefs = useRef<Partial<Record<LayerKey, HTMLDivElement>>>({});
  const [activeLabel, setActiveLabel] = useState<LayerKey | null>(null);

  useGSAP(
    () => {
      if (reduced || !hostRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hostRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      SCAN_ORDER.forEach((key, i) => {
        const frame = key === "model" ? modelRef.current : frameRefs.current[key];
        const log = logRefs.current[key];
        if (!frame) return;

        const prevKey = SCAN_ORDER[i - 1];
        const prevFrame = prevKey && (prevKey === "model" ? modelRef.current : frameRefs.current[prevKey]);
        if (prevFrame) {
          tl.to(prevFrame, { borderColor: "var(--line-strong)", opacity: 0.65, duration: 0.25 }, i);
        }

        tl.to(frame, { borderColor: "var(--accent)", opacity: 1, duration: 0.35 }, i).call(
          () => setActiveLabel(key),
          [],
          i
        );

        if (log) {
          tl.to(log, { opacity: 1, x: 0, duration: 0.35 }, i);
        }
      });
    },
    { scope: hostRef, dependencies: [reduced] }
  );

  if (reduced) {
    return (
      <div className="my-10 space-y-3">
        {SCAN_ORDER.map((key) => (
          <HudFrame key={key} className="p-5">
            <div className="label mb-2 text-accent">{t(`harness.layer.${key}.title` as TKey)}</div>
            <div className="text-sm leading-relaxed text-fg-muted">{t(`harness.layer.${key}.desc` as TKey)}</div>
          </HudFrame>
        ))}
      </div>
    );
  }

  return (
    <div className="my-10">
      <p className="label mb-4 text-center text-fg-dim">
        <Tr k="harness.scrollHint" />
      </p>
      <div ref={hostRef} className="relative" style={{ height: "420vh" }} aria-hidden>
        <div className="sticky top-0 flex h-svh flex-col items-center justify-center gap-8 border border-line bg-[var(--bg-panel)] p-6 md:flex-row md:gap-12">
          <div className="flex shrink-0 flex-col items-center gap-4">
            <div className="relative h-[240px] w-[240px] md:h-[300px] md:w-[300px]">
              {SQUARE_KEYS.map((key) => (
                <div
                  key={key}
                  ref={(el) => {
                    frameRefs.current[key] = el ?? undefined;
                  }}
                  className="absolute opacity-[0.35]"
                  style={{ inset: `${insetFor(key)}%`, border: "1px solid var(--line)" }}
                />
              ))}
              <div
                ref={modelRef}
                className="absolute left-1/2 top-1/2 h-[14%] w-[14%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.35]"
                style={{ border: "1px solid var(--line)" }}
              />
            </div>
            <span className="mono label text-fg">
              {activeLabel ? t(`harness.layer.${activeLabel}.title` as TKey) : ""}
            </span>
          </div>

          <div className="w-full max-w-sm space-y-1.5 font-mono text-xs leading-relaxed text-fg-muted md:min-w-0 md:flex-1 md:text-sm">
            {SCAN_ORDER.map((key) => (
              <div
                key={key}
                ref={(el) => {
                  logRefs.current[key] = el ?? undefined;
                }}
                className="opacity-0"
                style={{ transform: "translateX(-6px)" }}
              >
                {"> "}
                {t(`harness.layer.${key}.desc` as TKey)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
