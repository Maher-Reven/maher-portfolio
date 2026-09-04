"use client";

import { Canvas } from "@react-three/fiber";
import { ShaderPlane } from "@/components/three/FluidShader";
import { Brain } from "@/components/three/Brain";
import { useReducedMotion } from "@/lib/motion";

/**
 * Hero background: the fluid shader and the brain in one Canvas, so they
 * composite against each other properly (and cost one WebGL context, not two).
 *
 * The camera is perspective for the brain's benefit — the fluid quad writes
 * clip space directly in its vertex shader, so it ignores the camera entirely
 * and still fills the frame.
 *
 * Reduced-motion users get the same static gradient the shader falls back to;
 * nothing animates and no WebGL context is created.
 */
export function HeroScene({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          // Built from tokens so it follows the theme instead of staying dark.
          background:
            "radial-gradient(60% 50% at 50% 60%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 70%), radial-gradient(40% 40% at 70% 30%, color-mix(in oklab, var(--accent-2) 18%, transparent), transparent 70%), var(--bg)",
        }}
      />
    );
  }

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        camera={{ position: [0, 0, 3.4], fov: 42 }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ShaderPlane />
        <Brain />
      </Canvas>
    </div>
  );
}
