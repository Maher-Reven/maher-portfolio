import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader code="03" label="about" title="Creative technologist, engineering manager" />
      <Reveal className="grid gap-12 px-[var(--gutter)] pb-32 md:grid-cols-12">
        <div data-reveal className="prose md:col-span-7">
          <p>
            Replace this with your story: how you moved between design and engineering,
            what you lead now, and what you&apos;re curious about next (AI, 3D, motion…).
          </p>
          <h2>How I work</h2>
          <p>Three or four principles. Short. The kind of thing your team would recognise.</p>
          <h2>Currently</h2>
          <p>Where you are, what you&apos;re exploring, what you&apos;d love to talk about.</p>
        </div>
        <aside data-reveal className="md:col-span-4 md:col-start-9">
          <dl className="label space-y-4 border-t border-line pt-4">
            <div><dt className="text-fg-dim">based in</dt><dd className="text-fg">Belgium</dd></div>
            <div><dt className="text-fg-dim">role</dt><dd className="text-fg">Engineering Manager</dd></div>
            <div><dt className="text-fg-dim">interests</dt><dd className="text-fg">Motion · Shaders · AI · Product</dd></div>
          </dl>
        </aside>
      </Reveal>
    </>
  );
}
