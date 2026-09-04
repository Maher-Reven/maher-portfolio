import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { HudFrame } from "@/components/ui/HudFrame";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Experience" };

const roles = [
  {
    period: "07/2025 — Present",
    title: "Senior Engineering Manager, Mobile Platform",
    org: "StuDocu",
    place: "Amsterdam, Netherlands",
    points: [
      "Owns delivery for the mobile product platform, aligning Product, Design and Platform around shared OKRs across auth, monetization, AI learning features and the React Native/Expo foundation.",
      "Took over the mobile engineering function mid leadership-transition, re-establishing performance calibration, career development and team operating cadence.",
      "Drove AI-native engineering adoption — MCP integrations and repo-context rules across GitHub, Linear and Sentry — cutting ramp-up from months to weeks.",
      "Led production AI initiatives beyond coding assistance: LangGraph agents for mobile AI features, Kestra-orchestrated content pipelines, with guardrails on tool-calling and evaluation.",
      "Introduced automated verification gates in CI/CD through a core V1–V2 API overhaul, coordinating delivery across 6 mission owners with zero regressions.",
    ],
  },
  {
    period: "11/2022 — 06/2025",
    title: "Engineering Manager",
    org: "LOGEX Patient Engagement",
    place: "Amsterdam, Netherlands",
    points: [
      "Led cross-functional teams across backend and client platforms in a complex healthcare environment, coordinating design, development, legal, customer service and sales.",
      "Defined platform strategy and aligned architectural investment with business priorities, consolidating 15 fragmented legacy systems into a coherent platform.",
      "Drove domain observability and blameless retrospectives, sustaining zero-delay compliance with annual ISO and NEN 7510 audits.",
      "Balanced delivery speed, resilience and compliance across products and partner integrations requiring careful dependency management.",
    ],
  },
  {
    period: "11/2020 — 11/2022",
    title: "Engineering Manager / Senior Software Developer",
    org: "BOTS",
    place: "Haarlem, Netherlands",
    points: [
      "Led engineering for billing and transaction systems on an automated investment platform serving 150,000+ clients across 37 regulated markets.",
      "Partnered with Product, Finance and Security to align roadmap trade-offs where resilience, compliance and business outcomes had to move together.",
      "Established predictable bi-weekly release cycles and automated CI/CD checks for core billing engines, safeguarding transaction integrity and uptime.",
      "Mentored developers through code review and pair programming, raising technical standards across the team.",
    ],
  },
  {
    period: "07/2018 — 07/2020",
    title: "Lead Developer",
    org: "LTP Business Psychologists",
    place: "Amsterdam, Netherlands",
    points: [
      "Led frontend modernization of the flagship assessment platform, setting technical direction for a browser product used by 120+ consultants.",
      "Modernized legacy frontends into modular micro-frontends, improving maintainability, testing discipline and delivery consistency.",
      "Partnered with R&D to translate complex psychological models into intuitive, data-rich assessment experiences.",
      "Mentored junior developers through daily code review and pair programming.",
    ],
  },
];

const education = {
  degree: "MSc, Computer Science (Applied Sciences concentration)",
  org: "Leiden University",
  period: "09/2020 — 10/2021",
  place: "Leiden, Netherlands",
  detail: "GPA 8.8 / 10",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        code="02"
        label="experience"
        title="Ten years building, five leading"
        intro="Engineering management across fintech, healthcare and edtech — always staying close to the code, the incidents, and the people shipping both."
      />
      <Reveal className="mx-[var(--gutter)] mb-16 flex flex-col gap-4" stagger={0.08}>
        {roles.map((r) => (
          <HudFrame key={r.org + r.period} data-reveal className="p-6 md:p-8">
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
              <h3 className="text-xl md:text-2xl">
                {r.title} <span className="text-fg-dim">· {r.org}</span>
              </h3>
              <p className="label shrink-0 text-fg-dim">{r.period}</p>
            </div>
            <p className="label mt-1 text-fg-dim">{r.place}</p>
            <ul className="mt-4 space-y-2 text-sm text-fg-muted">
              {r.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-[0.5em] h-1 w-1 shrink-0 bg-accent" aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </HudFrame>
        ))}
      </Reveal>
      <Reveal className="mx-[var(--gutter)] mb-32">
        <HudFrame data-reveal className="p-6 md:p-8">
          <p className="label mb-2 text-accent">Education</p>
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
            <h3 className="text-xl md:text-2xl">
              {education.degree} <span className="text-fg-dim">· {education.org}</span>
            </h3>
            <p className="label shrink-0 text-fg-dim">{education.period}</p>
          </div>
          <p className="label mt-1 text-fg-dim">{education.place} · {education.detail}</p>
        </HudFrame>
      </Reveal>
    </>
  );
}
