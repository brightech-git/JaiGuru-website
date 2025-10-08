import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< Updated upstream
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // required for static export
=======
  /* config options here */
  output: 'export',
  dynamicParams: true,// 👈 enables static HTML export
  images: {
    unoptimized: true, // required if you use next/image
  },
  trailingSlash: true, // optional, ensures correct routing in static hosting
  eslint: {
    ignoreDuringBuilds: true,
>>>>>>> Stashed changes
  },
};

export default nextConfig;
