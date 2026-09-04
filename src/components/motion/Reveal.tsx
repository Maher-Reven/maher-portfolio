"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, useReducedMotion } from "@/lib/motion";

/**
 * Scroll-triggered reveal. Children with `data-reveal` animate in with a
 * stagger when the wrapper enters the viewport. Mechanical HUD feel:
 * short travel, expo ease, clip-path wipe.
 */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 24,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const items = ref.current.querySelectorAll<HTMLElement>("[data-reveal]");
      const targets = items.length ? items : [ref.current];
      gsap.fromTo(
        targets,
        { y, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.9,
          stagger,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
