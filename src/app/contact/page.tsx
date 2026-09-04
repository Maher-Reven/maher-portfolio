import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Magnetic } from "@/components/motion/Magnetic";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader code="05" label="contact" title="Let's talk" intro="Open to conversations about engineering leadership, creative tech, and ambitious side quests." />
      <div className="px-[var(--gutter)] pb-32">
        <Magnetic>
          <a
            href={`mailto:${site.email}`}
            className="bracket glow inline-block border border-line-strong px-8 py-6 text-2xl tracking-tight transition-colors hover:border-accent hover:text-accent md:text-4xl"
            data-cursor-label="Email"
          >
            {site.email}
          </a>
        </Magnetic>
        <ul className="label mt-12 flex flex-wrap gap-6">
          {site.socials.map((s) => (
            <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">{s.label} ↗</a></li>
          ))}
        </ul>
      </div>
    </>
  );
}
