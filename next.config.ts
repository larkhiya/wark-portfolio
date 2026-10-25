import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lean, predictable static output. The experimental cacheComponents /
  // partialPrefetching flags add build-time friction for a client-animation
  // site with no server data, so we keep them off.
  reactStrictMode: true,
};

export default nextConfig;
