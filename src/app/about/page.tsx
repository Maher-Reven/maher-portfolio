import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Tr } from "@/components/i18n/Tr";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHeader code="04" tk="about" />
      <Reveal className="grid gap-12 px-[var(--gutter)] pb-32 md:grid-cols-12">
        <div data-reveal className="prose md:col-span-7">
          <p>
            Ten years writing software, the last five spent making other engineers faster
            instead of just myself. Somewhere between a computer science master&apos;s and a
            string of teams at very different scales — a psychology-assessment platform, a
            regulated investment app live in 37 markets, a healthcare analytics company
            untangling fifteen legacy systems — I stopped thinking of &quot;engineering management&quot;
            as a step away from building. It&apos;s a different unit of building: instead of a
            feature, you&apos;re shipping the conditions another engineer needs to ship well.
          </p>
          <p>
            That&apos;s the thread through everything below, including this site. It&apos;s a
            portfolio, but it&apos;s also a small proof of the same instinct — a shader, a scroll
            system, a content pipeline, built and wired by hand because the tooling around a
            thing is never separate from the thing itself.
          </p>
          <h2>How I work</h2>
          <p>
            Treat internal platforms like products — with adoption, usability and an owner,
            not just an org chart. Build clarity before speed: teams ship predictably when
            priorities and dependencies are visible, not when they&apos;re told to move faster.
            Coach through feedback and pairing rather than process for its own sake. And stay
            close enough to the code and the incidents that the guardrails I set are ones I&apos;d
            actually want to work inside.
          </p>
          <h2>Currently</h2>
          <p>
            Leading the mobile platform at StuDocu — React Native/Expo, authentication,
            monetization, and AI-powered learning features — and pushing AI-native engineering
            further than autocomplete: repo-context rules across GitHub, Linear and Sentry,
            LangGraph agents in production, Kestra pipelines generating content at scale, with
            real guardrails around what a tool is allowed to call and ship. Outside of that,
            still the same curiosities as ever: shaders, motion, and interfaces worth using.
          </p>
        </div>
        <aside data-reveal className="md:col-span-4 md:col-start-9">
          <dl className="label space-y-4 border-t border-line pt-4">
            <div><dt className="text-fg-dim"><Tr k="page.about.basedIn" /></dt><dd className="text-fg">{site.location}</dd></div>
            <div><dt className="text-fg-dim"><Tr k="page.about.role" /></dt><dd className="text-fg">Senior Engineering Manager, Mobile Platform</dd></div>
            <div><dt className="text-fg-dim"><Tr k="page.about.interests" /></dt><dd className="text-fg">Motion · Shaders · AI · Developer Experience</dd></div>
          </dl>
        </aside>
      </Reveal>
    </>
  );
}
