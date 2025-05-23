import type { Metadata } from 'next'
import { Inter, Crimson_Pro } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'],
  variable: '--font-crimson',
})

export const metadata: Metadata = {
  title: 'OrlaMarieCoach - Find Your Inner Peace Through Authentic Meditation',
  description: 'Discover the transformative power of mindfulness with personalised guidance rooted in traditional wisdom and modern understanding.',
  keywords: ['meditation', 'mindfulness', 'coaching', 'Ireland', 'inner peace', 'wellness'],
  authors: [{ name: 'Orla Marie' }],
  openGraph: {
    title: 'OrlaMarieCoach - Authentic Meditation & Mindfulness',
    description: 'Personalised meditation guidance with traditional wisdom and modern understanding.',
    type: 'website',
    locale: 'en_IE',
    siteName: 'OrlaMarieCoach',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonPro.variable}`}>
      <body className="font-inter antialiased bg-pure-light text-deep-text">
        {children}
      </body>
    </html>
  )
}
