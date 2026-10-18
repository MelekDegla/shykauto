/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.cloudfront.net' },
      { protocol: 'https', hostname: 'cdn.h2r-equipements.com' },
      { protocol: 'https', hostname: 'www.hellopro.fr' },
      { protocol: 'https', hostname: 'd2rqvrnppmk7he.cloudfront.net' },
    ],
  },
  // Required for @neondatabase/serverless to work in Next.js API routes
  serverExternalPackages: ['@neondatabase/serverless'],
};

export default nextConfig;
