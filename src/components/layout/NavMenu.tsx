"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { site } from "@/lib/site";
import { useFinePointer } from "@/lib/motion";

/**
 * The nav collapsed into a dropdown, used below `lg` where the links no longer
 * fit inline.
 *
 * Opens on hover for mouse users and on click for everyone — hover alone would
 * strand touch devices, which is most of what sees this breakpoint. The panel
 * stays mounted and fades, so it can animate out; `inert` keeps it out of the
 * tab order and the accessibility tree while it's hidden.
 */
export function NavMenu() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const fine = useFinePointer();
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dismiss on Escape or a press outside. Subscribing to the document, so the
  // state change happens in a callback rather than in the effect body.
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

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const hoverOpen = () => {
    if (!fine) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // A short grace period, or the panel vanishes while the pointer crosses the
  // gap between the trigger and the menu.
  const hoverClose = () => {
    if (!fine) return;
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      ref={wrap}
      className="relative lg:hidden"
      onMouseEnter={hoverOpen}
      onMouseLeave={hoverClose}
    >
      <button
        type="button"
        onClick={(e) => {
          // On a hover-capable device the pointer has already opened the panel
          // by the time the click lands, so toggling here would slam it shut.
          // Keyboard activation reports detail === 0 and must still work.
          if (fine && e.detail !== 0) return;
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-controls="nav-menu"
        aria-label="Menu"
        data-cursor-label="Menu"
        className="label flex items-center gap-2 border border-line px-2.5 py-1.5 transition-colors hover:border-line-strong"
      >
        <span className="grid gap-[3px]">
          <span
            className={clsx(
              "block h-px w-3.5 bg-current transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)]",
              open && "translate-y-[4px] rotate-45"
            )}
          />
          <span
            className={clsx(
              "block h-px w-3.5 bg-current transition-opacity duration-200",
              open && "opacity-0"
            )}
          />
          <span
            className={clsx(
              "block h-px w-3.5 bg-current transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)]",
              open && "-translate-y-[4px] -rotate-45"
            )}
          />
        </span>
        <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
      </button>

      <div
        id="nav-menu"
        inert={!open}
        // No `bracket` here: it sets position:relative from unlayered CSS, which
        // outranks Tailwind's layered `absolute` and drops the panel into flow.
        className={clsx(
          "absolute right-0 top-full mt-2.5 w-56 border border-line-strong bg-[var(--bg-elev)] shadow-lg transition-all duration-300 [transition-timing-function:var(--ease-out-expo)]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1.5 opacity-0"
        )}
      >
        {site.nav.map((item) => {
          const active = path === item.href || path.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "label group/item relative isolate flex items-baseline gap-2 px-4 py-3 transition-colors duration-300",
                active ? "text-fg" : "text-fg-muted hover:text-fg"
              )}
            >
              {/* highlight wash, wiping in from the left */}
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
              <span className="text-accent">{item.code}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
