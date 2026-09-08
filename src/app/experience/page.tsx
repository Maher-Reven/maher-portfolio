import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ExperienceList } from "@/app/experience/ExperienceList";
import { Magnetic } from "@/components/motion/Magnetic";
import { Tr } from "@/components/i18n/Tr";

export const metadata: Metadata = { title: "Experience" };

// next/link applies basePath automatically; a plain <a href> to a static file
// doesn't, so it's read from the env var next.config.ts sets for this.
const RESUME_HREF = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume.pdf`;

export default function ExperiencePage() {
  return (
    <>
      <PageHeader code="02" tk="experience" />
      <div className="mb-12 px-[var(--gutter)]">
        <Magnetic>
          <a
            href={RESUME_HREF}
            download
            className="bracket mono inline-flex items-center gap-2 border border-line-strong px-5 py-3 text-xs transition-colors hover:border-accent hover:text-accent"
            data-cursor-label="Download"
          >
            <Tr k="page.experience.downloadResume" /> <span aria-hidden>↓</span>
          </a>
        </Magnetic>
      </div>
      <ExperienceList />
    </>
  );
}
