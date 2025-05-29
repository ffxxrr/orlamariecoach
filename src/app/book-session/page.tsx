import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import BookingHero from '@/components/booking/BookingHero'
import BookingOptions from '@/components/booking/BookingOptions'
import BookingWidget from '@/components/booking/BookingWidget'
import BookingTestimonials from '@/components/booking/BookingTestimonials'
import BookingFAQ from '@/components/booking/BookingFAQ'
import BookingCTA from '@/components/booking/BookingCTA'

export const metadata = {
  title: 'Book Your Session | Orla Marie Meditation Coach',
  description: 'Schedule your personalised meditation session with Orla Marie. Choose from individual sessions or package deals using The OM Method approach to mindfulness.',
}

export default function BookSessionPage() {
  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <BookingHero />
        <BookingOptions />
        <BookingWidget />
        <BookingTestimonials />
        <BookingFAQ />
        <BookingCTA />
      </main>
      <Footer />
    </>
  )
}
