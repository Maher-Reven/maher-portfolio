"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HudFrame } from "@/components/ui/HudFrame";
import { useLocale } from "@/lib/use-locale";
import { buildIndex, search, type SearchIndex, type SearchResult } from "@/lib/search";

const OPEN_EVENT = "open-search-palette";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Nav.tsx's search button fires this — no separate Context, one component
 * dispatching an event the other listens for is the smaller addition. */
export function openSearchPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

/**
 * Global Cmd+K / Ctrl+K search — a real BM25 index (src/lib/search.ts) over
 * every case study, decision, and readme section, fetched once per locale
 * from the static index scripts/build-search-index.ts generates at build
 * time. No server, no LLM call: this is retrieval, not chat.
 */
export function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const indexCache = useRef(new Map<string, SearchIndex>());
  const inputRef = useRef<HTMLInputElement>(null);
  const { locale, t } = useLocale();
  const router = useRouter();

  const loadIndex = useCallback(async (): Promise<SearchIndex> => {
    const cached = indexCache.current.get(locale);
    if (cached) return cached;
    const res = await fetch(`${BASE_PATH}/search-index.${locale}.json`);
    const docs = await res.json();
    const built = buildIndex(docs);
    indexCache.current.set(locale, built);
    return built;
  }, [locale]);

  const doOpen = useCallback(() => {
    setQuery("");
    setResults([]);
    setActiveIndex(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener(OPEN_EVENT, doOpen);
    return () => window.removeEventListener(OPEN_EVENT, doOpen);
  }, [doOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) doOpen();
          return !prev;
        });
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [doOpen]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    loadIndex().then((index) => {
      if (cancelled) return;
      setResults(query.trim() ? search(index, query, 8) : []);
      setActiveIndex(0);
    });
    return () => {
      cancelled = true;
    };
  }, [open, query, loadIndex]);

  const go = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(0, results.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const r = results[activeIndex];
      if (r) go(r.doc.url);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      style={{ background: "color-mix(in oklab, var(--bg) 80%, transparent)" }}
      onClick={() => setOpen(false)}
    >
      <HudFrame
        className="w-full max-w-xl overflow-hidden bg-bg p-0"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="mono text-fg-dim">/</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder={t("search.placeholder")}
            className="mono flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-dim"
          />
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 && query.trim() && (
            <p className="label p-5 text-fg-dim">{t("search.noResults")}</p>
          )}
          {results.map((r, i) => (
            <button
              key={r.doc.id}
              type="button"
              onClick={() => go(r.doc.url)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`block w-full border-b border-line px-5 py-3 text-left transition-colors ${
                i === activeIndex ? "bg-[var(--bg-panel)]" : ""
              }`}
            >
              <p className="mono flex flex-wrap items-center gap-2 text-xs">
                <span className="text-fg">{r.doc.title}</span>
                {r.doc.section && <span className="text-fg-dim">· {r.doc.section}</span>}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{r.excerpt}</p>
            </button>
          ))}
        </div>

        <div className="label flex items-center justify-between border-t border-line px-5 py-3 text-fg-dim">
          <span>{t("search.hint")}</span>
          <span>esc</span>
        </div>
      </HudFrame>
    </div>
  );
}
