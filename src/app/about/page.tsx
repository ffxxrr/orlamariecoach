import AboutHero from '@/components/about/AboutHero'
import AboutStory from '@/components/about/AboutStory'
import AboutCredentials from '@/components/about/AboutCredentials'
import AboutOMMethod from '@/components/about/AboutOMMethod'
import AboutTestimonials from '@/components/about/AboutTestimonials'
import AboutCTA from '@/components/about/AboutCTA'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

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
        <Section padded>
          <Container>
            <AboutHero />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <AboutStory />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <AboutCredentials />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <AboutOMMethod />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <AboutTestimonials />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <AboutCTA />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
