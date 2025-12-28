'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import CelticDivider from '@/components/ui/CelticDivider'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'

export default function BookingCTA() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const { trackNavigation, trackBookingFlow } = useEventTracker()

  return (
    <section className="py-24 md:py-32 px-6 bg-gradient-to-br from-forest-deep to-sage-calm text-white relative overflow-hidden">
      {/* Celtic divider */}
      <CelticDivider position="top" className="text-white/30" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='white' opacity='0.5'%3E%3Ccircle cx='20' cy='30' r='2'/%3E%3Ccircle cx='80' cy='20' r='1.5'/%3E%3Ccircle cx='60' cy='80' r='1'/%3E%3Ccircle cx='30' cy='70' r='1.5'/%3E%3Cpath d='M10 50 Q30 40 50 50 Q70 60 90 50' stroke='white' stroke-width='1' fill='none' opacity='0.2'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        <h2
          className={`font-crimson text-3xl md:text-4xl font-light mb-6 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-700`}
        >
          Your Transformation Starts Today
        </h2>

        <p
          className={`text-white/90 mb-10 max-w-2xl mx-auto ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-700`}
          style={{ transitionDelay: '100ms' }}
        >
          Take the first step toward lasting peace and clarity. Book your personalised
          meditation session and discover how mindfulness can transform your relationship
          with stress and bring authentic calm to your life.
        </p>

        <div
          className={`flex flex-wrap gap-4 justify-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-700`}
          style={{ transitionDelay: '200ms' }}
        >
          <Link
            href="#booking-widget"
            onClick={() => {
              trackBookingFlow('widget_clicked', { source: 'booking_cta' })
              trackNavigation('cta_clicked', '#booking-widget', 'booking_cta')
            }}
          >
            <Button variant="secondary">Schedule Your Session</Button>
          </Link>
          <Link
            href="/contact"
            onClick={() => trackNavigation('link_clicked', '/contact', 'booking_cta')}
          >
            <Button variant="ghost" className="border-2 border-white text-white hover:bg-white hover:text-forest-deep">
              Ask Questions First
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
