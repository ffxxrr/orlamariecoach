import type { Metadata } from 'next'
import ServicesHero from '@/components/services/ServicesHero'
import ServicesOfferings from '@/components/services/ServicesOfferings'
import ServicesFAQ from '@/components/services/ServicesFAQ'
import ServicesCTA from '@/components/services/ServicesCTA'
import TestimonialFeature from '@/components/home/TestimonialFeature'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Mindfulness Programmes in Donegal & Online',
  description:
    'Evidence-based mindfulness meditation programmes for individuals, workplaces and schools, in person across Inishowen, Donegal and the North West, and online.',
  alternates: { canonical: '/services' },
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

        {/* Testimonial - venue that hosts Orla's courses */}
        <TestimonialFeature
          quote="We've been delighted to host multiple meditation courses run by Orla at The Sliabh Sneacht Centre. Those who have taken part have come away full of praise, saying they sleep better and feel more relaxed. Orla has a lovely, positive influence on the group, and her kind nature puts people at ease from the very first evening. She teaches simple, practical techniques that clients can carry into everyday life, and the feedback has been wonderful. We'd highly recommend her to anyone looking to slow down and find a little calm."
          name="The Sliabh Sneacht Centre"
          place="Inishowen"
        />

        {/* FAQ - Clean accordion */}
        <ServicesFAQ />

        {/* Soft CTA */}
        <ServicesCTA />
      </main>
      <Footer />
    </>
  )
}
