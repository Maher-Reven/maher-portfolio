"use client";

import { useCallback, useMemo, useState } from "react";
import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";
import { useLocale } from "@/lib/use-locale";
import { useReducedMotion } from "@/lib/motion";
import type { TKey } from "@/lib/i18n";

type Tier = "read-only" | "propose" | "gated-automatic";
type Scenario = "read-issue" | "open-pr" | "payment-api";
type Outcome = "success" | "blocked" | "awaiting";

type Tools = {
  issueReader: boolean;
  prOpener: boolean;
  paymentApi: boolean;
};

const DEFAULT_TOOLS: Tools = {
  issueReader: true,
  prOpener: true,
  paymentApi: false,
};

const TIERS: Tier[] = ["read-only", "propose", "gated-automatic"];
const SCENARIOS: Scenario[] = ["read-issue", "open-pr", "payment-api"];

const TIER_KEYS: Record<Tier, TKey> = {
  "read-only": "builder.tier.readOnly",
  propose: "builder.tier.propose",
  "gated-automatic": "builder.tier.gatedAutomatic",
};

const SCENARIO_KEYS: Record<Scenario, TKey> = {
  "read-issue": "builder.scenario.readIssue",
  "open-pr": "builder.scenario.openPr",
  "payment-api": "builder.scenario.paymentApi",
};

const TOOL_KEYS: Record<keyof Tools, TKey> = {
  issueReader: "builder.tool.issueReader",
  prOpener: "builder.tool.prOpener",
  paymentApi: "builder.tool.paymentApi",
};

function simulate(scenario: Scenario, tools: Tools, tier: Tier): { outcome: Outcome; lines: TKey[] } {
  const base: TKey[] = ["builder.log.harnessStart", "builder.log.contextLoaded"];

  if (scenario === "read-issue") {
    if (!tools.issueReader) {
      return {
        outcome: "blocked",
        lines: [...base, "builder.log.toolIssueReaderMissing", "builder.log.haltTools"],
      };
    }
    return {
      outcome: "success",
      lines: [
        ...base,
        "builder.log.tierAllowsRead",
        "builder.log.permIssueReadPass",
        "builder.log.toolIssueReaderCall",
        "builder.log.loopIdle",
        "builder.log.doneReadIssue",
      ],
    };
  }

  if (scenario === "open-pr") {
    if (!tools.prOpener) {
      return {
        outcome: "blocked",
        lines: [...base, "builder.log.toolPrOpenerMissing", "builder.log.haltTools"],
      };
    }
    if (tier === "read-only") {
      return {
        outcome: "blocked",
        lines: [...base, "builder.log.tierReadOnlyWrite", "builder.log.permPrDenied", "builder.log.haltPermissions"],
      };
    }
    return {
      outcome: "awaiting",
      lines: [
        ...base,
        "builder.log.tierProposeWrite",
        "builder.log.permPrDraftOnly",
        "builder.log.toolPrOpenerCall",
        "builder.log.prDraftCreated",
        "builder.log.awaitingHuman",
      ],
    };
  }

  // payment-api
  if (!tools.paymentApi) {
    return {
      outcome: "blocked",
      lines: [...base, "builder.log.toolPaymentMissing", "builder.log.haltTools"],
    };
  }
  if (tier !== "gated-automatic") {
    return {
      outcome: "blocked",
      lines: [
        ...base,
        "builder.log.tierPaymentInsufficient",
        "builder.log.permPaymentDenied",
        "builder.log.haltPermissions",
      ],
    };
  }
  return {
    outcome: "success",
    lines: [
      ...base,
      "builder.log.tierGatedPayment",
      "builder.log.permPaymentPass",
      "builder.log.evalGatePass",
      "builder.log.toolPaymentCall",
      "builder.log.auditLogged",
      "builder.log.donePayment",
    ],
  };
}

const OUTCOME_KEYS: Record<Outcome, TKey> = {
  success: "builder.outcome.success",
  blocked: "builder.outcome.blocked",
  awaiting: "builder.outcome.awaiting",
};

