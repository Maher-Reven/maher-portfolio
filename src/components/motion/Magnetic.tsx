"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useFinePointer, useReducedMotion } from "@/lib/motion";

/**
 * Wraps any element and makes it "magnetically" follow the cursor
 * within its bounds, snapping back with an elastic ease on leave.
 */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const onMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(ref.current, { x, y, duration: 0.4, ease: "power3.out" });
  };

  const onLeave = () => {
    if (!enabled || !ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
