"use client";

import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { gsap, useReducedMotion } from "@/lib/motion";
import { HudFrame } from "@/components/ui/HudFrame";
import { Tr } from "@/components/i18n/Tr";
import { useLocale } from "@/lib/use-locale";
import type { TKey } from "@/lib/i18n";

type NodeId = "github" | "linear" | "sentry" | "context" | "agent";

const NODE_LAYOUT: Record<NodeId, { x: number; y: number; labelKey: TKey }> = {
  github: { x: 72, y: 56, labelKey: "contextGraph.node.github" },
  linear: { x: 200, y: 36, labelKey: "contextGraph.node.linear" },
  sentry: { x: 328, y: 56, labelKey: "contextGraph.node.sentry" },
  context: { x: 200, y: 148, labelKey: "contextGraph.node.contextLayer" },
  agent: { x: 200, y: 268, labelKey: "contextGraph.node.agentSession" },
};

const LAYER_EDGES: { from: NodeId; to: NodeId; key: string }[] = [
  { from: "github", to: "context", key: "gh-ctx" },
  { from: "linear", to: "context", key: "ln-ctx" },
  { from: "sentry", to: "context", key: "se-ctx" },
  { from: "context", to: "agent", key: "ctx-agent" },
];

const FRAGMENT_EDGES: { from: NodeId; to: NodeId; key: string }[] = [
  { from: "github", to: "agent", key: "gh-agent" },
  { from: "linear", to: "agent", key: "ln-agent" },
  { from: "sentry", to: "agent", key: "se-agent" },
];

function edgeLine(from: NodeId, to: NodeId) {
  const a = NODE_LAYOUT[from];
  const b = NODE_LAYOUT[to];
  return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
}

/**
 * EXP-009. Simulated view of the shared context layer from Beyond autocomplete —
 * three siloed signals (GitHub, Linear, Sentry) either fuse through one hub or force
 * every agent session to rebuild the picture from scratch. Pure SVG + GSAP edge pulses;
 * no OAuth, no MCP, no live APIs.
 */
export function ContextGraphExplorer() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const [connected, setConnected] = useState(true);
  const layerEdgeRefs = useRef<Partial<Record<string, SVGLineElement>>>({});
  const pulseRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    pulseRef.current?.kill();
    if (reduced) return;

    if (connected) {
      const lines = LAYER_EDGES.map((e) => layerEdgeRefs.current[e.key]).filter(Boolean) as SVGLineElement[];
      lines.forEach((line) => {
        gsap.set(line, { strokeDashoffset: 0, opacity: 1 });
      });
      pulseRef.current = gsap.to(lines, {
        strokeDashoffset: -24,
        duration: 1.2,
        ease: "none",
        repeat: -1,
        stagger: 0.08,
      });
    }

    return () => {
      pulseRef.current?.kill();
    };
  }, [connected, reduced]);

  const toggle = () => setConnected((c) => !c);

  return (
    <HudFrame className="my-10 not-prose overflow-hidden p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="label text-fg-dim">
          <Tr k="contextGraph.simulated" />
        </span>
        <button
          type="button"
          onClick={toggle}
          className="label border border-line px-3 py-2 text-accent transition-colors hover:border-line-strong"
          aria-pressed={connected}
        >
          {connected ? <Tr k="contextGraph.toggleConnected" /> : <Tr k="contextGraph.toggleBroken" />}
        </button>
      </div>

      <p className="mono mb-4 text-center text-xs text-fg-muted md:text-sm">
        {connected ? <Tr k="contextGraph.statusConnected" /> : <Tr k="contextGraph.statusBroken" />}
      </p>

      <svg
        viewBox="0 0 400 300"
        className="mx-auto block w-full max-w-lg"
        role="img"
        aria-label={t("contextGraph.ariaSummary")}
      >
        <defs>
          <marker
            id={`${uid}-arrow`}
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent)" opacity={connected ? 1 : 0.35} />
          </marker>
        </defs>

        {FRAGMENT_EDGES.map((edge) => {
          const { x1, y1, x2, y2 } = edgeLine(edge.from, edge.to);
          return (
            <line
              key={edge.key}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--fg-dim)"
              strokeWidth={1}
              strokeDasharray="3 8"
              className={clsx(
                "transition-opacity duration-500",
                connected ? "opacity-0" : "opacity-45"
              )}
            />
          );
        })}

        {LAYER_EDGES.map((edge) => {
          const { x1, y1, x2, y2 } = edgeLine(edge.from, edge.to);
          const isHub = edge.to === "agent";
          return (
            <line
              key={edge.key}
              ref={(el) => {
                layerEdgeRefs.current[edge.key] = el ?? undefined;
              }}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={connected ? "var(--accent)" : "var(--line-strong)"}
              strokeWidth={isHub ? 2 : 1.5}
              strokeDasharray={connected && !reduced ? "10 6" : connected ? "none" : "4 10"}
              markerEnd={connected ? `url(#${uid}-arrow)` : undefined}
              className={clsx("transition-all duration-500", connected ? "opacity-100" : "opacity-25")}
            />
          );
        })}

        {(Object.keys(NODE_LAYOUT) as NodeId[]).map((id) => {
          const node = NODE_LAYOUT[id];
          const isHub = id === "context";
          const isAgent = id === "agent";
          const r = isHub ? 34 : isAgent ? 28 : 24;
          const label = t(node.labelKey);
          return (
            <g key={id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill="var(--bg-panel)"
                stroke={isHub && connected ? "var(--accent)" : "var(--line-strong)"}
                strokeWidth={isHub ? 2 : 1}
                className="transition-colors duration-500"
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[var(--fg)] font-mono text-[9px] uppercase tracking-wide md:text-[10px]"
              >
                {label.split(" ").map((word, i, arr) => (
                  <tspan key={i} x={node.x} dy={i === 0 ? (arr.length > 1 ? -5 : 0) : 11}>
                    {word}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>

      <p className="label mt-4 text-center text-fg-dim">
        <Tr k="contextGraph.hint" />
      </p>
    </HudFrame>
  );
}
