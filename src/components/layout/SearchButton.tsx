"use client";

import { useLocale } from "@/lib/use-locale";
import { openSearchPalette } from "@/components/search/SearchPalette";

/** Opens the same palette Cmd+K/Ctrl+K does — a visible affordance for
 * visitors who wouldn't otherwise know the shortcut exists. */
export function SearchButton() {
  const { t } = useLocale();

  return (
    <button
      type="button"
      onClick={() => openSearchPalette()}
      aria-label={t("nav.search")}
      title={t("nav.search")}
      data-cursor-label="Search"
      className="label flex items-center gap-1.5 border border-line px-2 py-1.5 transition-colors hover:border-line-strong"
    >
      <SearchIcon />
      <span className="hidden sm:inline">⌘K</span>
    </button>
  );
}

function SearchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
