/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com', 'via.placeholder.com', 'randomuser.me', 'ui-avatars.com', 'carrier-assets.vinted.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.NODE_ENV === 'production',
  },
  // Fix for potential CORS issues with external images
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
  // For Netlify deployment
  trailingSlash: true,
};

module.exports = nextConfig; 