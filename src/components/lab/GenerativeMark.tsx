"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useReducedMotion } from "@/lib/motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { Tr } from "@/components/i18n/Tr";
import { generateMark, type GeneratedMark, type Point } from "@/lib/generative-mark";

const K_OFFSET_X = 130;
const VIEWBOX = "-20 -20 260 140";

function toPath(points: Point[], offsetX = 0): string {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${(x + offsetX).toFixed(2)},${y.toFixed(2)}`).join(" ");
}

/**
 * EXP-004. A generative variation of the "MK" monogram, reseeded every load —
 * inline SVG, no WebGL context, so it costs nothing beyond the page itself.
 * Seed starts null and is only set client-side (Date.now()), since computing
 * it during render would differ between server prerender and hydration.
 */
export function GenerativeMark() {
  const [state, setState] = useState<{ seed: number; mark: GeneratedMark } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Date.now() differs between server prerender and client hydration, so the
    // first mark can only exist client-side — there's nothing to subscribe to
    // (unlike useReducedMotion's matchMedia listener), just a one-time seed.
    const s = Date.now();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ seed: s, mark: generateMark(s) });
  }, []);

  const regenerate = () => {
    const s = Date.now();
    const next = { seed: s, mark: generateMark(s) };

    if (reduced || !svgRef.current) {
      setState(next);
      return;
    }

    gsap.to(svgRef.current, {
      opacity: 0,
      duration: 0.18,
      onComplete: () => {
        setState(next);
        gsap.to(svgRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" });
      },
    });
  };

  const mark = state?.mark;

  return (
    <div className="my-10 border border-line bg-[var(--bg-panel)] p-8 text-center">
      <div className="flex min-h-[140px] items-center justify-center">
        {mark ? (
          <svg
            ref={svgRef}
            viewBox={VIEWBOX}
            className="h-auto w-full max-w-md"
            aria-hidden
            style={{
              stroke: `color-mix(in oklab, var(--accent) ${(1 - mark.colorMix) * 100}%, var(--accent-2) ${mark.colorMix * 100}%)`,
              strokeWidth: mark.weight,
              fill: "none",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }}
          >
            <path d={toPath(mark.m)} />
            <path d={toPath(mark.k, K_OFFSET_X)} />
            {mark.nodes.map((node, i) => {
              const [x, y] = node.point;
              const ox = node.letter === "k" ? K_OFFSET_X : 0;
              return <rect key={i} x={x + ox - 3} y={y - 3} width={6} height={6} fill="var(--bg)" />;
            })}
          </svg>
        ) : (
          <span className="loader" aria-hidden />
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
        <p className="label text-fg-dim">
          <Tr k="mark.seed" /> · {state ? state.seed.toString(16) : "----"}
        </p>
        <Magnetic>
          <button
            type="button"
            onClick={regenerate}
            className="bracket mono inline-flex items-center gap-2 border border-line-strong px-4 py-2 text-xs transition-colors hover:border-accent hover:text-accent"
            data-cursor-label="Regenerate"
          >
            {"↻ "}
            <Tr k="mark.regenerate" />
          </button>
        </Magnetic>
      </div>
    </div>
  );
}
