import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Invitation from '@/components/home/Invitation'
import ThreePaths from '@/components/home/ThreePaths'
import AboutGlimpse from '@/components/home/AboutGlimpse'
import FreeMeditationSection from '@/components/home/FreeMeditationSection'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { absolute: 'Orla Marie Coach | Mindfulness Meditation for Workplaces, Schools & Individuals' },
  description:
    'Evidence-based, trauma-informed mindfulness meditation programmes for workplaces, schools and individuals, led by accredited mindfulness teacher Orla Marie Mullan. Based in Donegal, Ireland, delivered in person and online.',
  keywords: [
    'mindfulness teacher Ireland',
    'accredited mindfulness teacher',
    'workplace mindfulness',
    'mindfulness in schools',
    'one-to-one mindfulness',
    'trauma-informed mindfulness',
    'mindfulness meditation Donegal',
    'employee wellbeing',
    'staff wellbeing',
    'mindfulness programmes',
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://orlamariecoach.vercel.app',
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

        {/* Three Paths - Individuals, workplaces, schools */}
        <ThreePaths />

        {/* About Glimpse - Meet Orla */}
        <AboutGlimpse />

        {/* Free Meditation + Insight Timer */}
        <FreeMeditationSection />
      </main>
      <Footer />
    </>
  )
}
