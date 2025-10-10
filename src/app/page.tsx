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
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Divider from '@/components/ui/Divider'
// Analytics handled by AnalyticsProvider

export default function HomePage() {
  // Page view tracking handled by AnalyticsProvider

  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <Section padded>
          <Container>
            <Hero />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <Services />
          </Container>
        </Section>
        <Section padded={false}>
          <Container>
            <Divider className="my-2" />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <OMMethod />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <FreeMeditationSection />
          </Container>
        </Section>
        <Section padded={false}>
          <Container>
            <Divider className="my-2" />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <About />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <Testimonials />
          </Container>
        </Section>
        <Section padded={false}>
          <Container>
            <Divider className="my-2" />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <FeaturedCourse />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <Newsletter />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
