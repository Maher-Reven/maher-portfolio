import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { AboutBody } from "@/app/about/AboutBody";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader code="04" tk="about" />
      <Reveal className="grid gap-12 px-[var(--gutter)] pb-32 md:grid-cols-12">
        <AboutBody />
      </Reveal>
    </>
  );
}
