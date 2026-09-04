import Link from "next/link";
import { FluidShader } from "@/components/three/FluidShader";
import { TextScramble } from "@/components/motion/TextScramble";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { EntryCard } from "@/components/ui/EntryCard";
import { HudFrame } from "@/components/ui/HudFrame";
import { getEntries } from "@/lib/content";
import { site } from "@/lib/site";

export default function Home() {
  const work = getEntries("work").filter((e) => e.featured).slice(0, 4);
  const lab = getEntries("lab").slice(0, 3);

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      {/* `isolate` creates a stacking context so the -z-10 shader sits behind the copy but above the body background */}
      <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden px-[var(--gutter)] pb-16 pt-32">
        <FluidShader className="absolute inset-0 -z-10" />
        <div className="grid-overlay pointer-events-none absolute inset-0 -z-10 opacity-60" />

        {/* HUD corner data */}
        <div className="label pointer-events-none absolute left-[var(--gutter)] top-28 space-y-1">
          <p>{"// "}{site.name}</p>
          <p className="text-fg-dim">SYS.READY · v0.1.0</p>
        </div>
        <div className="label pointer-events-none absolute right-[var(--gutter)] top-28 hidden text-right sm:block">
          <p>50.85°N 4.35°E</p>
          <p className="text-fg-dim">SCROLL ↓</p>
        </div>

        <h1 className="max-w-[16ch] text-[clamp(2.75rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.04em]">
          <TextScramble text="Engineering" as="span" className="block" speed={40} />
          <TextScramble
            text="that moves."
            as="span"
            className="glow block text-accent"
            speed={40}
            delay={450}
          />
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[44ch] text-lg text-fg-muted">{site.tagline}</p>
          <div className="flex gap-3">
            <Magnetic>
              <Link
                href="/work"
                className="bracket mono inline-flex items-center gap-2 border border-line-strong px-5 py-3 text-xs transition-colors hover:border-accent hover:text-accent"
                data-cursor-label="Open"
              >
                Selected work <span aria-hidden>→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/lab"
                className="mono inline-flex items-center gap-2 px-5 py-3 text-xs text-fg-muted transition-colors hover:text-fg"
              >
                Enter the lab
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ───────────── SELECTED WORK ───────────── */}
      <section className="px-[var(--gutter)] py-28">
        <Reveal className="mb-12 flex items-end justify-between">
          <div data-reveal>
            <p className="label mb-3">{"01 // selected work"}</p>
            <h2 className="text-4xl tracking-tight md:text-5xl">Outcomes, not deliverables.</h2>
          </div>
          <Link data-reveal href="/work" className="label hover:text-fg">
            All work →
          </Link>
        </Reveal>
        <Reveal className="grid gap-px bg-line md:grid-cols-2" stagger={0.12}>
          {work.map((e, i) => (
            <div key={e.slug} data-reveal className="bg-bg">
              <EntryCard entry={e} index={i} />
            </div>
          ))}
        </Reveal>
      </section>

      {/* ───────────── LAB ───────────── */}
      <section className="border-t border-line px-[var(--gutter)] py-28">
        <Reveal className="mb-12">
          <p data-reveal className="label mb-3">{"02 // lab"}</p>
          <h2 data-reveal className="text-4xl tracking-tight md:text-5xl">
            Experiments in motion, shaders and interface.
          </h2>
        </Reveal>
        <Reveal className="grid gap-4 md:grid-cols-3" stagger={0.1}>
          {lab.map((e) => (
            <HudFrame key={e.slug} data-reveal>
              <Link href={`/lab/${e.slug}`} className="block p-6" data-cursor-label="Open">
                <p className="label mb-6 flex justify-between">
                  <span>{e.tags[0]}</span>
                  <span className="text-fg-dim">{e.year}</span>
                </p>
                <h3 className="mb-2 text-xl">{e.title}</h3>
                <p className="text-sm text-fg-muted">{e.summary}</p>
              </Link>
            </HudFrame>
          ))}
        </Reveal>
      </section>

      {/* ───────────── ABOUT TEASER ───────────── */}
      <section className="border-t border-line px-[var(--gutter)] py-28">
        <Reveal className="grid gap-10 md:grid-cols-12">
          <p data-reveal className="label md:col-span-3">
            {"03 // about"}
          </p>
          <div data-reveal className="md:col-span-7">
            <p className="text-2xl leading-snug tracking-tight md:text-3xl">
              I lead engineering teams by day and build things that shouldn&apos;t
              quite be possible in a browser by night. This site is both a
              portfolio and a lab notebook — every effect here is open source.
            </p>
            <Link href="/about" className="label mt-8 inline-block hover:text-fg">
              More about me →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
