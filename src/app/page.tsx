import Hero from '@/components/home/Hero'
import Invitation from '@/components/home/Invitation'
import ThreePaths from '@/components/home/ThreePaths'
import TestimonialFeature from '@/components/home/TestimonialFeature'
import AboutGlimpse from '@/components/home/AboutGlimpse'
import SoftCTA from '@/components/home/SoftCTA'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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

        {/* Soft CTA - Gentle ending */}
        <SoftCTA />
      </main>
      <Footer />
    </>
  )
}
