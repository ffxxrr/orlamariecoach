import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import OMMethod from '@/components/home/OMMethod'
import About from '@/components/home/About'
import Testimonials from '@/components/home/Testimonials'
import FeaturedCourse from '@/components/home/FeaturedCourse'
import Newsletter from '@/components/home/Newsletter'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'

export default function HomePage() {
  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <OMMethod />
        <About />
        <Testimonials />
        <FeaturedCourse />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
