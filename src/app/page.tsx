'use client'
import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import OMMethod from '@/components/home/OMMethod'
import About from '@/components/home/About'
import FreeMeditationSection from '@/components/home/FreeMeditationSection'
import Testimonials from '@/components/home/Testimonials'
import FeaturedCourse from '@/components/home/FeaturedCourse'
import Newsletter from '@/components/home/Newsletter'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
// Analytics handled by AnalyticsProvider

export default function HomePage() {
  // Page view tracking handled by AnalyticsProvider

  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <OMMethod />
        <FreeMeditationSection />
        <About />
        <Testimonials />
        <FeaturedCourse />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
