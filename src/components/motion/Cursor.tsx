"use client";

import { useEffect, useRef } from "react";
import { gsap, useFinePointer, useReducedMotion } from "@/lib/motion";

/**
 * HUD-style custom cursor: a small dot that tracks the pointer tightly,
 * plus a reticle ring that lags and expands over interactive elements
 * (any <a>, <button>, or element with `data-cursor`). Add
 * `data-cursor-label="View"` to show a caption next to the reticle.
 * Mounts only on fine-pointer devices without reduced-motion.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const follower = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!fine || reduced) return;
    document.documentElement.classList.add("has-cursor");

    const fx = gsap.quickTo(follower.current, "x", { duration: 0.35, ease: "power3" });
    const fy = gsap.quickTo(follower.current, "y", { duration: 0.35, ease: "power3" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      fx(e.clientX);
      fy(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      const active = !!el;
      const text = el?.dataset.cursorLabel ?? "";
      gsap.to(ring.current, {
        scale: active ? 2.2 : 1,
        borderColor: active ? "var(--accent)" : "var(--line-strong)",
        duration: 0.3,
      });
      gsap.to(dot.current, { scale: active ? 0 : 1, duration: 0.2 });
      if (label.current) {
        if (text) label.current.textContent = text;
        gsap.to(label.current, { opacity: text ? 1 : 0, x: text ? 0 : -6, duration: 0.25 });
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      {/* lagging follower: ring + label */}
      <div ref={follower} className="absolute top-0 left-0 will-change-transform">
        <div
          ref={ring}
          className="absolute -top-4 -left-4 h-8 w-8 rounded-full border border-line-strong will-change-transform"
        >
          <span className="absolute left-1/2 top-0 h-1 w-px -translate-x-1/2 bg-line-strong" />
          <span className="absolute left-1/2 bottom-0 h-1 w-px -translate-x-1/2 bg-line-strong" />
          <span className="absolute top-1/2 left-0 h-px w-1 -translate-y-1/2 bg-line-strong" />
          <span className="absolute top-1/2 right-0 h-px w-1 -translate-y-1/2 bg-line-strong" />
        </div>
        <span
          ref={label}
          className="label absolute left-8 top-[-6px] whitespace-nowrap text-accent opacity-0"
        />
      </div>
      {/* tight dot */}
      <div
        ref={dot}
        className="absolute -top-[3px] -left-[3px] h-1.5 w-1.5 rounded-full bg-accent will-change-transform"
      />
    </div>
  );
}
