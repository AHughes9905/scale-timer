import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://scaletimer-backend:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
