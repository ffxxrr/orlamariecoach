import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import ContactHero from '@/components/contact/ContactHero'
import ContactQuickQuestions from '@/components/contact/ContactQuickQuestions'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactFAQ from '@/components/contact/ContactFAQ'
import ContactCTA from '@/components/contact/ContactCTA'

export const metadata = {
  title: 'Contact & Questions | Orla Marie Meditation Coach',
  description: 'Get personalized guidance for your meditation journey. Ask questions about The OM Method, courses, or meditation practices tailored to your needs.',
}

export default function ContactPage() {
  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <ContactHero />
        <ContactQuickQuestions />
        <ContactForm />
        <ContactInfo />
        <ContactFAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}
