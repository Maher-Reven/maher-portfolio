import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { HudFrame } from "@/components/ui/HudFrame";
import { Reveal } from "@/components/motion/Reveal";
import { getEntries } from "@/lib/content";

export const metadata: Metadata = { title: "Lab" };

export default function LabPage() {
  const entries = getEntries("lab");
  return (
    <>
      <PageHeader
        code="02"
        label="lab"
        title="Experiment log"
        intro="Shaders, motion studies and interface ideas. Everything here runs live in this site and is open source."
      />
      <Reveal className="mx-[var(--gutter)] mb-32 grid gap-4 md:grid-cols-3" stagger={0.08}>
        {entries.map((e, i) => (
          <HudFrame key={e.slug} data-reveal>
            <Link href={`/lab/${e.slug}`} className="block p-6" data-cursor-label="Open">
              <p className="label mb-6 flex justify-between">
                <span>EXP-{String(i + 1).padStart(3, "0")}</span>
                <span className="text-fg-dim">{e.year}</span>
              </p>
              <h3 className="mb-2 text-xl">{e.title}</h3>
              <p className="text-sm text-fg-muted">{e.summary}</p>
              <p className="label mt-6 text-fg-dim">{e.tags.join(" · ")}</p>
            </Link>
          </HudFrame>
        ))}
      </Reveal>
    </>
  );
}
