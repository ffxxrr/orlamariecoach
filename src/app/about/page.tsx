import AboutHero from '@/components/about/AboutHero'
import AboutStory from '@/components/about/AboutStory'
import AboutCredentials from '@/components/about/AboutCredentials'
import AboutOMMethod from '@/components/about/AboutOMMethod'
import AboutTestimonials from '@/components/about/AboutTestimonials'
import AboutCTA from '@/components/about/AboutCTA'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'

export const metadata = {
  title: 'About Orla Marie | Mindfulness & Meditation Coach',
  description: 'Learn about Orla Marie, her journey in mindfulness and meditation, qualifications including Kids Mindfulness certification, and The OM Method approach to mindful living.',
}

export default function AboutPage() {
  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutCredentials />
        <AboutOMMethod />
        <AboutTestimonials />
        <AboutCTA />
      </main>
      <Footer />
    </>
  )
}
