"use client";

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

/**
 * EXP-003. A Spline scene embedded as a React component, with a cursor-tracking
 * spotlight over it.
 *
 * The stage stays dark in both themes on purpose: it reads as a viewport rather
 * than a page surface, and the spotlight and gradient headline both depend on a
 * dark ground — on paper the white spotlight would simply be invisible.
 */
export function SplineSceneDemo() {
  return (
    // Stacked rather than the source demo's side-by-side split: this sits in a
    // 68ch prose column, where two columns squeeze the copy to about 200px and
    // leave the scene too small to read.
    <Card className="relative my-8 w-full overflow-hidden border-line-strong bg-[#050507]">
      <Spotlight className="-top-24 left-0 md:left-40" size={280} />

      {/* copy */}
      <div className="relative z-10 px-6 pt-7 pb-5 md:px-8 md:pt-8">
        <p className="label mb-3 text-accent">EXP-003 · Spline</p>
        <h3 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-4xl">
          Interactive 3D
        </h3>
        <p className="mt-3 text-sm text-neutral-300">
          A scene authored in Spline, dropped in as a component and driven by the
          cursor. Viewer and scene both load on mount — several megabytes that
          never reach the initial bundle. Drag to orbit.
        </p>
      </div>

      {/* scene */}
      <div className="relative h-[340px] w-full md:h-[400px]">
        <SplineScene scene={SCENE} className="h-full w-full" />
      </div>
    </Card>
  );
}
