/**
 * JSON-LD Structured Data for OrlaMarieCoach
 *
 * Provides rich snippets for search engines including:
 * - Organization schema
 * - Person schema (Orla Marie)
 * - LocalBusiness schema
 * - WebSite schema with search action
 * - Service schemas
 */

const BASE_URL = 'https://orlamariecoach.vercel.app'

// Organization + Person combined schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'OrlaMarieCoach',
  url: BASE_URL,
  logo: `${BASE_URL}/images/brand/logo-square.png`,
  description:
    'Personalised meditation and mindfulness coaching rooted in traditional Irish wisdom and modern understanding.',
  foundingDate: '2015',
  founder: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Orla Marie',
    jobTitle: 'Meditation & Mindfulness Coach',
    description:
      'Irish meditation coach from Donegal with 30 years of practice and over 500 clients helped.',
    knowsAbout: [
      'Meditation',
      'Mindfulness',
      'Celtic spirituality',
      'Stress management',
      'Personal development',
    ],
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: `${BASE_URL}/contact`,
    availableLanguage: ['English'],
  },
  sameAs: [
    // Add social media URLs when available
    // 'https://www.instagram.com/orlamariecoach',
    // 'https://www.facebook.com/orlamariecoach',
  ],
}

// LocalBusiness schema for local SEO
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  '@id': `${BASE_URL}/#localbusiness`,
  name: 'OrlaMarieCoach',
  description:
    'Meditation and mindfulness coaching services in Donegal, Ireland and online worldwide.',
  url: BASE_URL,
  image: `${BASE_URL}/images/brand/logo-square.png`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Donegal',
    addressCountry: 'IE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 54.6538,
    longitude: -8.1096,
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'Ireland',
    },
    {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    {
      '@type': 'Country',
      name: 'United States',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Meditation Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Individual Meditation Session',
          description: 'One-to-one personalised meditation guidance',
        },
        price: '100.00',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '6-Session Package',
          description: 'Six personalised meditation sessions with 33% savings',
        },
        price: '400.00',
        priceCurrency: 'EUR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Course',
          name: 'Online Meditation Course',
          description: 'Self-paced online meditation and mindfulness course',
        },
        price: '250.00',
        priceCurrency: 'EUR',
      },
    ],
  },
}

// WebSite schema for sitelinks search
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'OrlaMarieCoach',
  description: 'Authentic meditation and mindfulness coaching',
  publisher: {
    '@id': `${BASE_URL}/#organization`,
  },
  inLanguage: 'en-IE',
}

// Breadcrumb helper for page-specific schemas
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Service schema helper
export function generateServiceSchema(service: {
  name: string
  description: string
  price: string
  duration?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Meditation Coaching',
    provider: {
      '@id': `${BASE_URL}/#organization`,
    },
    name: service.name,
    description: service.description,
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'EUR',
    },
    ...(service.duration && {
      duration: service.duration,
    }),
  }
}

// Combined schema for homepage
const homepageSchemas = [organizationSchema, localBusinessSchema, websiteSchema]

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(homepageSchemas),
      }}
    />
  )
}

// Export individual schemas for page-specific use
export { organizationSchema, localBusinessSchema, websiteSchema }
