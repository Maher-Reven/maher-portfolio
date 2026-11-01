"use client";

import { type ReactNode } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";

/** Reusable accordion for lab interactives — leadership framing without leaving the HUD register. */
export function LeadershipNote({ children }: { children: ReactNode }) {
  return (
    <HudFrame className="my-8 overflow-hidden p-0">
      <details className="group">
        <summary className="label flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-accent marker:content-none [&::-webkit-details-marker]:hidden">
          <Tr k="leadershipNote.title" />
          <span className="mono text-fg-dim transition-transform group-open:rotate-45" aria-hidden>
            +
          </span>
        </summary>
        <div className="border-t border-line px-5 py-4 text-sm leading-relaxed text-fg-muted">{children}</div>
      </details>
    </HudFrame>
  );
}
