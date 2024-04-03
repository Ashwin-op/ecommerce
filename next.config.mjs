/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'cdn.dummyjson.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
