import { TextScramble } from "@/components/motion/TextScramble";

export function PageHeader({
  code,
  label,
  title,
  intro,
}: {
  code: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="px-[var(--gutter)] pb-16 pt-36">
      <p className="label mb-4">
        <span className="text-accent">{code}</span>{" // "}{label}
      </p>
      <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.04em]">
        <TextScramble text={title} speed={30} />
      </h1>
      {intro && <p className="mt-6 max-w-[52ch] text-lg text-fg-muted">{intro}</p>}
    </header>
  );
}
