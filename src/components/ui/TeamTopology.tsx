"use client";

import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";
import type { TeamType } from "@/lib/page-content";

/**
 * A general "how I structure teams" diagram, in Team Topologies' own
 * vocabulary — deliberately a statement of approach, not a claimed history of
 * any specific org (the same honesty constraint already applied to
 * AutonomyLadder in the "Beyond autocomplete" case study).
 */
export function TeamTopology({ intro, types }: { intro: string; types: TeamType[] }) {
  return (
    <div className="my-10">
      <p className="text-sm text-fg-muted">{intro}</p>
      <div className="mt-6 grid gap-0 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {types.map((t, i) => (
          <div key={t.type} className="contents">
            <HudFrame className="p-5">
              <p className="mono mb-2 text-xs text-accent">{t.type}</p>
              <p className="text-sm leading-relaxed text-fg-muted">{t.description}</p>
            </HudFrame>
            {i < types.length - 1 && (
              <div className="label flex items-center justify-center px-3 py-3 text-center text-fg-dim md:py-0">
                {i === 0 ? <Tr k="topology.collaboration" /> : <Tr k="topology.xAsAService" />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
