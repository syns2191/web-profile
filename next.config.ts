import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**', // Allow any path under this hostname
      },
      {
        protocol: 'https',
        hostname: 'camo.githubusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'ghchart.rshah.org',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'syns.is3.cloudhost.id',
        pathname: '/**'
      }
    ],
  },
  /* config options here */
};

export default nextConfig;
