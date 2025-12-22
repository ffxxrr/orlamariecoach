'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

export default function ServicesCTA() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="relative py-24 md:py-32 bg-earth-warmth/30 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-sm uppercase tracking-[0.2em] text-living-green mb-6">
          Take the First Step
        </p>

        <h2 className="font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep mb-6 leading-tight">
          Begin your mindfulness journey
        </h2>

        <p className="text-lg text-sage-calm mb-10 max-w-2xl mx-auto leading-relaxed">
          Ready to experience the transformative benefits of mindfulness with personalised guidance?
          Choose the path that best suits your needs and take the first step today.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/book-session"
            className="inline-flex items-center justify-center bg-forest-deep text-white px-8 py-4 rounded-full font-medium hover:bg-sage-calm transition-all duration-300 min-w-[200px]"
          >
            Book a Session
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 group"
          >
            <span className="text-forest-deep font-medium uppercase tracking-wider text-sm">
              Ask a Question
            </span>
            <span className="w-8 h-px bg-forest-deep group-hover:w-12 transition-all duration-300" />
            <svg
              className="w-4 h-4 text-forest-deep transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
