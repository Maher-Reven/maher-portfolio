"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";
import { useLocale } from "@/lib/use-locale";
import { askSite, type AskSiteReply } from "@/lib/ask-site";
import { buildIndex, type SearchIndex } from "@/lib/search";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const EXAMPLE_KEYS = ["askSite.example1", "askSite.example2", "askSite.example3"] as const;

/**
 * Bounded Q&A over the static search index — read-only tier, no web, no tools.
 * Same BM25 pipeline as SearchPalette; answers are stitched excerpts with citations.
 */
export function AskSite() {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState("");
  const [reply, setReply] = useState<AskSiteReply | null>(null);
  const [loading, setLoading] = useState(false);
  const indexCache = useRef(new Map<string, SearchIndex>());
  const inputRef = useRef<HTMLInputElement>(null);

  const loadIndex = useCallback(async (): Promise<SearchIndex> => {
    const cached = indexCache.current.get(locale);
    if (cached) return cached;
    const res = await fetch(`${BASE_PATH}/search-index.${locale}.json`);
    const docs = await res.json();
    const built = buildIndex(docs);
    indexCache.current.set(locale, built);
    return built;
  }, [locale]);

  const runAsk = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) {
        setReply(null);
        return;
      }
      setLoading(true);
      try {
        const index = await loadIndex();
        setReply(askSite(index, trimmed));
      } finally {
        setLoading(false);
      }
    },
    [loadIndex]
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      void runAsk(query);
    }, 200);
    return () => window.clearTimeout(id);
  }, [query, runAsk]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void runAsk(query);
    inputRef.current?.blur();
  };

  return (
    <div className="my-10 space-y-4">
      <HudFrame className="p-5">
        <p className="label mb-3 text-fg-dim">
          <Tr k="askSite.governanceTitle" />
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="mono label border border-accent/40 bg-[var(--bg-panel)] px-2.5 py-1 text-accent">
            <Tr k="askSite.tierBadge" />
          </span>
          <span className="mono label border border-line px-2.5 py-1 text-fg-dim">
            <Tr k="askSite.webBadge" />
          </span>
          <span className="mono label border border-line px-2.5 py-1 text-fg-dim">
            <Tr k="askSite.toolsBadge" />
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-fg-muted">
          <Tr k="askSite.governanceBody" />
        </p>
      </HudFrame>

      <HudFrame className="overflow-hidden p-0">
        <form onSubmit={onSubmit} className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className="mono text-fg-dim">?</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("askSite.placeholder")}
            className="mono flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-dim"
            aria-label={t("askSite.placeholder")}
          />
          <button
            type="submit"
            className="label shrink-0 border border-line px-3 py-1.5 text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <Tr k="askSite.ask" />
          </button>
        </form>

        <div className="flex flex-wrap gap-2 border-b border-line px-5 py-3">
          {EXAMPLE_KEYS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setQuery(t(k))}
              className="label rounded-sm border border-line px-2.5 py-1 text-fg-dim transition-colors hover:border-accent hover:text-fg"
            >
              {t(k)}
            </button>
          ))}
        </div>

        <div className="min-h-[8rem] px-5 py-5">
          {loading && <p className="label text-fg-dim"><Tr k="askSite.loading" /></p>}
          {!loading && query.trim() && reply && reply.paragraphs.length === 0 && (
            <p className="label text-fg-dim"><Tr k="askSite.noResults" /></p>
          )}
          {!loading && reply && reply.paragraphs.length > 0 && (
            <div className="space-y-4">
              <p className="label text-fg-dim"><Tr k="askSite.answerLabel" /></p>
              {reply.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-fg-muted">
                  {p}
                </p>
              ))}
              <p className="text-xs leading-relaxed text-fg-dim">
                <Tr k="askSite.retrievalNote" />
              </p>
            </div>
          )}
          {!query.trim() && (
            <p className="text-sm leading-relaxed text-fg-dim">
              <Tr k="askSite.promptHint" />
            </p>
          )}
        </div>

        {reply && reply.citations.length > 0 && (
          <div className="border-t border-line px-5 py-4">
            <p className="label mb-3 text-fg-dim">
              <Tr k="askSite.citations" />
            </p>
            <ul className="space-y-2">
              {reply.citations.map((c) => (
                <li key={c.doc.id}>
                  <Link
                    href={c.doc.url}
                    className="mono block text-xs text-accent underline-offset-2 hover:underline"
                  >
                    {c.doc.title}
                    {c.doc.section ? ` · ${c.doc.section}` : ""}
                  </Link>
                  <p className="mt-0.5 text-xs leading-relaxed text-fg-dim">{c.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </HudFrame>
    </div>
  );
}
