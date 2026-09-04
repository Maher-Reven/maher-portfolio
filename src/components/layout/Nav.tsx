"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { site } from "@/lib/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { Clock } from "@/components/layout/Clock";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Nav() {
  const path = usePathname();

  return (
    <header className="nav-blend fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between px-[var(--gutter)] py-5">
        {/* mark */}
        <Magnetic strength={0.25}>
          <Link href="/" className="group flex shrink-0 items-center gap-3" data-cursor>
            <span className="relative grid h-8 w-8 place-items-center border border-line-strong">
              <span className="mono text-xs font-medium">{site.handle}</span>
              <span className="absolute -inset-px border border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </span>
            <span className="label hidden sm:block">{site.role}</span>
          </Link>
        </Magnetic>

        {/* links — scrollable on narrow screens so the row can shrink instead
            of pushing the theme toggle off the edge */}
        <nav className="no-scrollbar flex min-w-0 items-center gap-4 overflow-x-auto sm:gap-8">
          {site.nav.map((item) => {
            const active = path === item.href || path.startsWith(item.href + "/");
            return (
              <Magnetic key={item.href} strength={0.2}>
                <Link
                  href={item.href}
                  className={clsx(
                    "label group relative flex shrink-0 items-baseline gap-1.5 py-1 transition-colors",
                    active ? "text-fg" : "hover:text-fg"
                  )}
                >
                  <span className="text-accent">{item.code}</span>
                  <span>{item.label}</span>
                  <span
                    className={clsx(
                      "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-500 [transition-timing-function:var(--ease-out-expo)]",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </Magnetic>
            );
          })}
        </nav>

        {/* status + theme */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="label hidden items-center gap-3 md:flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span>{site.location}</span>
            <Clock />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
