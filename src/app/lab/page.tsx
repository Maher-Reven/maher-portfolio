import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { LabCard } from "@/components/ui/LabCard";
import { Reveal } from "@/components/motion/Reveal";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = { title: "Lab" };

export default function LabPage() {
  const entries = getEntries("lab");
  return (
    <>
      <PageHeader code="03" tk="lab" />
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
