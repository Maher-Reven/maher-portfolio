import { MDXRemote } from "next-mdx-remote/rsc";

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote source={source} />
    </div>
  );
}
