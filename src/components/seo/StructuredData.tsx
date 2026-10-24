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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://orlamariecoach.vercel.app'

// Organization + Person combined schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Orla Marie Coach',
  url: BASE_URL,
  logo: `${BASE_URL}/images/brand/logo-square.png`,
  description:
    'Evidence-based, trauma-informed mindfulness meditation programmes for workplaces, schools and individuals.',
  foundingDate: '2015',
  founder: {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Orla Marie Mullan',
    jobTitle: 'Accredited Mindfulness Teacher',
    description:
      'Accredited mindfulness teacher based in Donegal, Ireland, with thirty years of meditation practice.',
    knowsAbout: [
      'Mindfulness',
      'Meditation',
      'Trauma-informed mindfulness',
      'Workplace wellbeing',
      'Mindfulness in schools',
      'Stress management',
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
  name: 'Orla Marie Coach',
  description:
    'Mindfulness meditation programmes for workplaces, schools and individuals in Donegal, Ireland and online.',
  url: BASE_URL,
  image: `${BASE_URL}/images/brand/logo-square.png`,
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
    name: 'Mindfulness Programmes',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'One-to-One Mindfulness',
          description: 'A personal mindfulness meditation programme tailored to the individual, in person or online',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Workplace Mindfulness',
          description: 'Mindfulness programmes for teams and leaders supporting wellbeing, focus and resilience at work',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mindfulness in Schools',
          description: 'Age-appropriate mindfulness for pupils and wellbeing programmes for teachers and staff',
        },
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
  name: 'Orla Marie Coach',
  description: 'Mindfulness meditation programmes for workplaces, schools and individuals',
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
