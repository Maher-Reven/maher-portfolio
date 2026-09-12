"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { site } from "@/lib/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { Clock } from "@/components/layout/Clock";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LocaleToggle } from "@/components/layout/LocaleToggle";
import { SearchButton } from "@/components/layout/SearchButton";
import { useLocale } from "@/lib/use-locale";
import type { TKey } from "@/lib/i18n";
import { NavMenu } from "@/components/layout/NavMenu";

export function Nav() {
  const path = usePathname();
  const city = site.location.split(",")[0];
  const { t } = useLocale();

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
            {/* Decorative and wide — the last thing to earn its space. */}
            <span className="label hidden xl:block">{t("site.role")}</span>
          </Link>
        </Magnetic>

        {/* links — inline only where the full row fits; below lg they collapse
            into NavMenu rather than a clipped horizontal scroller */}
        <nav className="hidden items-center gap-8 lg:flex">
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
                  <span>{t(`nav.${item.key}` as TKey)}</span>
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

        {/* status + theme + collapsed menu */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {/* Location stays visible at every width — it's the one bit of status
              worth keeping. Only the city below sm, where the full string and
              the clock would crowd out the menu button. */}
          <div className="label flex items-center gap-3">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="whitespace-nowrap sm:hidden">{city}</span>
            <span className="hidden whitespace-nowrap sm:inline">{site.location}</span>
            <span className="hidden md:inline">
              <Clock />
            </span>
          </div>
          <SearchButton />
          <ThemeToggle />
          <LocaleToggle />
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
