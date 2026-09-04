"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/motion";

/* ────────────────────────────────────────────────────────────────
   Full-screen fragment shader: layered domain-warped simplex noise
   ("fluid") tinted with the violet→magenta accent, with a subtle
   HUD scanline and vignette. The cursor pushes the flow field.
   Runs on a single quad — cheap enough for mobile at reduced DPR.
   ──────────────────────────────────────────────────────────────── */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uMouse;      // 0..1
  uniform float uMouseVel;   // 0..1 smoothed
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform float uIntensity;

  // ---- simplex noise (Ashima / Stefan Gustavson) ----
  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0*fract(p*C.www)-1.0;
    vec3 h = abs(x)-0.5;
    vec3 ox = floor(x+0.5);
    vec3 a0 = x-ox;
    m *= 1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x = a0.x*x0.x + h.x*x0.y;
    g.yz = a0.yz*x12.xz + h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<4;i++){ v += a*snoise(p); p = p*2.02 + 17.3; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x/uRes.y, 1.0);

    // cursor influence: a soft radial push into the flow field
    vec2 m = (uMouse - 0.5) * vec2(uRes.x/uRes.y, 1.0);
    float d = length(p - m);
    float push = exp(-d*d*6.0) * (0.35 + uMouseVel*1.2);

    float t = uTime*0.045;
    float s = 0.85; // spatial frequency — lower = broader, calmer forms
    // domain warping = "fluid"
    vec2 q = vec2(fbm(p*s + t), fbm(p*s - t*0.7 + 4.2));
    vec2 r = vec2(fbm(p*s + 1.1*q + vec2(1.7,9.2) + t*0.3 + push),
                  fbm(p*s + 1.1*q + vec2(8.3,2.8) - t*0.2 - push));
    float f = fbm(p*s + 1.4*r);

    // shape → colour
    float n = smoothstep(-0.45, 0.75, f);
    vec3 col = mix(uColorA, uColorB, clamp(n*0.8 + push*0.6, 0.0, 1.0));

    // keep it dark: mostly deep space with soft glowing currents
    float glow = pow(n, 2.6) * uIntensity;
    col *= glow;

    // darken the lower third so the headline stays legible
    col *= smoothstep(-0.55, 0.15, p.y) * 0.75 + 0.25;

    // faint scanlines (HUD)
    float scan = 0.94 + 0.06*sin(uv.y*uRes.y*1.5);
    col *= scan;

    // vignette
    float vig = smoothstep(1.2, 0.3, length(p));
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * The hero background quad. Exported so it can be composed into a shared
 * Canvas alongside other objects (see HeroScene) — its vertex shader writes
 * clip space directly, so it fills the screen under any camera.
 */
export function ShaderPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const vel = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVel: { value: 0 },
      uColorA: { value: new THREE.Color("#a855f7") }, // violet
      uColorB: { value: new THREE.Color("#ec4899") }, // magenta
      uIntensity: { value: 0.55 },
    }),
    []
  );

  useFrame((state, dt) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += dt;
    u.uRes.value.set(size.width * viewport.dpr, size.height * viewport.dpr);

    // pointer → 0..1, y flipped for GL
    target.current.set(state.pointer.x * 0.5 + 0.5, state.pointer.y * 0.5 + 0.5);
    const prev = mouse.current.clone();
    mouse.current.lerp(target.current, 0.06);
    const speed = prev.distanceTo(mouse.current) * 40;
    vel.current += (Math.min(speed, 1) - vel.current) * 0.08;

    u.uMouse.value.copy(mouse.current);
    u.uMouseVel.value = vel.current;
  });

  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

/**
 * Drop this anywhere as an absolutely-positioned background.
 * Reduced-motion users get a static gradient instead of the live shader.
 */
export function FluidShader({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 50% at 50% 60%, rgba(168,85,247,.28), transparent 70%), radial-gradient(40% 40% at 70% 30%, rgba(236,72,153,.18), transparent 70%), var(--bg)",
        }}
      />
    );
  }

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
