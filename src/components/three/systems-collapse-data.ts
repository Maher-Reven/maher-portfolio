/**
 * Static topology for the 45→1 systems-collapse visual: 45 nodes scattered
 * like a fragmented estate, each converging toward a single point. Generated
 * once from a seeded PRNG rather than hand-typed or fetched, so it's the same
 * on every build without a 45-entry literal to maintain by hand.
 */

export type SystemNode = { id: string; start: [number, number, number]; end: [number, number, number] };
export type SystemEdge = { from: string; to: string };

const COUNT = 45;

/** mulberry32 — tiny deterministic PRNG, fixed seed so the layout never shifts. */
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

const rand = mulberry32(1337);

/** Fibonacci-sphere placement plus jitter — an even scatter, not a lattice. */
function scatteredPoint(i: number): [number, number, number] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (i / (COUNT - 1)) * 2;
  const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = golden * i;
  const r = 1.5 + rand() * 0.4;
  const jitter = () => (rand() - 0.5) * 0.35;
  return [
    Math.cos(theta) * radiusAtY * r + jitter(),
    y * r + jitter(),
    Math.sin(theta) * radiusAtY * r + jitter(),
  ];
}

export const NODES: SystemNode[] = Array.from({ length: COUNT }, (_, i) => ({
  id: `repo-${i}`,
  start: scatteredPoint(i),
  end: [(rand() - 0.5) * 0.1, (rand() - 0.5) * 0.1, (rand() - 0.5) * 0.1],
}));

function dist(a: [number, number, number], b: [number, number, number]) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

/**
 * A deliberately tangled pre-collapse mesh: each node linked to its two
 * nearest neighbours plus a handful of longer cross-links, so it reads as
 * genuinely fragmented rather than a clean tree.
 */
export const EDGES: SystemEdge[] = (() => {
  const edges: SystemEdge[] = [];
  const seen = new Set<string>();
  const add = (a: string, b: string) => {
    if (a === b) return;
    const key = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push({ from: a, to: b });
  };

  NODES.forEach((node, i) => {
    const nearest = NODES.map((other, j) => ({ j, d: dist(node.start, other.start) }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d);
    add(node.id, NODES[nearest[0].j].id);
    add(node.id, NODES[nearest[1].j].id);
  });

  for (let i = 0; i < 18; i++) {
    const a = NODES[Math.floor(rand() * COUNT)];
    const b = NODES[Math.floor(rand() * COUNT)];
    add(a.id, b.id);
  }

  return edges;
})();
