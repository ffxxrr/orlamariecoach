'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'
import { ArrowFlow } from '@/components/brand/CelticIcons'

// Seasonal highlights shown just under the hero. Each one hides itself after its end date,
// so nothing goes stale on the live site if it isn't removed in time.
const COURSE_UNTIL = new Date('2027-01-12T23:59:59Z')
const VOUCHERS_UNTIL = new Date('2026-12-20T23:59:59Z')

function stillShowing(until: Date) {
  return Date.now() <= until.getTime()
}

export default function ComingUp() {
  const { trackNavigation } = useEventTracker()
  const [showCourse, setShowCourse] = useState(true)
  const [showVouchers, setShowVouchers] = useState(true)

  useEffect(() => {
    setShowCourse(stillShowing(COURSE_UNTIL))
    setShowVouchers(stillShowing(VOUCHERS_UNTIL))
  }, [])

  if (!showCourse && !showVouchers) return null

  return (
    <section className="bg-pure-light py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <p className="text-sm uppercase tracking-[0.2em] text-living-green text-center mb-8">Coming up</p>
        <div className={`grid gap-6 md:gap-8 ${showCourse && showVouchers ? 'md:grid-cols-5' : ''}`}>
          {showCourse && (
            <div className="md:col-span-3 rounded-2xl bg-forest-deep text-pure-light p-8 md:p-10 shadow-lg">
              <h2 className="font-crimson text-3xl md:text-4xl leading-tight mb-4">
                Six-Week Mindfulness Course
              </h2>
              <p className="text-pure-light/90 text-lg leading-relaxed mb-6">
                Start the new year with a calmer mind. A gentle, practical course for complete beginners, with guided recordings to support you at home.
              </p>
              <ul className="space-y-1 text-pure-light/90 mb-8">
                <li>Tuesdays, 12 January to 16 February, 7pm to 8.30pm</li>
                <li>The Sliabh Sneacht Centre, Drumfries, Buncrana</li>
                <li>€150 for all six weeks. Places are limited.</li>
              </ul>
              <Link
                href="/mindfulness-course"
                onClick={() => trackNavigation('cta_clicked', '/mindfulness-course', 'home_coming_up')}
                className="inline-flex items-center justify-center bg-earth-warmth text-forest-deep px-8 py-4 rounded-full font-medium text-lg hover:bg-white transition-colors w-full sm:w-auto"
              >
                Book your place
              </Link>
            </div>
          )}

          {showVouchers && (
            <div className={`${showCourse ? 'md:col-span-2' : ''} rounded-2xl bg-earth-warmth/40 border border-earth-warmth p-8 md:p-10 flex flex-col`}>
              <h2 className="font-crimson text-3xl leading-tight text-forest-deep mb-4">
                Give the gift of calm this Christmas
              </h2>
              <p className="text-sage-calm text-lg leading-relaxed mb-6 flex-1">
                Mindfulness gift vouchers for a session, the January course, or any amount you choose. Please order by 20 December.
              </p>
              <Link
                href="/gift-vouchers"
                onClick={() => trackNavigation('cta_clicked', '/gift-vouchers', 'home_coming_up')}
                className="inline-flex items-center gap-3 group self-start"
              >
                <span className="text-forest-deep font-medium uppercase tracking-wider text-sm">See gift vouchers</span>
                <ArrowFlow size={64} className="transform group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
