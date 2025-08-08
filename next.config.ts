import type { NextConfig } from "next";

// Allow setting a base path dynamically for GitHub Pages deployments.
// In GitHub Actions we set NEXT_PUBLIC_BASE_PATH to `/<repo>`.
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const normalizedBasePath = rawBasePath
  ? rawBasePath.startsWith("/")
    ? rawBasePath
    : `/${rawBasePath}`
  : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: normalizedBasePath || undefined,
  assetPrefix: normalizedBasePath ? `${normalizedBasePath}/` : undefined,
};

export default nextConfig;
