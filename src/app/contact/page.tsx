import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Contact | Orla Marie Mindfulness Coach',
  description: 'Get in touch with Orla Marie for personalised mindfulness guidance, course information, or session bookings. Based in Donegal, Ireland, available worldwide.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero - Full bleed immersive */}
        <ContactHero />

        {/* Contact Form - Clean minimal */}
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
