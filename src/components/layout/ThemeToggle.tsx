"use client";

import { useTheme } from "@/lib/use-theme";
import { useLocale } from "@/lib/use-locale";
import { useReducedMotion } from "@/lib/motion";

/**
 * Theme switch, drawn as a HUD readout rather than a pill: the two states sit
 * side by side with the active one lit, matching the nav's code/label pairs.
 *
 * Both icons always render, so the control is the same size in either state and
 * nothing shifts when React reconciles the server's "dark" guess with whatever
 * the inline script actually applied.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const isDark = theme === "dark";

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";

    // Raw browser API, not React's <ViewTransition> — this is a same-page CSS
    // custom-property flip, not a component/route change, so React's
    // Transition-triggered version doesn't apply here.
    if (reduced || typeof document === "undefined" || !("startViewTransition" in document)) {
      setTheme(next);
      return;
    }

    document.documentElement.style.setProperty("--vt-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--vt-y", `${event.clientY}px`);
    document.startViewTransition(() => setTheme(next));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(isDark ? "nav.themeToLight" : "nav.themeToDark")}
      title={t(isDark ? "nav.themeToLight" : "nav.themeToDark")}
      data-cursor-label="Theme"
      className="label group flex items-center gap-1.5 border border-line px-2 py-1.5 transition-colors hover:border-line-strong"
    >
      <span
        aria-hidden
        className={isDark ? "text-fg-dim transition-colors" : "text-accent transition-colors"}
      >
        <SunIcon />
      </span>
      <span aria-hidden className="h-3 w-px bg-line-strong" />
      <span
        aria-hidden
        className={isDark ? "text-accent transition-colors" : "text-fg-dim transition-colors"}
      >
        <MoonIcon />
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
