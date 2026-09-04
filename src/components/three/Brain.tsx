"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/lib/use-theme";
import { readSceneColors } from "@/lib/scene-colors";

/* ────────────────────────────────────────────────────────────────
   Procedural brain — no model file, an icosphere reshaped in GLSL.

   What makes it read as a brain is anatomy, not wrinkliness:
     · a deep longitudinal fissure splitting the hemispheres
     · the lateral (Sylvian) fissure and the temporal lobe under it,
       which is the defining feature in three-quarter view
     · a cerebellum at the lower rear, with its own much finer folia
     · frontal and occipital tapering, flat underside

   Sulci come from contour banding — see sulciField below. The domain
   is stretched front-to-back so gyri elongate the way they do on the
   lateral surface.

   Shading is per-theme: on dark it's emissive and unlit areas go
   transparent so the fluid shader shows through; on light that would
   erase the shadowed side against paper, so it becomes a solid object
   with occlusion and a darkened contact rim instead.
   ──────────────────────────────────────────────────────────────── */

/** Simplex noise 3D (Ashima / Stefan Gustavson) — shared by both stages. */
const NOISE = /* glsl */ `
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

/**
 * The furrow field, shared by the vertex stage (to carve geometry) and the
 * fragment stage (to shade the carving crisply, independent of tessellation).
 * Both stages must agree exactly or the shading slides off the geometry.
 */
const FIELD = /* glsl */ `
  // Cerebellum sits low and to the back; used to swap fold styles and add mass.
  float cerebellumMask(vec3 d){
    return smoothstep(0.60, 0.18, distance(d, normalize(vec3(0.0, -0.52, -0.86))));
  }

  // Cortical sulci. The trick is contour banding: a triangle wave applied to a
  // smooth field carves furrows along that field's contour lines, which are
  // dense meandering *parallel* curves — exactly how gyri pack onto a cortex.
  // (Zero-crossings of noise give sparse isolated grooves; ridged fbm gives
  // crumpled paper. Neither reads as a brain.)
  float sulciField(vec3 d){
    vec3 p = d * vec3(1.45, 1.15, 0.80);
    vec3 w = vec3(snoise(p*0.8 + 5.0), snoise(p*0.8 + 19.0), snoise(p*0.8 + 37.0));
    p += w * 0.45;
    float n = snoise(p * 1.5) + 0.45 * snoise(p * 3.0 + 11.0);
    float tri = abs(fract(n * 1.9) - 0.5) * 2.0;   // 0 at each furrow centre
    return 1.0 - smoothstep(0.0, 0.62, tri);
  }

  // Cerebellar folia: the same banding, far finer and near-horizontal.
  float foliaField(vec3 d){
    vec3 p = d * vec3(1.1, 3.2, 1.1);
    float n = snoise(p * 2.2 + 71.0);
    float tri = abs(fract(n * 5.5) - 0.5) * 2.0;
    return 1.0 - smoothstep(0.0, 0.55, tri);
  }

  float grooves(vec3 d){
    return mix(sulciField(d), foliaField(d), cerebellumMask(d));
  }

  // Unit direction -> point on the brain surface.
  vec3 brainPoint(vec3 d, out float groove){
    groove = grooves(d);

    // Mirrored direction: the temporal lobes are a symmetric pair.
    vec3 dm = vec3(abs(d.x), d.y, d.z);

    float r = 1.0;

    // The underside is hollow only along the midline, between the temporal
    // lobes — scooping the whole base flattens it into a disc. Laterally the
    // temporal lobes carry the profile all the way down.
    r -= smoothstep(-0.10, -0.70, d.y) * (1.0 - smoothstep(0.05, 0.45, abs(d.x))) * 0.22;
    r += smoothstep(0.78, 0.05, distance(dm, normalize(vec3(0.58, -0.44, 0.42)))) * 0.17;
    r += cerebellumMask(d) * 0.12;

    // Lateral (Sylvian) fissure — the deep diagonal cleft above the temporal
    // lobe. In lateral view this is the single most identifying feature.
    float dy = d.y - (-0.05 - 0.55 * d.z);
    r -= exp(-pow(dy * 6.0, 2.0))
       * smoothstep(0.15, 0.50, abs(d.x))     // lateral surfaces only
       * smoothstep(-0.80, -0.25, d.z)        // fades at the occipital pole
       * 0.13;

    // Longitudinal fissure — the midline split, dorsal surface only.
    r -= exp(-pow(d.x * 7.0, 2.0)) * smoothstep(-0.15, 0.45, d.y) * 0.24;

    r += snoise(d * 1.7 + 3.0) * 0.020;   // gentle asymmetry, no two alike
    r -= groove * 0.105;                  // the furrows themselves
    r += pow(1.0 - groove, 3.0) * 0.020;  // gyral crowns bulge between them

    vec3 p = d * vec3(0.80, 0.74, 1.0) * r;
    p.x *= 1.0 - 0.14 * smoothstep(0.15, 1.0,  d.z);  // narrows at the front
    p.x *= 1.0 - 0.10 * smoothstep(0.35, 1.0, -d.z);  // and at the back
    return p;
  }
