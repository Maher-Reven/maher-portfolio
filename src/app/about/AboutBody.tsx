"use client";

import { site } from "@/lib/site";
import { useLocale } from "@/lib/use-locale";
import { pageContent } from "@/lib/page-content";
import { Tr } from "@/components/i18n/Tr";
import { TeamTopology } from "@/components/ui/TeamTopology";

export function AboutBody() {
  const { locale } = useLocale();
  const c = pageContent(locale);

  return (
    <>
      <div data-reveal className="prose md:col-span-7">
        {c.about.intro.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
        <h2>{c.about.workHeading}</h2>
        <p>{c.about.work}</p>
        <TeamTopology intro={c.teamTopologyIntro} types={c.teamTopology} />
        <h2>{c.about.nowHeading}</h2>
        <p>{c.about.now}</p>
      </div>
      <aside data-reveal className="md:col-span-4 md:col-start-9">
        <dl className="label space-y-4 border-t border-line pt-4">
          <div>
            <dt className="text-fg-dim">
              <Tr k="page.about.basedIn" />
            </dt>
            <dd className="text-fg">{site.location}</dd>
          </div>
          <div>
            <dt className="text-fg-dim">
              <Tr k="page.about.role" />
            </dt>
            <dd className="text-fg">{c.aboutMeta.role}</dd>
          </div>
          <div>
            <dt className="text-fg-dim">
              <Tr k="page.about.interests" />
            </dt>
            <dd className="text-fg">{c.aboutMeta.interests}</dd>
          </div>
        </dl>
      </aside>
    </>
  );
}
