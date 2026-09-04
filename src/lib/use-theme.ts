"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_KEY, type Theme } from "@/lib/theme";

/**
 * The `data-theme` attribute on <html> is the single source of truth, not React
 * state: the toggle and the WebGL scene live in different trees and both have to
 * follow it, and the pre-paint inline script sets it before React exists.
 *
 * useSyncExternalStore is the right primitive for exactly that — subscribing to
 * something outside React — and it handles the server/client snapshot split
 * without an effect that sets state on mount.
 */
function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => obs.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Matches the default the inline script falls back to. */
function getServerSnapshot(): Theme {
  return "dark";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* private mode — the theme just won't persist */
    }
  }, []);

  return { theme, setTheme };
}
