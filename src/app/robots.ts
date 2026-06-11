import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://orlamariecoach.vercel.app'
const isProduction = BASE_URL === 'https://orlamariecoach.com'

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    // Dev/preview: block everything
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    }
  }

  // AI crawlers intentionally allowed: being citable in AI answers
  // helps discovery for a new site more than content protection.
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
