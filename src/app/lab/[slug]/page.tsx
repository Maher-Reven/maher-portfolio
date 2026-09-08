import { notFound } from "next/navigation";
import { getEntries, getEntry } from "@/lib/content";
import { EntryPage } from "@/components/ui/EntryPage";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getEntries("lab").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/lab/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("lab", slug);
  return { title: entry?.text.en.title ?? "Lab", description: entry?.text.en.summary };
}

export default async function LabEntry({ params }: PageProps<"/lab/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("lab", slug);
  if (!entry) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: entry.text.en.title,
    description: entry.text.en.summary,
    author: { "@type": "Person", name: site.name },
    datePublished: entry.year,
    url: `${site.url}/lab/${entry.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EntryPage entry={entry} code="03" labelKey="page.lab.label" backHref="/lab" backKey="entry.allExperiments" />
    </>
  );
}
