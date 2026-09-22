"use client";

import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { VectorSearchScene, QUERY, CANDIDATES } from "@/components/three/VectorSearchScene";
import { readSceneColors } from "@/lib/scene-colors";
import { useTheme } from "@/lib/use-theme";
import { Tr } from "@/components/i18n/Tr";

type Mode = "cosine" | "distance";

function cosineSimilarity(a: THREE.Vector3, b: THREE.Vector3): number {
  return a.dot(b) / (a.length() * b.length());
}

/**
 * EXP-008. Cosine similarity only measures the angle a vector makes with the
 * origin — magnitude is irrelevant. So a candidate far from the query in raw
 * space can still be the top cosine match if it points the same direction,
 * while a candidate sitting right next to the query's tip can lose on angle
 * alone. Same five fixed points, ranked two different ways.
 */
export function VectorSearch() {
  const { theme } = useTheme();
  const [mode, setMode] = useState<Mode>("cosine");

  const sceneColors = useMemo(() => readSceneColors(theme), [theme]);

  const rows = useMemo(() => {
    const q = new THREE.Vector3(...QUERY);
    return CANDIDATES.map((c) => {
      const v = new THREE.Vector3(...c.pos);
      return {
        key: c.key,
        cosine: cosineSimilarity(q, v),
        distance: q.distanceTo(v),
      };
    }).sort((a, b) => (mode === "cosine" ? b.cosine - a.cosine : a.distance - b.distance));
  }, [mode]);

  const winnerKey = rows[0]?.key ?? CANDIDATES[0].key;

  return (
    <div className="my-10 border border-line bg-[var(--bg-panel)] p-6">
      <div className="relative h-[340px] w-full md:h-[400px]">
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
          camera={{ position: [5, 4, 7], fov: 45 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <color attach="background" args={[sceneColors.bg]} />
          <VectorSearchScene winnerKey={winnerKey} theme={theme} />
        </Canvas>
        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
          <span className="label text-fg-dim">
            <Tr k="vectorSearch.hint" />
          </span>
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex shrink-0 flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-fg-dim">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--fg)]" aria-hidden />
            <Tr k="vectorSearch.query" />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("cosine")}
              className={`bracket mono border px-3 py-1.5 text-xs transition-colors ${
                mode === "cosine"
                  ? "border-accent text-accent"
                  : "border-line-strong text-fg-muted hover:border-accent hover:text-accent"
              }`}
            >
              <Tr k="vectorSearch.rankCosine" />
            </button>
            <button
              type="button"
              onClick={() => setMode("distance")}
              className={`bracket mono border px-3 py-1.5 text-xs transition-colors ${
                mode === "distance"
                  ? "border-accent text-accent"
                  : "border-line-strong text-fg-muted hover:border-accent hover:text-accent"
              }`}
            >
              <Tr k="vectorSearch.rankDistance" />
            </button>
          </div>
        </div>

        <div className="w-full font-mono text-xs text-fg-muted md:text-sm">
          <div className="mb-1.5 flex gap-4 text-fg-dim">
            <span className="w-10">—</span>
            <span className="w-16">
              <Tr k="vectorSearch.cosineLabel" />
            </span>
            <span className="w-16">
              <Tr k="vectorSearch.distanceLabel" />
            </span>
          </div>
          {rows.map((row, i) => (
            <div key={row.key} className={`flex items-center gap-4 border-t border-line py-1.5 ${i === 0 ? "text-fg" : ""}`}>
              <span className="w-10">{row.key}</span>
              <span className="w-16">{row.cosine.toFixed(3)}</span>
              <span className="w-16">{row.distance.toFixed(2)}</span>
              {i === 0 && (
                <span className="text-accent">
                  <Tr k="vectorSearch.picked" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-fg-muted">
        <Tr k="vectorSearch.caption" />
      </p>
    </div>
  );
}
