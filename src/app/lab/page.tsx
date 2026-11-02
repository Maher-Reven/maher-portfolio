import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { LabCard } from "@/components/ui/LabCard";
import { Reveal } from "@/components/motion/Reveal";
import { Tr } from "@/components/i18n/Tr";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = { title: "Lab" };

export default function LabPage() {
  const entries = getEntries("lab");
  return (
    <>
      <PageHeader code="03" tk="lab" />
      <p className="mx-[var(--gutter)] mb-12 -mt-8">
        <Link href="/log" className="label hover:text-fg">
          <Tr k="page.log.title" /> →
        </Link>
      </p>
      <Reveal className="mx-[var(--gutter)] mb-32 grid gap-4 md:grid-cols-3" stagger={0.08}>
        {entries.map((e, i) => (
          <LabCard
            key={e.slug}
            entry={e}
            badge={`EXP-${String(i + 1).padStart(3, "0")}`}
            showTags
          />
        ))}
      </Reveal>
    </>
  );
}
