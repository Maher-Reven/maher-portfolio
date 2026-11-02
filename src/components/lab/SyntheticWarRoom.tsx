"use client";

import { useCallback, useState } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";
import type { TKey } from "@/lib/i18n";

type Action = "merge" | "escalate" | "rollback";

const AGENTS = ["alpha", "beta", "gamma"] as const;
type Agent = (typeof AGENTS)[number];

const AGENT_NAME_KEYS: Record<Agent, TKey> = {
  alpha: "warRoom.agent.alpha.name",
  beta: "warRoom.agent.beta.name",
  gamma: "warRoom.agent.gamma.name",
};

const AGENT_FIX_KEYS: Record<Agent, TKey> = {
  alpha: "warRoom.agent.alpha.fix",
  beta: "warRoom.agent.beta.fix",
  gamma: "warRoom.agent.gamma.fix",
};

const ACTION_KEYS: Record<Action, TKey> = {
  merge: "warRoom.action.merge",
  escalate: "warRoom.action.escalate",
  rollback: "warRoom.action.rollback",
};

const OUTCOME_TITLE_KEYS: Record<Action, TKey> = {
  merge: "warRoom.outcome.merge.title",
  escalate: "warRoom.outcome.escalate.title",
  rollback: "warRoom.outcome.rollback.title",
};

const OUTCOME_BODY_KEYS: Record<Action, TKey> = {
  merge: "warRoom.outcome.merge.body",
  escalate: "warRoom.outcome.escalate.body",
  rollback: "warRoom.outcome.rollback.body",
};

const LEADERSHIP_KEYS: Record<Action, TKey> = {
  merge: "warRoom.outcome.merge.leadership",
  escalate: "warRoom.outcome.escalate.leadership",
  rollback: "warRoom.outcome.rollback.leadership",
};

/**
 * EXP-008. Fictional incident war room — three agent panels propose conflicting fixes;
 * the visitor chooses merge, escalate, or rollback and gets a leadership one-liner.
 * Pure client state, no APIs.
 */
export function SyntheticWarRoom() {
  const [choice, setChoice] = useState<Action | null>(null);

  const reset = useCallback(() => setChoice(null), []);

  const actionButtonClass = (active: boolean) =>
    `bracket mono border px-4 py-2 text-sm transition-colors ${
      active
        ? "border-accent bg-accent/10 text-accent"
        : "border-line-strong text-fg-muted hover:border-accent hover:text-accent"
    }`;

  return (
    <div className="my-10 space-y-4">
      <p className="label text-center text-fg-dim">
        <Tr k="warRoom.simulatedBadge" />
      </p>

      <HudFrame className="p-5 md:p-6">
        <header className="mb-6 border-b border-line pb-4">
          <div className="label mb-1 flex flex-wrap items-center gap-2 text-accent">
            <span className="mono">
              <Tr k="warRoom.incident.id" />
            </span>
            <span className="text-fg-dim">·</span>
            <span className="text-fg-dim">
              <Tr k="warRoom.incident.severity" />
            </span>
          </div>
          <p className="text-sm leading-relaxed text-fg-muted">
            <Tr k="warRoom.incident.summary" />
          </p>
        </header>

        {!choice ? (
          <>
            <p className="label mb-4 text-center text-fg-dim">
              <Tr k="warRoom.prompt" />
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {AGENTS.map((agent) => (
                <HudFrame key={agent} className="!border-line-strong p-4">
                  <div className="label mb-2 text-accent">
                    <Tr k={AGENT_NAME_KEYS[agent]} />
                  </div>
                  <p className="font-mono text-xs leading-relaxed text-fg-muted md:text-sm">
                    <Tr k={AGENT_FIX_KEYS[agent]} />
                  </p>
                </HudFrame>
              ))}
            </div>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
              role="group"
              aria-label="Incident response"
            >
              {(Object.keys(ACTION_KEYS) as Action[]).map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => setChoice(action)}
                  className={actionButtonClass(false)}
                >
                  <Tr k={ACTION_KEYS[action]} />
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4" aria-live="polite">
            <div className="label text-accent">
              <Tr k={OUTCOME_TITLE_KEYS[choice]} />
            </div>
            <p className="text-sm leading-relaxed text-fg-muted">
              <Tr k={OUTCOME_BODY_KEYS[choice]} />
            </p>
            <HudFrame className="border-accent/40 bg-accent/5 p-4">
              <p className="label mb-2 text-fg-dim">
                <Tr k="leadershipNote.label" />
              </p>
              <p className="text-sm leading-relaxed text-fg">
                <Tr k={LEADERSHIP_KEYS[choice]} />
              </p>
            </HudFrame>
            <div className="flex justify-center pt-2">
              <button type="button" onClick={reset} className={actionButtonClass(false)}>
                <Tr k="warRoom.replay" />
              </button>
            </div>
          </div>
        )}
      </HudFrame>
    </div>
  );
}
