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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://orlamariecoach.vercel.app'
const isProduction = BASE_URL === 'https://orlamariecoach.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Orla Marie Coach | Mindfulness Meditation for Workplaces, Schools & Individuals',
    template: '%s | Orla Marie Coach',
  },
  description:
    'Evidence-based mindfulness meditation programmes for workplaces, schools and individuals, led by accredited mindfulness teacher Orla Marie Mullan. Based in Donegal, Ireland, delivered in person and online.',
  keywords: ['mindfulness', 'meditation', 'workplace mindfulness', 'mindfulness in schools', 'mindfulness teacher', 'Ireland'],
  authors: [{ name: 'Orla Marie Mullan' }],
  creator: 'Orla Marie Mullan',
  publisher: 'Orla Marie Coach',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Orla Marie Coach | Mindfulness Meditation Programmes',
    description: 'Evidence-based mindfulness meditation programmes for workplaces, schools and individuals.',
    url: BASE_URL,
    type: 'website',
    locale: 'en_IE',
    siteName: 'Orla Marie Coach',
    images: [
      {
        url: '/images/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Orla Marie Coach - Mindfulness Meditation Programmes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orla Marie Coach | Mindfulness Meditation Programmes',
    description: 'Evidence-based mindfulness meditation programmes for workplaces, schools and individuals.',
    images: ['/images/og/og-home.jpg'],
  },
  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
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
