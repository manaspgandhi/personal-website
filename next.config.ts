import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/goatos", destination: "/goatos/index.html" }];
  },
};

export default nextConfig;
