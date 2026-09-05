import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ColophonStack } from "@/app/colophon/ColophonStack";

export const metadata: Metadata = { title: "How this site is built" };

export default function ColophonPage() {
  return (
    <>
      <PageHeader code="SYS" tk="colophon" />
      <ColophonStack />
    </>
  );
}
