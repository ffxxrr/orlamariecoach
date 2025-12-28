'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'

export default function ContactCTA() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const { trackNavigation, trackContactInteraction } = useEventTracker()

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-forest-deep to-sage-calm text-white relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='white' opacity='0.5'%3E%3Ccircle cx='20' cy='30' r='2'/%3E%3Ccircle cx='80' cy='20' r='1.5'/%3E%3Ccircle cx='60' cy='70' r='1'/%3E%3Ccircle cx='30' cy='80' r='1.5'/%3E%3Cpath d='M10 50 Q30 40 50 50 Q70 60 90 50' stroke='white' stroke-width='1' fill='none' opacity='0.2'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        <h2
          className={`font-crimson text-3xl md:text-4xl font-light mb-6 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-700`}
        >
          Ready for Personalised Guidance?
        </h2>

        <p
          className={`text-white/90 mb-10 max-w-2xl mx-auto ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-700`}
          style={{ transitionDelay: '100ms' }}
        >
          Whether you start with questions or jump straight into a session, I'm here to support
          your meditation journey with authentic, personalised guidance.
        </p>

        <div
          className={`flex flex-wrap gap-4 justify-center ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-700`}
          style={{ transitionDelay: '200ms' }}
        >
          <Link
            href="#contact-form"
            onClick={() => {
              trackContactInteraction('form_viewed', { source: 'contact_cta' })
              trackNavigation('cta_clicked', '#contact-form', 'contact_cta')
            }}
          >
            <Button variant="secondary">Send Your Questions</Button>
          </Link>
          <Link
            href="/book-session"
            onClick={() => trackNavigation('cta_clicked', '/book-session', 'contact_cta')}
          >
            <Button variant="ghost" className="border-2 border-white text-white hover:bg-white hover:text-forest-deep">
              Book a Session
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
