import Link from "next/link";
import type { Entry } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tr } from "@/components/i18n/Tr";
import type { TKey } from "@/lib/i18n";
import { Mdx } from "@/components/ui/Mdx";
import { Reveal } from "@/components/motion/Reveal";

export function EntryPage({ entry, code, label, backHref, backKey }: {
  entry: Entry; code: string; label: string; backHref: string; backKey: TKey;
}) {
  return (
    <article>
      <PageHeader code={code} label={label} title={entry.title} intro={entry.summary} />
      <div className="grid gap-12 px-[var(--gutter)] pb-32 md:grid-cols-12">
        <aside className="md:col-span-3">
          <dl className="label space-y-4 border-t border-line pt-4">
            <div><dt className="text-fg-dim"><Tr k="entry.year" /></dt><dd className="text-fg">{entry.year}</dd></div>
            {entry.role && <div><dt className="text-fg-dim"><Tr k="entry.role" /></dt><dd className="text-fg">{entry.role}</dd></div>}
            <div>
              <dt className="text-fg-dim"><Tr k="entry.tags" /></dt>
              <dd className="text-fg">{entry.tags.join(" · ")}</dd>
            </div>
          </dl>
          <Link href={backHref} className="label mt-10 inline-block hover:text-fg">← <Tr k={backKey} /></Link>
        </aside>
        <Reveal className="md:col-span-8 md:col-start-5">
          <div data-reveal><Mdx source={entry.content} /></div>
        </Reveal>
      </div>
    </article>
  );
}
