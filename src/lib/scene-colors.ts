"use client";

import * as THREE from "three";
import type { Theme } from "@/lib/theme";

export type SceneColors = { bg: THREE.Color; a: THREE.Color; b: THREE.Color };

const FALLBACK = {
  dark: { bg: "#050507", a: "#a855f7", b: "#ec4899" },
  light: { bg: "#f4f4f7", a: "#7c3aed", b: "#db2777" },
} as const;

/**
 * Pulls the palette out of the CSS custom properties so the shaders and the
 * stylesheet can't drift apart — globals.css stays the one place colours live.
 * Falls back to the literals above if the properties can't be read.
 */
export function readSceneColors(theme: Theme): SceneColors {
  const fb = FALLBACK[theme];
  if (typeof window === "undefined") {
    return { bg: new THREE.Color(fb.bg), a: new THREE.Color(fb.a), b: new THREE.Color(fb.b) };
  }
  const cs = getComputedStyle(document.documentElement);
  const pick = (name: string, fallback: string) => {
    const v = cs.getPropertyValue(name).trim();
    try {
      return new THREE.Color(v || fallback);
    } catch {
      return new THREE.Color(fallback);
    }
  };
  return {
    bg: pick("--bg", fb.bg),
    a: pick("--accent", fb.a),
    b: pick("--accent-2", fb.b),
  };
}
