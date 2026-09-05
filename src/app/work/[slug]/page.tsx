import { notFound } from "next/navigation";
import { getEntries, getEntry } from "@/lib/content";
import { EntryPage } from "@/components/ui/EntryPage";

export function generateStaticParams() {
  return getEntries("work").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("work", slug);
  return { title: entry?.title ?? "Work", description: entry?.summary };
}

export default async function WorkEntry({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("work", slug);
  if (!entry) notFound();
  return <EntryPage entry={entry} code="01" label="work" backHref="/work" backKey="entry.allWork" />;
}
