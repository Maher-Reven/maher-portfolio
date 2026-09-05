"use client";

import type { Entry } from "@/lib/content";
import type { TKey } from "@/lib/i18n";
import { useLocale } from "@/lib/use-locale";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tr } from "@/components/i18n/Tr";

/** Entry title and summary come from front-matter, so they're picked by locale. */
export function EntryHeader({
  entry,
  code,
  labelKey,
}: {
  entry: Entry;
  code: string;
  labelKey: TKey;
}) {
  const { locale, t } = useLocale();
  const text = entry.text[locale] ?? entry.text.en;
  return (
    <PageHeader code={code} label={t(labelKey)} title={text.title} intro={text.summary} />
  );
}

export function EntryMeta({ entry }: { entry: Entry }) {
  const { locale } = useLocale();
  const text = entry.text[locale] ?? entry.text.en;
  return (
    <dl className="label space-y-4 border-t border-line pt-4">
      <div>
        <dt className="text-fg-dim">
          <Tr k="entry.year" />
        </dt>
        <dd className="text-fg">{entry.year}</dd>
      </div>
      {text.role && (
        <div>
          <dt className="text-fg-dim">
            <Tr k="entry.role" />
          </dt>
          <dd className="text-fg">{text.role}</dd>
        </div>
      )}
      <div>
        <dt className="text-fg-dim">
          <Tr k="entry.tags" />
        </dt>
        <dd className="text-fg">{text.tags.join(" · ")}</dd>
      </div>
    </dl>
  );
}
