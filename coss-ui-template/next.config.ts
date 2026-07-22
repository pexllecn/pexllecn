import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // This template can live nested inside another repo; keep file tracing
  // scoped to the template itself so the parent lockfile is ignored.
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