`;

const vertex = /* glsl */ `
  varying vec3  vNormal;
  varying vec3  vViewPos;
  varying vec3  vDir;
  varying vec3  vLocal;

  ${NOISE}
  ${FIELD}

  void main(){
    vec3 d = normalize(position);

    float g0;
    vec3 p0 = brainPoint(d, g0);

    // Normals from neighbours — the sphere's own normals know nothing about
    // the fissures or the folds.
    vec3 up = abs(d.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 T = normalize(cross(up, d));
    vec3 B = cross(d, T);
    float e = 0.012, g1, g2;
    vec3 p1 = brainPoint(normalize(d + T * e), g1);
    vec3 p2 = brainPoint(normalize(d + B * e), g2);
    vec3 n  = normalize(cross(p1 - p0, p2 - p0));

    vDir    = d;
    vLocal  = p0;
    vNormal = normalize(normalMatrix * n);

    vec4 mv = modelViewMatrix * vec4(p0, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying vec3 vDir;
  varying vec3 vLocal;

  uniform vec3  uColorA;   // violet
  uniform vec3  uColorB;   // magenta
  uniform float uOpacity;
  uniform float uLight;    // 1.0 in the light theme

  ${NOISE}
  ${FIELD}

  void main(){
    // Recompute the furrow field per pixel so the folds stay crisp however
    // coarse the mesh is, and bump the normal by its screen-space gradient.
    float g = grooves(vDir);

    vec3 N = normalize(vNormal);
    vec3 dPx = dFdx(vViewPos), dPy = dFdy(vViewPos);
    vec3 r1 = cross(dPy, N), r2 = cross(N, dPx);
    float det = dot(dPx, r1);
    vec3 grad = (dFdx(g) * r1 + dFdy(g) * r2) / max(abs(det), 1e-6);
    N = normalize(N - grad * 0.032);

    vec3 V = normalize(-vViewPos);

    // Same two accents as the background shader, so it reads as one material.
    vec3 L1 = normalize(vec3(-0.55, 0.75, 0.60));
    vec3 L2 = normalize(vec3( 0.75, -0.25, 0.35));

    float d1 = max(dot(N, L1), 0.0);
    float d2 = max(dot(N, L2), 0.0);
    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.7);
    vec3  H = normalize(L1 + V);
    float spec = pow(max(dot(N, H), 0.0), 46.0) * (1.0 - g * 0.8);
    float base = smoothstep(-0.95, -0.15, vLocal.y);  // melt the base into the page

    vec3 col;
    float a;

    if (uLight > 0.5) {
      // Light: a solid, opaque object sitting on paper. The dark theme's trick
      // of driving alpha from luminance would erase the whole shadowed side
      // against white, and an additive rim glow would be invisible — so here
      // it's pigment, occlusion, and a *darkened* contact rim instead.
      vec3 lit    = mix(uColorA, uColorB, 0.35);
      vec3 tissue = mix(vec3(0.95, 0.93, 0.97), lit, 0.45);
      col = mix(tissue * 0.58, tissue, d1 * 0.78 + d2 * 0.22);
      col *= 1.0 - g * 0.45;
      col = mix(col, col * 0.62, fres * 0.6);
      col += vec3(1.0) * spec * 0.30;
      // Barely fade the base here. The dark theme melts it into black; doing
      // that against paper just cuts a bright notch out of the underside.
      a = 0.97 * mix(1.0, base, 0.35);
    } else {
      // Dark: emissive, and unlit areas go transparent so the fluid shader
      // behind shows through and the brain reads as the same material.
      col = uColorA * pow(d1, 1.30) * 0.66
          + uColorB * pow(d2, 1.85) * 0.36;
      col += mix(uColorA, uColorB, 0.4) * 0.08;   // ambient, or it reads as a shell
      col *= 1.0 - g * 0.85;                      // occlusion in the furrows
      col += mix(uColorA, uColorB, 0.5) * fres * 0.90;
      col += vec3(1.0) * spec * 0.14;
      float luma = dot(col, vec3(0.299, 0.587, 0.114));
      a = clamp(0.30 + luma * 2.2 + fres * 0.7, 0.0, 1.0) * base;
    }

    gl_FragColor = vec4(col, a * uOpacity);
  }
`;

export function Brain() {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.ShaderMaterial>(null);
  const scrollRef = useRef(0);
  const { size, viewport } = useThree();
  const { theme } = useTheme();

  const isNarrow = size.width < 768;
  // The fragment stage carries the fine fold detail, so the mesh only has to
  // resolve the fissures and lobes.
  const detail = isNarrow ? 32 : 56;

  // Sized and placed from the actual visible frustum rather than fixed world
  // units, so it never crops or drifts off-frame across viewports.
  const radius = Math.min(viewport.width, viewport.height) * 0.29;
  const halfW = viewport.width / 2;
  const basePos: [number, number, number] = [
    isNarrow ? 0 : Math.min(viewport.width * 0.2, halfW - radius - 0.06),
    viewport.height * (isNarrow ? 0.15 : 0.11),
    0,
  ];

  const uniforms = useMemo(
    () => ({
      uColorA: { value: new THREE.Color("#a855f7") },
      uColorB: { value: new THREE.Color("#ec4899") },
      uOpacity: { value: 0.92 },
      uLight: { value: 0 },
    }),
    []
  );

  // Re-read the palette from CSS whenever the theme flips. Written through the
  // material ref rather than the memoised uniforms object, which React treats
  // as immutable once it has been handed to a hook.
  useEffect(() => {
    const u = mat.current?.uniforms;
    if (!u) return;
    const c = readSceneColors(theme);
    u.uColorA.value.copy(c.a);
    u.uColorB.value.copy(c.b);
    u.uLight.value = theme === "light" ? 1 : 0;
    u.uOpacity.value = theme === "light" ? 1 : 0.92;
  }, [theme]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;

    // Lenis scrolls the real window, so scrollY works with or without it.
    const vh = Math.max(window.innerHeight, 1);
    const target = window.scrollY / vh;
    // Damped so a flicked wheel doesn't spin it; frame-rate independent.
    scrollRef.current += (target - scrollRef.current) * Math.min(1, dt * 5);
    const s = scrollRef.current;

    const t = state.clock.elapsedTime;
    // Rest pose is the lateral view — the angle a brain is actually
    // recognisable from (temporal lobe, Sylvian fissure, cerebellum all read).
    // Idle motion rocks around it rather than spinning past it; scroll is what
    // turns the thing right around.
    g.rotation.y = -1.5 + Math.sin(t * 0.18) * 0.2 + s * Math.PI * 1.5;
    g.rotation.x = -0.14 + Math.sin(t * 0.13) * 0.03 + s * 0.5;
    g.rotation.z = 0.05;
    // Drift down as the page scrolls up: the canvas travels with the hero, so
    // countering it keeps the brain in frame long enough to watch it turn.
    g.position.y = basePos[1] - s * 0.55;
  });

  return (
    <group ref={group} position={basePos} scale={radius}>
      <mesh renderOrder={1}>
        <icosahedronGeometry args={[1, detail]} />
        <shaderMaterial
          ref={mat}
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
