'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import ContactHero from '@/components/contact/ContactHero'
import ContactQuickQuestions from '@/components/contact/ContactQuickQuestions'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactFAQ from '@/components/contact/ContactFAQ'
import ContactCTA from '@/components/contact/ContactCTA'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
// Analytics handled by AnalyticsProvider

// Metadata is handled by layout.tsx for client components

export default function ContactPage() {
  // Page view tracking handled by AnalyticsProvider

  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <Section padded>
          <Container>
            <ContactHero />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <ContactQuickQuestions />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <ContactForm />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <ContactInfo />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <ContactFAQ />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <ContactCTA />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
