import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/packages/book', destination: '/packages/booking', permanent: true },
      { source: '/packages/book/confirmation/:id', destination: '/packages/booking/confirmation/:id', permanent: true },
      { source: '/packages/cooking-class/book', destination: '/packages/cooking-class/booking', permanent: true },
      { source: '/packages/village-tour/book', destination: '/packages/village-tour/booking', permanent: true },
      { source: '/packages/bicycle-rent', destination: '/packages/bicycle-rental', permanent: true },
      { source: '/packages/bicycle-rent/book', destination: '/packages/bicycle-rental/booking', permanent: true },
    ];
  },
};

export default nextConfig;
