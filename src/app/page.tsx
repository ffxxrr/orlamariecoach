import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Invitation from '@/components/home/Invitation'
import ThreePaths from '@/components/home/ThreePaths'
import TestimonialFeature from '@/components/home/TestimonialFeature'
import AboutGlimpse from '@/components/home/AboutGlimpse'
import FreeMeditationSection from '@/components/home/FreeMeditationSection'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'OrlaMarieCoach - Find Your Inner Peace Through Authentic Meditation',
  description:
    'Discover the transformative power of mindfulness with Orla Marie, an Irish meditation coach with 30 years of practice. Personalised guidance rooted in traditional wisdom and Celtic heritage.',
  keywords: [
    'meditation coach Ireland',
    'mindfulness coaching',
    'Irish meditation',
    'Celtic mindfulness',
    'Donegal meditation teacher',
    'online meditation courses',
    'personalised meditation guidance',
    'inner peace',
    'wellness coaching',
  ],
  alternates: {
    canonical: 'https://orlamariecoach.vercel.app',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero - Full viewport with Sora video */}
        <Hero />

        {/* The Invitation - Breathing intro */}
        <Invitation />

        {/* Three Paths - Services as journey */}
        <ThreePaths />

        {/* Single Testimonial - One powerful quote */}
        <TestimonialFeature />

        {/* About Glimpse - Meet Orla */}
        <AboutGlimpse />

        {/* Free Meditation + Insight Timer */}
        <FreeMeditationSection />
      </main>
      <Footer />
    </>
  )
}
