'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import BookingHero from '@/components/booking/BookingHero'
import BookingOptions from '@/components/booking/BookingOptions'
import BookingWidget from '@/components/booking/BookingWidget'
import BookingTestimonials from '@/components/booking/BookingTestimonials'
import BookingFAQ from '@/components/booking/BookingFAQ'
import BookingCTA from '@/components/booking/BookingCTA'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'
import { useEffect } from 'react'

// Metadata is handled by layout.tsx for client components

export default function BookSessionPage() {
  // Page view tracking handled by AnalyticsProvider

  const { trackBookingFlow } = useEventTracker()

  // Track that user reached booking page
  useEffect(() => {
    trackBookingFlow('started', {
      entryPoint: 'booking_page',
      timestamp: new Date().toISOString()
    })
  }, [])

  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <Section padded>
          <Container>
            <BookingHero />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <BookingOptions />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <BookingWidget />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <BookingTestimonials />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <BookingFAQ />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <BookingCTA />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
