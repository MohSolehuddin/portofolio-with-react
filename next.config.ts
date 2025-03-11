import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  target: "serverless",
};

export default nextConfig;
