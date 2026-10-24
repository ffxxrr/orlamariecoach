/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Old courses and booking pages now point to the programmes and contact pages
  async redirects() {
    return [
      { source: '/courses', destination: '/services', permanent: true },
      { source: '/courses/:path*', destination: '/services', permanent: true },
      { source: '/book-session', destination: '/contact', permanent: true },
    ]
  },
}

module.exports = nextConfig