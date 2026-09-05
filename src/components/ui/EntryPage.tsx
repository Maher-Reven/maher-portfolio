import Link from "next/link";
import type { ReactNode } from "react";
import type { Entry } from "@/lib/content";
import { LOCALES, type Locale, type TKey } from "@/lib/i18n";
import { Tr } from "@/components/i18n/Tr";
import { LocaleSwitch } from "@/components/i18n/LocaleSwitch";
import { EntryHeader, EntryMeta } from "@/components/ui/EntryMeta";
import { Mdx } from "@/components/ui/Mdx";
import { Reveal } from "@/components/motion/Reveal";

export function EntryPage({
  entry,
  code,
  labelKey,
  backHref,
  backKey,
}: {
  entry: Entry;
  code: string;
  labelKey: TKey;
  backHref: string;
  backKey: TKey;
}) {
  // Every translation is compiled at build time; LocaleSwitch renders the
  // active one, since MDX compiles on the server and the locale is client-side.
  const bodies = Object.fromEntries(
    LOCALES.map((l) => [l, <Mdx key={l} source={entry.text[l].content} />])
  ) as Record<Locale, ReactNode>;

  return (
    <article>
      <EntryHeader entry={entry} code={code} labelKey={labelKey} />
      <div className="grid gap-12 px-[var(--gutter)] pb-32 md:grid-cols-12">
        <aside className="md:col-span-3">
          <EntryMeta entry={entry} />
          <Link href={backHref} className="label mt-10 inline-block hover:text-fg">
            ← <Tr k={backKey} />
          </Link>
        </aside>
        <Reveal className="md:col-span-8 md:col-start-5">
          <div data-reveal>
            <LocaleSwitch nodes={bodies} />
          </div>
        </Reveal>
      </div>
    </article>
  );
}
