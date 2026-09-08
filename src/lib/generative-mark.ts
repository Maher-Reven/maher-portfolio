/**
 * Seeded generative variations of the "MK" monogram (site.handle) — a fixed
 * letterform skeleton, jittered per seed so it's reproducible from that seed
 * but never the same twice across loads. Pure data/math, no React, so it can
 * be unit-reasoned-about and reused by the component without re-deriving it
 * on every render.
 */

export type Point = [number, number];

export type MarkNode = { point: Point; letter: "m" | "k" };

export type GeneratedMark = {
  /** Polyline vertices for each letter, already jittered. */
  m: Point[];
  k: Point[];
  /** Small square "circuit node" ticks sitting on a subset of the jittered
   * vertices above — tagged by letter so the renderer knows which one's
   * layout offset to apply. */
  nodes: MarkNode[];
  /** 0 = pure --accent, 1 = pure --accent-2. */
  colorMix: number;
  /** Stroke width, in SVG user units. */
  weight: number;
};

/** mulberry32 — tiny deterministic PRNG. Same algorithm as the 45→1 systems
 * data (src/components/three/systems-collapse-data.ts), duplicated rather
 * than shared since it's a handful of lines and the two aren't related. */
function mulberry32(seed: number) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Letterform skeletons, in a shared 0–100 viewBox unit square per letter.
const M_SKELETON: Point[] = [
  [0, 100],
  [0, 0],
  [50, 60],
  [100, 0],
  [100, 100],
];

const K_SKELETON: Point[] = [
  [0, 100],
  [0, 0],
  [0, 50],
  [60, 0],
  [0, 50],
  [60, 100],
];

function jitter(points: Point[], rand: () => number, amount: number): Point[] {
  return points.map(([x, y]) => [x + (rand() - 0.5) * amount, y + (rand() - 0.5) * amount]);
}

export function generateMark(seed: number): GeneratedMark {
  const rand = mulberry32(seed);
  const amount = 6 + rand() * 10; // how far vertices wander, in the same 0–100 units

  const m = jitter(M_SKELETON, rand, amount);
  const k = jitter(K_SKELETON, rand, amount);

  // A handful of the jittered vertices themselves get a "circuit node" tick.
  const nodeCount = 3 + Math.floor(rand() * 4);
  const nodes: MarkNode[] = [];
  for (let i = 0; i < nodeCount; i++) {
    const fromM = rand() < 0.5;
    const source = fromM ? m : k;
    nodes.push({ point: source[Math.floor(rand() * source.length)], letter: fromM ? "m" : "k" });
  }

  return {
    m,
    k,
    nodes,
    colorMix: rand(),
    weight: 2 + rand() * 2.5,
  };
}
