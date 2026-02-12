'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import CelticDivider from '@/components/ui/CelticDivider'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'
import { ArrowFlow } from '@/components/brand/CelticIcons'
import { FEATURES } from '@/lib/features'

export default function AboutCTA() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })
  const { trackNavigation } = useEventTracker()

  return (
    <section className="relative py-32 md:py-40 bg-living-green/20">
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
          Begin Your Journey
        </p>

        <h2 className="font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep mb-6 leading-tight">
          Ready to find your thin place?
        </h2>

        <p className="text-lg text-sage-calm mb-10 max-w-2xl mx-auto leading-relaxed">
          Whether you seek a threshold to stillness, relief from the weight of worry,
          or simply a soul friend to walk beside you&mdash;I&apos;m here.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={FEATURES.courses ? '/book-session' : '/contact'}
            className="inline-flex items-center justify-center bg-forest-deep text-white px-8 py-4 rounded-full font-medium hover:bg-sage-calm transition-all duration-300 min-w-[200px]"
            onClick={() => trackNavigation('cta_clicked', FEATURES.courses ? '/book-session' : '/contact', 'about_cta')}
          >
            {FEATURES.courses ? 'Book a Session' : 'Get in Touch'}
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-3 group"
            onClick={() => trackNavigation('link_clicked', '/services', 'about_cta')}
          >
            <span className="text-forest-deep font-medium uppercase tracking-wider text-sm">
              Explore Services
            </span>
            <ArrowFlow size={72} className="transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}
