import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Contact',
  description: 'Contact Orla Marie about one-to-one, workplace or school mindfulness programmes. Based in Donegal, Ireland, working in person and online.',
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
