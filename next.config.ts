import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: undefined, // remove 'export'
  dynamicParams: "force-dynamic",
  images: {
    unoptimized: true, // required if you use next/image
  },
  trailingSlash: true, // optional, ensures correct routing in static hosting
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
