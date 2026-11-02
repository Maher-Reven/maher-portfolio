import type { ReactNode } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";

/** Collapsible 2–3 sentence note tying lab craft to EM thinking (Phase 1+ interactives). */
export function LeadershipNote({ children }: { children: ReactNode }) {
  return (
    <HudFrame className="my-6">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center gap-2 p-4 sm:p-6 [&::-webkit-details-marker]:hidden">
          <span className="label text-accent">
            <Tr k="leadershipNote.kicker" />
          </span>
          <span className="mono ml-auto text-xs text-fg-dim group-open:hidden" aria-hidden>
            +
          </span>
          <span className="mono ml-auto hidden text-xs text-fg-dim group-open:inline" aria-hidden>
            −
          </span>
        </summary>
        <div className="border-t border-line px-4 pb-4 pt-3 text-sm leading-relaxed text-fg-muted sm:px-6 sm:pb-6">
          {children}
        </div>
      </details>
    </HudFrame>
  );
}
