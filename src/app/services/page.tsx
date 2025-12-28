import type { Metadata } from 'next'
import ServicesHero from '@/components/services/ServicesHero'
import ServicesOfferings from '@/components/services/ServicesOfferings'
import ServicesFAQ from '@/components/services/ServicesFAQ'
import ServicesCTA from '@/components/services/ServicesCTA'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Services & Pricing | Orla Marie Mindfulness Coach',
  description:
    'Discover personalised mindfulness and meditation services including one-to-one sessions and group courses. Based in Donegal, Ireland, available worldwide.',
  openGraph: {
    images: ['/images/og/og-services.jpg'],
  },
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero - Full bleed immersive */}
        <ServicesHero />

        {/* Services - Full width alternating bands */}
        <ServicesOfferings />

        {/* FAQ - Clean accordion */}
        <ServicesFAQ />

        {/* Soft CTA */}
        <ServicesCTA />
      </main>
      <Footer />
    </>
  )
}