/**
 * EXP-009. Configure tools and an autonomy tier, then run scripted scenarios —
 * deterministic client-side logs only, no live APIs. Same harness vocabulary as
 * HarnessAnatomy and the autonomy ladder on Beyond autocomplete.
 */
export function HarnessBuilder() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const [tools, setTools] = useState<Tools>(DEFAULT_TOOLS);
  const [tier, setTier] = useState<Tier>("propose");
  const [scenario, setScenario] = useState<Scenario>("read-issue");
  const [logKeys, setLogKeys] = useState<TKey[] | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const run = useCallback(() => {
    const result = simulate(scenario, tools, tier);
    setLogKeys(result.lines);
    setOutcome(result.outcome);
  }, [scenario, tools, tier]);

  const logLines = useMemo(() => logKeys?.map((k) => t(k)) ?? [], [logKeys, t]);

  const toggleTool = (key: keyof Tools) => {
    setTools((prev) => ({ ...prev, [key]: !prev[key] }));
    setLogKeys(null);
    setOutcome(null);
  };

  return (
    <div className="my-10 space-y-4">
      <p className="label text-center text-fg-dim">
        <Tr k="builder.simulatedBadge" />
      </p>

      <HudFrame className="p-5 md:p-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <fieldset>
              <legend className="label mb-3 text-accent">
                <Tr k="builder.toolsHeading" />
              </legend>
              <div className="flex flex-col gap-2">
                {(Object.keys(TOOL_KEYS) as (keyof Tools)[]).map((key) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-3 border border-line px-3 py-2 transition-colors has-[:checked]:border-accent"
                  >
                    <input
                      type="checkbox"
                      checked={tools[key]}
                      onChange={() => toggleTool(key)}
                      className="accent-[var(--accent)]"
                    />
                    <span className="mono text-sm text-fg">
                      <Tr k={TOOL_KEYS[key]} />
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="label mb-3 text-accent">
                <Tr k="builder.tierHeading" />
              </legend>
              <div className="flex flex-wrap gap-2">
                {TIERS.map((tKey) => (
                  <button
                    key={tKey}
                    type="button"
                    onClick={() => {
                      setTier(tKey);
                      setLogKeys(null);
                      setOutcome(null);
                    }}
                    className={`bracket mono border px-3 py-1.5 text-xs transition-colors ${
                      tier === tKey
                        ? "border-accent text-accent"
                        : "border-line-strong text-fg-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    <Tr k={TIER_KEYS[tKey]} />
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="label mb-3 text-accent">
                <Tr k="builder.scenarioHeading" />
              </legend>
              <div className="flex flex-col gap-2">
                {SCENARIOS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setScenario(s);
                      setLogKeys(null);
                      setOutcome(null);
                    }}
                    className={`bracket mono border px-3 py-2 text-left text-xs transition-colors ${
                      scenario === s
                        ? "border-accent text-accent"
                        : "border-line-strong text-fg-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    <Tr k={SCENARIO_KEYS[s]} />
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={run}
              className="bracket mono w-full border border-accent px-4 py-2 text-sm text-accent transition-colors hover:bg-accent/10"
            >
              <Tr k="builder.run" />
            </button>
          </div>

          <div className="flex min-h-[280px] flex-col">
            <div className="label mb-2 flex items-center justify-between gap-2 text-fg-dim">
              <span>
                <Tr k="builder.logHeading" />
              </span>
              {outcome ? (
                <span
                  className={
                    outcome === "blocked"
                      ? "text-[var(--fg-muted)]"
                      : outcome === "awaiting"
                        ? "text-accent"
                        : "text-fg"
                  }
                >
                  <Tr k={OUTCOME_KEYS[outcome]} />
                </span>
              ) : null}
            </div>
            <div
              className="flex-1 overflow-y-auto border border-line bg-[var(--bg)] p-3 font-mono text-xs leading-relaxed text-fg-muted md:text-sm"
              aria-live={reduced ? "polite" : "off"}
            >
              {logLines.length === 0 ? (
                <span className="text-fg-dim">
                  <Tr k="builder.logEmpty" />
                </span>
              ) : (
                logLines.map((line, i) => (
                  <div key={`${line}-${i}`}>
                    {"> "}
                    {line}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </HudFrame>
    </div>
  );
}
