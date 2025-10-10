import ServicesHero from '@/components/services/ServicesHero'
import ServicesOfferings from '@/components/services/ServicesOfferings'
import ServicesFAQ from '@/components/services/ServicesFAQ'
import ServicesCTA from '@/components/services/ServicesCTA'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Divider from '@/components/ui/Divider'

export const metadata = {
  title: 'Services & Pricing | Orla Marie Mindfulness Coach',
  description: 'Discover mindfulness and meditation services including one-to-one sessions, group courses, and The OM Method approach to mindful living. Based in Ireland, available worldwide.',
}

export default function ServicesPage() {
  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <Section padded>
          <Container>
            <ServicesHero />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <ServicesOfferings />
          </Container>
        </Section>
        <Section padded={false}>
          <Container>
            <Divider className="my-2" />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <ServicesFAQ />
          </Container>
        </Section>
        <Section padded={false}>
          <Container>
            <Divider className="my-2" />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <ServicesCTA />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
