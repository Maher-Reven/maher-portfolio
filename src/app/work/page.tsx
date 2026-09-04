import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EntryCard } from "@/components/ui/EntryCard";
import { Reveal } from "@/components/motion/Reveal";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  const entries = getEntries("work");
  return (
    <>
      <PageHeader
        code="01"
        label="work"
        title="Selected work"
        intro="Team outcomes and personal projects, framed the same way: problem, approach, result, and what I'd change."
      />
      <Reveal className="mx-[var(--gutter)] mb-32 grid gap-px bg-line md:grid-cols-2" stagger={0.1}>
        {entries.map((e, i) => (
          <div key={e.slug} data-reveal className="bg-bg"><EntryCard entry={e} index={i} /></div>
        ))}
      </Reveal>
    </>
  );
}
