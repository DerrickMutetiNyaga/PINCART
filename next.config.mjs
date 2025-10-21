/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // COMPLETELY DISABLE ALL CACHING
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  // Force no caching
  trailingSlash: false,
  output: 'standalone',
  // Disable all Next.js caching
  generateEtags: false,
  poweredByHeader: false,
}

export default nextConfig
