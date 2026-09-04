import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line px-[var(--gutter)] py-10">
      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="label mb-3">{"// contact"}</p>
          <a
            href={`mailto:${site.email}`}
            className="text-2xl tracking-tight hover:text-accent transition-colors"
            data-cursor-label="Email"
          >
            {site.email}
          </a>
        </div>
        <div>
          <p className="label mb-3">{"// elsewhere"}</p>
          <ul className="space-y-1.5">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg-muted hover:text-fg transition-colors"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-3">{"// system"}</p>
          <ul className="space-y-1.5 text-fg-muted">
            <li>
              <Link href="/colophon" className="hover:text-fg transition-colors">
                How this site is built
              </Link>
            </li>
            <li className="label !text-fg-dim pt-2">
              v0.1.0 · © {new Date().getFullYear()} {site.name}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
