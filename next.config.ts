import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["sudoku-engine"],
  
  /* Deployment config */
  output: 'export', // Required for GitHub Pages to find the static files
  basePath: '/Sudoku-UI', // Tells Next.js the app is hosted at /Sudoku-UI/
  images: {
    unoptimized: true, // GitHub Pages doesn't support the default Next.js image server
  },
};

export default nextConfig;
