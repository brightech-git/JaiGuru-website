import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  output: "export", // remove 'export'
  images: {
    unoptimized: true, // required if you use next/image
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bmgjewellers.com',
        pathname: '**', // allows all image paths
      },
    ],
  },
  trailingSlash: true, // optional, ensures correct routing in static hosting
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
