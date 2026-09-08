"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { SystemsCollapseScene } from "@/components/three/SystemsCollapseScene";
import { useReducedMotion } from "@/lib/motion";
import { Tr } from "@/components/i18n/Tr";

/**
 * The flagship visual for the 45→1 case study: 45 nodes scattered like a
 * fragmented estate, converging to one as the section scrolls past. Scroll
 * itself is the scrubber (a sticky panel over a tall host, same as Brain.tsx's
 * scroll-driven rotation) rather than a slider widget.
 */
export function SystemsCollapse() {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef(0);

  if (reduced) {
    return (
      <div className="my-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line" aria-hidden>
        <div className="bg-bg p-8 text-center">
          <div className="label mb-2 text-fg-dim">
            <Tr k="collapse.before" />
          </div>
          <div className="mono text-3xl text-fg">45</div>
          <div className="label mt-1 text-fg-dim">
            <Tr k="collapse.repositories" />
          </div>
        </div>
        <div className="bg-bg p-8 text-center">
          <div className="label mb-2 text-fg-dim">
            <Tr k="collapse.after" />
          </div>
          <div className="mono text-3xl text-accent">1</div>
          <div className="label mt-1 text-fg-dim">
            <Tr k="collapse.platform" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={hostRef} className="relative my-10" style={{ height: "300vh" }} aria-hidden>
      <div className="sticky top-0 h-svh overflow-hidden border border-line bg-bg">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
          camera={{ position: [0, 0, 7], fov: 50 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <SystemsCollapseScene hostRef={hostRef} overlayRef={overlayRef} progressRef={progressRef} />
        </Canvas>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="label text-fg-dim">
            <Tr k="collapse.systems" />
          </div>
          <div className="mono text-[clamp(3rem,10vw,6rem)] text-fg">
            <span ref={overlayRef}>45</span>
          </div>
        </div>
      </div>
    </div>
  );
}
