import type { Metadata } from 'next'
import AboutHero from '@/components/about/AboutHero'
import AboutStory from '@/components/about/AboutStory'
import AboutCredentials from '@/components/about/AboutCredentials'
import AboutCTA from '@/components/about/AboutCTA'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'About Orla Marie, Accredited Mindfulness Teacher',
  description:
    'Orla Marie Mullan is an accredited mindfulness teacher based in Donegal, Ireland, with thirty years of practice, delivering evidence-based mindfulness programmes for workplaces, schools and individuals.',
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

        {/* Soft CTA */}
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}
