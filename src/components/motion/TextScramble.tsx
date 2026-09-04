"use client";

import { createElement, useCallback, useEffect, useRef, useState, type ElementType } from "react";
import { useReducedMotion } from "@/lib/motion";

const GLYPHS = "░▒▓█▄▀■□▪▫ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\|=+*#";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms per resolved character */
  speed?: number;
  /** start automatically on mount */
  autoplay?: boolean;
  /** re-scramble on hover */
  hover?: boolean;
  delay?: number;
};

/**
 * "Decode" text effect: characters resolve left→right from random glyphs.
 * Reduced-motion users see the final text immediately.
 */
export function TextScramble({
  text,
  as: Tag = "span",
  className,
  speed = 28,
  autoplay = true,
  hover = false,
  delay = 0,
}: Props) {
  const reduced = useReducedMotion();
  // null = "not started yet" → render final text (SSR + no-JS safe)
  const [scrambled, setScrambled] = useState<string | null>(null);
  const frame = useRef(0);

  const run = useCallback(() => {
    cancelAnimationFrame(frame.current);
    const start = performance.now() + delay;
    const total = text.length * speed;

    const tick = (now: number) => {
      const t = now - start;
      if (t < 0) {
        setScrambled(""); // hidden until delay elapses
        frame.current = requestAnimationFrame(tick);
        return;
      }
      const resolved = Math.min(text.length, Math.floor((t / total) * text.length));
      let s = text.slice(0, resolved);
      for (let i = resolved; i < text.length; i++) {
        s += text[i] === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      if (resolved < text.length) {
        setScrambled(s);
        frame.current = requestAnimationFrame(tick);
      } else {
        setScrambled(null); // done → show real text
      }
    };
    frame.current = requestAnimationFrame(tick);
  }, [text, speed, delay]);

  useEffect(() => {
    if (autoplay && !reduced) run();
    return () => cancelAnimationFrame(frame.current);
  }, [autoplay, reduced, run]);

  const onPointerEnter = hover && !reduced ? run : undefined;

  // `run` only touches the ref inside an event handler / rAF, never during render.
  return createElement(
    Tag,
    // eslint-disable-next-line react-hooks/refs
    { className, onPointerEnter, "aria-label": text },
    scrambled ?? text
  );
}
