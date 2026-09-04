"use client";

import { createElement, useEffect, useState } from "react";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/**
 * Spline scene.
 *
 * This loads Spline's `<spline-viewer>` web component from a CDN rather than
 * importing `@splinetool/react-spline`. That isn't a preference — the npm
 * runtime references its Draco decoders with `new URL("../libs/draco/…",
 * import.meta.url)`, and those files aren't in the published package, so any
 * bundler that honours that pattern fails to build. Turbopack does.
 *
 * The web component is Spline's supported path for non-bundler contexts, costs
 * nothing until this component mounts, and works under `output: "export"`.
 * The trade is a third-party script at runtime.
 */
const VIEWER_SRC = "https://unpkg.com/@splinetool/viewer@2.0.36/build/spline-viewer.js";

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!document.querySelector(`script[src="${VIEWER_SRC}"]`)) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = VIEWER_SRC;
      document.head.appendChild(script);
    }

    // Resolves whether this call or an earlier one injected the script, and
    // keeps the state update in a callback rather than the effect body.
    customElements.whenDefined("spline-viewer").then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="loader" aria-label="Loading 3D scene" />
      </div>
    );
  }

  // createElement avoids having to augment JSX.IntrinsicElements for a tag used
  // in exactly one place.
  return createElement("spline-viewer", { url: scene, className });
}
