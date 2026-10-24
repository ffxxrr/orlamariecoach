/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // Blog posts are read from /content/blog at request time, so ship them with the server
  outputFileTracingIncludes: {
    '/**': ['./content/blog/**/*'],
  },
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