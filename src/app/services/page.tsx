import ServicesHero from '@/components/services/ServicesHero'
import ServicesOfferings from '@/components/services/ServicesOfferings'
import ServicesFAQ from '@/components/services/ServicesFAQ'
import ServicesCTA from '@/components/services/ServicesCTA'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'

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
        <ServicesHero />
        <ServicesOfferings />
        <ServicesFAQ />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  )
}
