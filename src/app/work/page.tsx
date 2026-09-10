import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EntryCard } from "@/components/ui/EntryCard";
import { Reveal } from "@/components/motion/Reveal";
import { Tr } from "@/components/i18n/Tr";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  const entries = getEntries("work");
  return (
    <>
      <PageHeader code="01" tk="work" />
      <p className="mx-[var(--gutter)] mb-12 -mt-8">
        <Link href="/log" className="label hover:text-fg">
          <Tr k="page.log.title" /> →
        </Link>
      </p>
      <Reveal className="mx-[var(--gutter)] mb-32 grid gap-px bg-line md:grid-cols-2" stagger={0.1}>
        {entries.map((e, i) => (
          <div key={e.slug} data-reveal className="bg-bg"><EntryCard entry={e} index={i} /></div>
        ))}
        {/* The grid's hairline separators come from bg-line showing through the gap,
            so an odd entry count would leave a bare line-coloured cell. */}
        {entries.length % 2 === 1 && <div aria-hidden className="hidden bg-bg md:block" />}
      </Reveal>
    </>
  );
}
