import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { SplineSceneDemo } from "@/components/three/SplineSceneDemo";
import { SystemsCollapse } from "@/components/three/SystemsCollapse";
import { Tradeoff, TradeoffOption } from "@/components/ui/Tradeoff";
import { Retro } from "@/components/ui/Retro";
import { GenerativeMark } from "@/components/lab/GenerativeMark";
import { AudioVisualizer } from "@/components/lab/AudioVisualizer";
import { AsciiWebcam } from "@/components/lab/AsciiWebcam";
import { HarnessAnatomy } from "@/components/lab/HarnessAnatomy";
import { ContextGraphExplorer } from "@/components/lab/ContextGraphExplorer";
import { VectorSearch } from "@/components/three/VectorSearch";
import { AutonomyLadder, AutonomyTier } from "@/components/work/AutonomyLadder";
import { LeadershipNote } from "@/components/ui/LeadershipNote";

/**
 * Components a lab or work entry can drop into its MDX to embed a live demo
 * rather than only describing one. Client components are fine here — MDXRemote
 * renders on the server and each one becomes its own client boundary.
 */
const components = {
  SplineSceneDemo,
  SystemsCollapse,
  Tradeoff,
  TradeoffOption,
  Retro,
  GenerativeMark,
  AudioVisualizer,
  AsciiWebcam,
  HarnessAnatomy,
  ContextGraphExplorer,
  VectorSearch,
  AutonomyLadder,
  AutonomyTier,
  LeadershipNote,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
      />
    </div>
  );
}
