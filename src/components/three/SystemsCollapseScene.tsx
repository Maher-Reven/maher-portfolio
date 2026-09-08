"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/lib/use-theme";
import { readSceneColors } from "@/lib/scene-colors";
import { NODES, EDGES } from "@/components/three/systems-collapse-data";

const COUNT = NODES.length;
const NODE_INDEX = new Map(NODES.map((n, i) => [n.id, i]));
const EDGE_PAIRS = EDGES.map((e) => [NODE_INDEX.get(e.from)!, NODE_INDEX.get(e.to)!] as const);
const SCALE = 1.2;

function smoothstep(p: number) {
  return p * p * (3 - 2 * p);
}

/**
 * Drives node/edge positions from scroll progress, computed once here and
 * pushed into three places: the instanced mesh, the edge geometry, and (via
 * refs, never React state) the DOM counter overlaid on the canvas.
 */
export function SystemsCollapseScene({
  hostRef,
  overlayRef,
  progressRef,
}: {
  hostRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<HTMLSpanElement | null>;
  progressRef: RefObject<number>;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const nodeMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const { theme } = useTheme();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(EDGE_PAIRS.length * 2 * 3), 3));
    return geo;
  }, []);

  useEffect(() => {
    const c = readSceneColors(theme);
    nodeMatRef.current?.color.copy(c.a);
    lineMatRef.current?.color.copy(c.b);
  }, [theme]);

  useFrame((_, dt) => {
    const host = hostRef.current;
    const mesh = meshRef.current;
    const line = lineRef.current;
    if (!host || !mesh || !line) return;

    const rect = host.getBoundingClientRect();
    const vh = Math.max(window.innerHeight, 1);
    const raw = THREE.MathUtils.clamp(-rect.top / Math.max(rect.height - vh, 1), 0, 1);
    progressRef.current += (raw - progressRef.current) * Math.min(1, dt * 5);
    const p = progressRef.current;
    const eased = smoothstep(p);

    if (overlayRef.current) {
      const count = Math.max(1, Math.round(THREE.MathUtils.lerp(COUNT, 1, eased)));
      overlayRef.current.textContent = String(count);
    }

    const positions = NODES.map((node) => {
      const x = THREE.MathUtils.lerp(node.start[0], node.end[0], eased) * SCALE;
      const y = THREE.MathUtils.lerp(node.start[1], node.end[1], eased) * SCALE;
      const z = THREE.MathUtils.lerp(node.start[2], node.end[2], eased) * SCALE;
      return [x, y, z] as const;
    });

    positions.forEach((pos, i) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      dummy.scale.setScalar(THREE.MathUtils.lerp(1, 0.5, eased));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;

    const linePositions = line.geometry.getAttribute("position") as THREE.BufferAttribute;
    EDGE_PAIRS.forEach(([a, b], i) => {
      const pa = positions[a];
      const pb = positions[b];
      linePositions.setXYZ(i * 2, pa[0], pa[1], pa[2]);
      linePositions.setXYZ(i * 2 + 1, pb[0], pb[1], pb[2]);
    });
    linePositions.needsUpdate = true;

    if (lineMatRef.current) {
      lineMatRef.current.opacity = 0.05 + 0.45 * (1 - eased);
    }

    mesh.rotation.y = p * Math.PI * 0.5;
    line.rotation.y = p * Math.PI * 0.5;
  });

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial ref={nodeMatRef} color="#a855f7" />
      </instancedMesh>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial ref={lineMatRef} color="#ec4899" transparent opacity={0.5} />
      </lineSegments>
    </>
  );
}
