import { notFound } from "next/navigation";
import { getEntries, getEntry } from "@/lib/content";
import { EntryPage } from "@/components/ui/EntryPage";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getEntries("work").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("work", slug);
  return { title: entry?.text.en.title ?? "Work", description: entry?.text.en.summary };
}

export default async function WorkEntry({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const entry = getEntry("work", slug);
  if (!entry) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: entry.text.en.title,
    description: entry.text.en.summary,
    author: { "@type": "Person", name: site.name },
    datePublished: entry.year,
    url: `${site.url}/work/${entry.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <EntryPage entry={entry} code="01" labelKey="page.work.label" backHref="/work" backKey="entry.allWork" />
    </>
  );
}
