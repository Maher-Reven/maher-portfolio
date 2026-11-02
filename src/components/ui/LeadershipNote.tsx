"use client";

import type { ReactNode } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";

/**
 * Collapsible leadership aside for lab MDX — 2–3 sentences tying craft to EM thinking.
 * Native <details> for keyboard and screen-reader support; styled to match the HUD register.
 */
export function LeadershipNote({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <HudFrame className="my-8 not-prose">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="label text-accent">
            {title ?? <Tr k="leadershipNote.label" />}
          </span>
          <span
            className="mono text-xs text-fg-dim transition-transform duration-200 group-open:rotate-180"
            aria-hidden
          >
            ▾
          </span>
        </summary>
        <div className="border-t border-line px-5 py-4 text-sm leading-relaxed text-fg-muted">{children}</div>
      </details>
    </HudFrame>
  );
}
