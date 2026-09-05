"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useReducedMotion } from "@/lib/motion";

/** useLayoutEffect warns during SSR; there is nothing to lay out on the server. */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Lenis inertia scroll wired into GSAP's ticker so ScrollTrigger stays in sync.
 * Disabled automatically when the user prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const restoringHistory = useRef(false);

  // Back/forward should keep the browser's restored position, so flag those
  // navigations and leave them alone.
  useEffect(() => {
    const onPop = () => {
      restoringHistory.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  /**
   * Next resets scroll *after* the new route has rendered, which leaves a frame
   * or two where the incoming page is painted at the outgoing page's offset —
   * the flinch, and why a sub-page could appear to open half way down. Doing it
   * in a layout effect lands the reset before the browser paints.
   *
   * ScrollTrigger's cached start/end positions belong to the old document, so
   * they get refreshed here too.
   */
  useIsomorphicLayoutEffect(() => {
    if (restoringHistory.current) {
      restoringHistory.current = false;
      ScrollTrigger.refresh();
      return;
    }
    const lenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // expose for programmatic scrollTo (nav links etc.)
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, [reduced]);

  return <>{children}</>;
}
