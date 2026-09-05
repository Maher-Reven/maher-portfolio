import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ExperienceList } from "@/app/experience/ExperienceList";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <>
      <PageHeader code="02" tk="experience" />
      <ExperienceList />
    </>
  );
}
