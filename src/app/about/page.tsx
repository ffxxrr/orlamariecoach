import type { Metadata } from 'next'
import AboutHero from '@/components/about/AboutHero'
import AboutStory from '@/components/about/AboutStory'
import AboutCredentials from '@/components/about/AboutCredentials'
import AboutTestimonials from '@/components/about/AboutTestimonials'
import AboutCTA from '@/components/about/AboutCTA'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'About Orla Marie | Mindfulness & Meditation Coach',
  description:
    'Learn about Orla Marie, her 30-year journey in mindfulness and meditation, from the standing stones of Donegal to guiding over 500 people to inner peace.',
  openGraph: {
    images: ['/images/og/og-about.jpg'],
  },
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero - Full bleed immersive */}
        <AboutHero />

        {/* Story - Breathing intro */}
        <AboutStory />

        {/* Credentials - Trust building */}
        <AboutCredentials />

        {/* Testimonials - Social proof */}
        <AboutTestimonials />

        {/* Soft CTA */}
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}
