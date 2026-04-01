import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Enable Cloudflare bindings in local dev (no-op in production)
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.printful.com',
      },
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
      },
    ],
  },
};

export default nextConfig;
