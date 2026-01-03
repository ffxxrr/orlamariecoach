'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import CelticDivider from '@/components/ui/CelticDivider'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'
import { ArrowFlow } from '@/components/brand/CelticIcons'

export default function ServicesCTA() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })
  const { trackNavigation } = useEventTracker()

  return (
    <section className="relative py-24 md:py-32 bg-living-green/20">
      {/* Celtic dividers */}
      <CelticDivider position="top" />
      <CelticDivider position="bottom" />

      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-sm uppercase tracking-[0.2em] text-living-green mb-6">
          Cross the Threshold
        </p>

        <h2 className="font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep mb-6 leading-tight">
          Find your thin place
        </h2>

        <p className="text-lg text-sage-calm mb-10 max-w-2xl mx-auto leading-relaxed">
          As your Anam Chara, I guide you to the threshold—you step through.
          Choose the path that calls to you and begin your Turas today.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/book-session"
            className="inline-flex items-center justify-center bg-forest-deep text-white px-8 py-4 rounded-full font-medium hover:bg-sage-calm transition-all duration-300 min-w-[200px]"
            onClick={() => trackNavigation('cta_clicked', '/book-session', 'services_cta')}
          >
            Book a Session
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 group"
            onClick={() => trackNavigation('link_clicked', '/contact', 'services_cta')}
          >
            <span className="text-forest-deep font-medium uppercase tracking-wider text-sm">
              Ask a Question
            </span>
            <ArrowFlow size={72} className="transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
