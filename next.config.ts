import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Type checking runs explicitly in the build command. This avoids running
  // Next's duplicate worker and keeps local and hosted builds consistent.
  typescript: { ignoreBuildErrors: true },
  experimental: { workerThreads: true, cpus: 1 },
};
export default nextConfig;
