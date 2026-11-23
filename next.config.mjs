/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.cloudinary.com" },
      { protocol: "https", hostname: "**.googleapis.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],

    // Cache optimized images for 30 days
    minimumCacheTTL: 2592000,

    // Use WebP to reduce format variants
    formats: ["image/webp"],

    // Limit unnecessary responsive image variants
    deviceSizes: [640, 750, 828, 1080, 1200],

    imageSizes: [32, 48, 64, 96, 128, 256],
  },
};

export default nextConfig;
