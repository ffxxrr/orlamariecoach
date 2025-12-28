import type { Metadata } from 'next'
import { Inter, Crimson_Pro } from 'next/font/google'
import './globals.css'
import { AnalyticsProvider } from '@/components/ui/AnalyticsProvider'
import FeedbackProvider from '@/components/layout/FeedbackProvider'
import StructuredData from '@/components/seo/StructuredData'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'],
  variable: '--font-crimson',
})

const BASE_URL = 'https://orlamariecoach.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'OrlaMarieCoach - Find Your Inner Peace Through Authentic Meditation',
    template: '%s | OrlaMarieCoach',
  },
  description:
    'Discover the transformative power of mindfulness with personalised guidance rooted in traditional wisdom and modern understanding.',
  keywords: ['meditation', 'mindfulness', 'coaching', 'Ireland', 'inner peace', 'wellness'],
  authors: [{ name: 'Orla Marie' }],
  creator: 'Orla Marie',
  publisher: 'OrlaMarieCoach',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'OrlaMarieCoach - Authentic Meditation & Mindfulness',
    description: 'Personalised meditation guidance with traditional wisdom and modern understanding.',
    url: BASE_URL,
    type: 'website',
    locale: 'en_IE',
    siteName: 'OrlaMarieCoach',
    // TODO: Add OG image when created
    // images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'OrlaMarieCoach' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrlaMarieCoach - Authentic Meditation & Mindfulness',
    description: 'Personalised meditation guidance with traditional wisdom and modern understanding.',
    // TODO: Add Twitter image when created
    // images: ['/twitter-image.jpg'],
  },
  robots: {
    index: false, // Dev site - change to true for production
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: [{ url: '/images/brand/favicon/favicon.svg', type: 'image/svg+xml' }],
    apple: '/images/brand/logo-square.png',
  },
}

export const viewport = {
  themeColor: '#C9A475',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonPro.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="font-inter antialiased bg-pure-light text-deep-text">
        <AnalyticsProvider>
          <FeedbackProvider>
            {children}
          </FeedbackProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
