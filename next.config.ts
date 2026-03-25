import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.solarreviews.com',
        pathname: '/content/**',
      },
    ],
  },
};

export default nextConfig;
