import type { NextConfig } from "next";
import { execSync } from "node:child_process";

const repoName = "maher-portfolio";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

// Baked in at build time — there's no server at runtime (static export) to ask
// later. Same shallow checkout that CI already does still has HEAD's full SHA.
function gitSha(): string {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
}

process.env.NEXT_PUBLIC_GIT_SHA = gitSha();
process.env.NEXT_PUBLIC_BUILD_TIME = new Date().toISOString();

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithubActions ? `/${repoName}` : undefined,
  assetPrefix: isGithubActions ? `/${repoName}/` : undefined,
};

export default nextConfig;
