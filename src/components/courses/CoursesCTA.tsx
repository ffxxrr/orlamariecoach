'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import CelticDivider from '@/components/ui/CelticDivider'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'

export default function CoursesCTA() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })
  const { trackNavigation, trackCourseInteraction } = useEventTracker()

  return (
    <section className="relative py-24 md:py-32 bg-pure-light overflow-hidden">
      {/* Celtic divider */}
      <CelticDivider position="top" />

      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="text-sm uppercase tracking-[0.2em] text-living-green mb-6">
          Ready to Begin
        </p>

        <h2 className="font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep mb-6 leading-tight">
          Start your journey today
        </h2>

        <p className="text-lg text-sage-calm mb-10 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of students who have transformed their lives through these mindfulness courses.
          Expert guidance every step of the way.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/book-session"
            className="inline-flex items-center justify-center bg-forest-deep text-white px-8 py-4 rounded-full font-medium hover:bg-sage-calm transition-all duration-300 min-w-[200px]"
            onClick={() => {
              trackCourseInteraction('enroll_clicked', { source: 'courses_cta' })
              trackNavigation('cta_clicked', '/book-session', 'courses_cta')
            }}
          >
            Enroll Now
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 group"
            onClick={() => trackNavigation('link_clicked', '/contact', 'courses_cta')}
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
