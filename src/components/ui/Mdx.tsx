import { MDXRemote } from "next-mdx-remote/rsc";
import { SplineSceneDemo } from "@/components/three/SplineSceneDemo";

/**
 * Components a lab or work entry can drop into its MDX to embed a live demo
 * rather than only describing one. Client components are fine here — MDXRemote
 * renders on the server and each one becomes its own client boundary.
 */
const components = { SplineSceneDemo };

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
