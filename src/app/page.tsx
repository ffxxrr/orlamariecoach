import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import About from '@/components/home/About'
import FreeMeditationSection from '@/components/home/FreeMeditationSection'
import Testimonials from '@/components/home/Testimonials'
import FeaturedCourse from '@/components/home/FeaturedCourse'
import Newsletter from '@/components/home/Newsletter'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import SectionDivider from '@/components/ui/SectionDivider'

export default function HomePage() {
  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        {/* Hero - full-bleed video background */}
        <Hero />

        {/* Services */}
        <Services />

        {/* Divider */}
        <SectionDivider variant="dots" />

        {/* Free Meditation */}
        <FreeMeditationSection />

        {/* Divider */}
        <SectionDivider variant="line" />

        {/* About Orla */}
        <About />

        {/* Testimonials */}
        <Testimonials />

        {/* Divider */}
        <SectionDivider variant="dots" />

        {/* Featured Course */}
        <FeaturedCourse />

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
