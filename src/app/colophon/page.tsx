import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { HudFrame } from "@/components/ui/HudFrame";

export const metadata: Metadata = { title: "How this site is built" };

const stack = [
  ["Framework", "Next.js 16 · App Router · React 19 · TypeScript strict"],
  ["Styling", "Tailwind v4 with CSS-variable design tokens (globals.css)"],
  ["WebGL", "React Three Fiber · custom GLSL fluid shader on a single quad"],
  ["Scroll", "Lenis inertia scroll synced to GSAP ScrollTrigger"],
  ["UI motion", "GSAP for scroll & cursor, Motion (framer) for page transitions"],
  ["Content", "MDX files in /content, parsed with gray-matter, rendered via next-mdx-remote"],
  ["Type", "Space Grotesk (display) · JetBrains Mono (HUD labels)"],
  ["A11y", "prefers-reduced-motion disables shader, smooth scroll, cursor and reveals"],
];

export default function ColophonPage() {
  return (
    <>
      <PageHeader code="SYS" tk="colophon" />
      <Reveal className="mx-[var(--gutter)] mb-32 grid gap-px bg-line md:grid-cols-2" stagger={0.06}>
        {stack.map(([k, v]) => (
          <HudFrame key={k} data-reveal className="!border-0 bg-bg p-6">
            <p className="label mb-2 text-accent">{k}</p>
            <p className="text-fg-muted">{v}</p>
          </HudFrame>
        ))}
      </Reveal>
    </>
  );
}
