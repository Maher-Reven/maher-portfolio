"use client";

import { useCallback, useSyncExternalStore } from "react";
import { LOCALE_KEY, LOCALES, translate, type Locale, type TKey } from "@/lib/i18n";

/**
 * Same shape as useTheme: `data-locale` on <html> is the source of truth, set
 * before paint by the inline script, and read here through
 * useSyncExternalStore so every consumer follows a change without a shared
 * provider or an effect that sets state on mount.
 */
function subscribe(onChange: () => void) {
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-locale"],
  });
  return () => obs.disconnect();
}

function getSnapshot(): Locale {
  const l = document.documentElement.dataset.locale as Locale | undefined;
  return l && (LOCALES as readonly string[]).includes(l) ? l : "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((next: Locale) => {
    document.documentElement.dataset.locale = next;
    document.documentElement.lang = next;
    try {
      localStorage.setItem(LOCALE_KEY, next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  }, []);

  const t = useCallback((key: TKey) => translate(locale, key), [locale]);

  return { locale, setLocale, t };
}
