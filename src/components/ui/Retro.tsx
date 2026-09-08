import type { ReactNode } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";

/** Wraps the "what I'd do differently" closer that ends every case study. */
export function Retro({ children }: { children: ReactNode }) {
  return (
    <HudFrame className="my-10 p-6 text-fg-muted sm:p-8">
      <div className="label mb-4 text-accent">
        <Tr k="retro.kicker" />
      </div>
      {children}
    </HudFrame>
  );
}
