"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap, useReducedMotion } from "@/lib/motion";
import { readSceneColors } from "@/lib/scene-colors";
import type { Theme } from "@/lib/theme";

/** A query and five candidates, chosen so cosine and Euclidean-distance ranking disagree. */
export const QUERY: [number, number, number] = [0, 0, 2];

export const CANDIDATES: { key: string; pos: [number, number, number] }[] = [
  { key: "V1", pos: [1.1472, 0, 1.6383] },
  { key: "V2", pos: [0, 0.835, 5.9416] },
  { key: "V3", pos: [-2.165, 0, 1.25] },
  { key: "V4", pos: [0.8467, 0.8467, 3.289] },
  { key: "V5", pos: [0, 1.0607, 1.0607] },
];

const AXES: [number, number, number][] = [
  [3, 0, 0],
  [0, 3, 0],
  [0, 0, 3],
];

const ARC_RADIUS = 0.55;
const ARC_SEGMENTS = 24;

/** Points tracing the "corner" between two directions from the origin — a great-circle
 * arc at a fixed radius, `fraction` of the way from `dirA` to `dirB` (1 = the full angle). */
function arcPoints(dirA: THREE.Vector3, dirB: THREE.Vector3, radius: number, fraction: number): THREE.Vector3[] {
  const fullAngle = dirA.angleTo(dirB);
  const angle = fullAngle * fraction;
  const axis = new THREE.Vector3().crossVectors(dirA, dirB);
  if (axis.lengthSq() < 1e-8) axis.set(0, 1, 0);
  axis.normalize();
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= ARC_SEGMENTS; i++) {
    const t = (i / ARC_SEGMENTS) * angle;
    const q = new THREE.Quaternion().setFromAxisAngle(axis, t);
    points.push(dirA.clone().applyQuaternion(q).multiplyScalar(radius));
  }
  return points;
}

/** A camera-facing degree label, rasterized once to a canvas texture and tinted via
 * SpriteMaterial.color — no in-3D text renderer needed for a handful of static labels. */
function makeLabelSprite(text: string): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "bold 40px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(text, 64, 34);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.5, 0.25, 1);
  return sprite;
}

