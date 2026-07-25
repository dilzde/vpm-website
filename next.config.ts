import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.31.32.1", "localhost", "127.0.0.1"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
