import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;