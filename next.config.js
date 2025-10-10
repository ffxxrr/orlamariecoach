/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  experimental: {
    // Optional: Enable if you want to use App Router features
    // appDir: true,
  },
}

module.exports = nextConfig