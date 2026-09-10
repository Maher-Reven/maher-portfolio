import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ReadmeBody } from "@/app/readme/ReadmeBody";

export const metadata: Metadata = { title: "Readme" };

export default function ReadmePage() {
  return (
    <>
      <PageHeader code="DOC" tk="readme" />
      <Reveal>
        <ReadmeBody />
      </Reveal>
    </>
  );
}
