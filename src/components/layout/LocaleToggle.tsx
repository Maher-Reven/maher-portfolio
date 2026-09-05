"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useLocale } from "@/lib/use-locale";
import { useFinePointer } from "@/lib/motion";
import { LOCALES, LOCALE_LABEL, LOCALE_NAME } from "@/lib/i18n";

/**
 * Language picker, built like NavMenu so the two controls in the header behave
 * identically: hover opens on a mouse, click opens for everyone, Escape and an
 * outside press dismiss, and the panel fades rather than snapping.
 */
export function LocaleToggle() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const fine = useFinePointer();
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  const hoverOpen = () => {
    if (!fine) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hoverClose = () => {
    if (!fine) return;
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div ref={wrap} className="relative" onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
      <button
        type="button"
        onClick={(e) => {
          // Hover already opened it on a pointer device; toggling here would
          // close it immediately. Keyboard activation reports detail === 0.
          if (fine && e.detail !== 0) return;
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-controls="locale-menu"
        aria-label={t("nav.language")}
        title={t("nav.language")}
        data-cursor-label={t("nav.language")}
        className="label flex items-center gap-1.5 border border-line px-2 py-1.5 transition-colors hover:border-line-strong"
      >
        <GlobeIcon />
        <span>{LOCALE_LABEL[locale]}</span>
      </button>

      <div
        id="locale-menu"
        inert={!open}
        className={clsx(
          "absolute right-0 top-full mt-2.5 w-40 border border-line-strong bg-[var(--bg-elev)] shadow-lg transition-all duration-300 [transition-timing-function:var(--ease-out-expo)]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1.5 opacity-0"
        )}
      >
        {LOCALES.map((l) => {
          const active = l === locale;
          return (
            <button
              key={l}
              type="button"
              lang={l}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              aria-current={active ? "true" : undefined}
              className={clsx(
                "label group/item relative isolate flex w-full items-baseline gap-2 px-4 py-3 text-left transition-colors duration-300",
                active ? "text-fg" : "text-fg-muted hover:text-fg"
              )}
            >
              <span
                aria-hidden
                className={clsx(
                  "absolute inset-0 -z-10 origin-left bg-accent/12 transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)]",
                  active ? "scale-x-100" : "scale-x-0 group-hover/item:scale-x-100"
                )}
              />
              <span
                aria-hidden
                className={clsx(
                  "absolute inset-y-0 left-0 w-px origin-bottom bg-accent transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)]",
                  active ? "scale-y-100" : "scale-y-0 group-hover/item:scale-y-100"
                )}
              />
              <span className="text-accent">{LOCALE_LABEL[l]}</span>
              <span className="normal-case tracking-normal">{LOCALE_NAME[l]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </svg>
  );
}