export function VectorSearchScene({ winnerKey, theme }: { winnerKey: string; theme: Theme }) {
  const { camera, gl, scene } = useThree();
  const controlsRef = useRef<OrbitControls | null>(null);
  const spritesRef = useRef<THREE.Sprite[]>([]);
  const reduced = useReducedMotion();
  const prevWinnerRef = useRef(winnerKey);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 14;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;
    return () => controls.dispose();
  }, [camera, gl]);

  useFrame(() => {
    controlsRef.current?.update();
  });

  const queryVec = useMemo(() => new THREE.Vector3(...QUERY), []);
  const candidateVecs = useMemo(() => CANDIDATES.map((c) => new THREE.Vector3(...c.pos)), []);
  const queryDir = useMemo(() => queryVec.clone().normalize(), [queryVec]);
  const candidateDirs = useMemo(() => candidateVecs.map((v) => v.clone().normalize()), [candidateVecs]);

  const sceneColors = useMemo(() => readSceneColors(theme), [theme]);

  const candidatePalette = useMemo(
    () =>
      CANDIDATES.map((_, i) => {
        const hue = i / CANDIDATES.length;
        const bright = new THREE.Color().setHSL(hue, 0.65, 0.58);
        const dim = bright.clone().lerp(sceneColors.bg, 0.6);
        return { bright, dim };
      }),
    [sceneColors]
  );

  const axisLines = useMemo(
    () =>
      AXES.map(
        (end) =>
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(...end)]),
            new THREE.LineBasicMaterial({ color: sceneColors.fg, transparent: true, opacity: 0.15 })
          )
      ),
    [sceneColors]
  );

  // Stable identities (deps never change after mount) so the entrance draw-in below
  // only ever plays once — color is applied imperatively, not baked into the memo.
  const queryArrow = useMemo(
    () => new THREE.ArrowHelper(queryDir, new THREE.Vector3(0, 0, 0), queryVec.length(), 0xffffff, 0.3, 0.16),
    [queryDir, queryVec]
  );
  const candidateArrows = useMemo(
    () =>
      candidateVecs.map(
        (v, i) => new THREE.ArrowHelper(candidateDirs[i], new THREE.Vector3(0, 0, 0), v.length(), 0xffffff, 0.26, 0.14)
      ),
    [candidateVecs, candidateDirs]
  );

  useEffect(() => {
    queryArrow.setColor(sceneColors.fg);
  }, [queryArrow, sceneColors]);

  // The bare JSX <line> tag collides with SVG's in R3F's TS types, so lines are plain
  // three.js objects rendered via <primitive>, same as the arrows/axes.
  const connectorMaterial = useMemo(() => new THREE.LineDashedMaterial({ dashSize: 0.15, gapSize: 0.1 }), []);
  const connectorLine = useMemo(() => new THREE.Line(new THREE.BufferGeometry(), connectorMaterial), [connectorMaterial]);

  const arcMaterials = useMemo(() => CANDIDATES.map(() => new THREE.LineBasicMaterial({ transparent: true })), []);
  const arcLines = useMemo(
    () =>
      CANDIDATES.map(
        (_, i) =>
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(arcPoints(queryDir, candidateDirs[i], ARC_RADIUS, 1)),
            arcMaterials[i]
          )
      ),
    [queryDir, candidateDirs, arcMaterials]
  );

  // Angle labels are static text (the angle itself never changes), so they're built once
  // and added straight to the scene — no JSX primitive needed for a fire-and-forget sprite.
  useEffect(() => {
    const sprites = CANDIDATES.map((c, i) => {
      const midDir = queryDir.clone().add(candidateDirs[i]).normalize();
      const angleDeg = Math.round(THREE.MathUtils.radToDeg(queryDir.angleTo(candidateDirs[i])));
      const sprite = makeLabelSprite(`${angleDeg}°`);
      sprite.position.copy(midDir.multiplyScalar(ARC_RADIUS * 1.45));
      scene.add(sprite);
      return sprite;
    });
    spritesRef.current = sprites;
    return () => {
      sprites.forEach((s) => {
        scene.remove(s);
        s.material.map?.dispose();
        s.material.dispose();
      });
      spritesRef.current = [];
    };
  }, [scene, queryDir, candidateDirs]);

  // Entrance: every arrow grows from the origin to its full length once, on mount.
  useEffect(() => {
    const arrows = [
      { arrow: queryArrow, len: queryVec.length(), headLen: 0.3, headWidth: 0.16 },
      ...candidateArrows.map((arrow, i) => ({ arrow, len: candidateVecs[i].length(), headLen: 0.26, headWidth: 0.14 })),
    ];

    if (reduced) {
      arrows.forEach(({ arrow, len, headLen, headWidth }) => arrow.setLength(len, headLen, headWidth));
      return;
    }

    const tweens = arrows.map(({ arrow, len, headLen, headWidth }, i) => {
      const proxy = { t: 0.001 };
      return gsap.to(proxy, {
        t: 1,
        duration: 0.7,
        delay: i * 0.08,
        ease: "power2.out",
        onUpdate: () => arrow.setLength(len * proxy.t, headLen, headWidth),
      });
    });
    return () => tweens.forEach((tw) => tw.kill());
  }, [queryArrow, candidateArrows, queryVec, candidateVecs, reduced]);

  // Winner colors (arrows, arcs, labels) — reacts to both the ranking toggle and theme.
  useEffect(() => {
    candidateArrows.forEach((arrow, i) => {
      const isWinner = CANDIDATES[i].key === winnerKey;
      arrow.setColor(isWinner ? candidatePalette[i].bright : candidatePalette[i].dim);
    });
    arcMaterials.forEach((mat, i) => {
      const isWinner = CANDIDATES[i].key === winnerKey;
      mat.color.copy(isWinner ? candidatePalette[i].bright : candidatePalette[i].dim);
      mat.opacity = isWinner ? 0.9 : 0.35;
    });
    spritesRef.current.forEach((sprite, i) => {
      const isWinner = CANDIDATES[i].key === winnerKey;
      sprite.material.color.copy(isWinner ? candidatePalette[i].bright : candidatePalette[i].dim);
      sprite.material.opacity = isWinner ? 1 : 0.55;
    });

    const winnerIdx = CANDIDATES.findIndex((c) => c.key === winnerKey);
    if (winnerIdx >= 0) {
      const positions = new Float32Array([
        queryVec.x,
        queryVec.y,
        queryVec.z,
        candidateVecs[winnerIdx].x,
        candidateVecs[winnerIdx].y,
        candidateVecs[winnerIdx].z,
      ]);
      connectorLine.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      connectorLine.geometry.computeBoundingSphere();
      connectorLine.computeLineDistances();
    }
  }, [winnerKey, candidateArrows, candidatePalette, candidateVecs, queryVec, connectorLine, arcMaterials]);

  // Sweep the newly-winning candidate's arc from 0° to its true angle, once per change.
  useEffect(() => {
    if (prevWinnerRef.current === winnerKey) return;
    prevWinnerRef.current = winnerKey;
    const winnerIdx = CANDIDATES.findIndex((c) => c.key === winnerKey);
    if (winnerIdx < 0) return;
    const line = arcLines[winnerIdx];

    if (reduced) {
      line.geometry.setFromPoints(arcPoints(queryDir, candidateDirs[winnerIdx], ARC_RADIUS, 1));
      return;
    }

    const proxy = { f: 0 };
    const tween = gsap.to(proxy, {
      f: 1,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => line.geometry.setFromPoints(arcPoints(queryDir, candidateDirs[winnerIdx], ARC_RADIUS, proxy.f)),
    });
    return () => {
      tween.kill();
    };
  }, [winnerKey, arcLines, queryDir, candidateDirs, reduced]);

  return (
    <>
      {axisLines.map((l, i) => (
        <primitive key={i} object={l} />
      ))}

      <primitive object={queryArrow} />
      <mesh position={queryVec}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={sceneColors.fg} />
      </mesh>

      {candidateArrows.map((arrow, i) => (
        <primitive key={CANDIDATES[i].key} object={arrow} />
      ))}
      {candidateVecs.map((v, i) => (
        <mesh key={CANDIDATES[i].key} position={v}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={candidatePalette[i].bright} />
        </mesh>
      ))}

      {arcLines.map((l, i) => (
        <primitive key={CANDIDATES[i].key} object={l} />
      ))}

      <primitive object={connectorLine} />
    </>
  );
}
