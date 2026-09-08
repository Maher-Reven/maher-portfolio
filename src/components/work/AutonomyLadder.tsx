"use client";

import { Children, isValidElement, useRef, type ReactElement, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/motion";
import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";

type TierProps = { label: string; children: ReactNode };

/** A single rung inside <AutonomyLadder>. Rendered by the ladder, not standalone. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- props are read via tier.props in AutonomyLadder, not through a call here
export function AutonomyTier(_props: TierProps) {
  return null;
}

/**
 * A tiered "what is this system allowed to do" diagram — deliberately the
 * plainest visual on the site: a vertical line that draws itself as you
 * scroll past it (GSAP scaleY, scrubbed to scroll), no WebGL, no canvas.
 * The register is clarity, not spectacle, on purpose.
 */
export function AutonomyLadder({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const tiers = Children.toArray(children).filter(
    (child): child is ReactElement<TierProps> => isValidElement(child)
  );

  useGSAP(
    () => {
      if (reduced || !lineRef.current) return;
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [reduced] }
  );

  return (
    <div ref={containerRef} className="relative my-10 pl-8">
      <div className="absolute bottom-2 left-0 top-2 w-px bg-line" aria-hidden />
      <div
        ref={lineRef}
        className="absolute bottom-2 left-0 top-2 w-px origin-top bg-accent"
        aria-hidden
      />
      <div className="space-y-6">
        {tiers.map((tier, i) => (
          <HudFrame key={tier.props.label} className="p-5">
            <div className="label mb-2 flex items-center gap-2">
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="mono text-fg">{tier.props.label}</span>
            </div>
            <div className="text-sm leading-relaxed text-fg-muted">{tier.props.children}</div>
          </HudFrame>
        ))}
      </div>
      <p className="label mt-6 text-fg-dim">
        <Tr k="ladder.escalation" />
      </p>
    </div>
  );
}
