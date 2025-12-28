'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Link from 'next/link'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'

export default function SoftCTA() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })
  const { trackNavigation, trackContactInteraction } = useEventTracker()

  return (
    <section className="relative py-24 md:py-32 bg-pure-light overflow-hidden">
      {/* Soft organic wave at top */}
      <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-24 text-earth-warmth/20"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,100 L0,100 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Warm radial glow - softer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 70%, rgba(241, 203, 184, 0.25) 0%, transparent 60%)
          `,
        }}
      />

      <div
        ref={ref}
        className="relative max-w-2xl mx-auto px-6 text-center"
      >
        {/* Triskelion decoration */}
        <div
          className={`mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <svg
            className="w-12 h-12 mx-auto text-living-green/40"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50 15c0 19.33-15.67 35-35 35 19.33 0 35 15.67 35 35 0-19.33 15.67-35 35-35-19.33 0-35-15.67-35-35z" />
          </svg>
        </div>

        {/* Heading */}
        <h2
          className={`font-crimson text-3xl md:text-4xl text-forest-deep mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          Begin when you&apos;re ready
        </h2>

        {/* Text */}
        <p
          className={`text-lg text-sage-calm mb-10 leading-relaxed transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          There&apos;s no pressure here. When the time feels right, I&apos;d be honoured
          to walk alongside you on your mindfulness journey.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <Link
            href="/book-session"
            className="inline-flex items-center justify-center bg-forest-deep/90 text-white px-8 py-3.5 rounded-full font-medium hover:bg-forest-deep hover:shadow-md transition-all duration-300"
            onClick={() => trackNavigation('cta_clicked', '/book-session', 'soft_cta')}
          >
            Book a Session
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center text-forest-deep px-8 py-3.5 font-medium hover:text-sage-calm transition-all duration-300 group"
            onClick={() => trackNavigation('link_clicked', '/contact', 'soft_cta')}
          >
            <span>Get in Touch</span>
            <span className="ml-2 w-5 h-px bg-forest-deep group-hover:w-8 group-hover:bg-sage-calm transition-all duration-300" />
          </Link>
        </div>

        {/* Subtle email option */}
        <p
          className={`mt-12 text-sm text-sage-calm/70 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          Or simply say hello at{' '}
          <a
            href="mailto:hello@orlamariecoach.com"
            className="text-forest-deep hover:underline"
            onClick={() => trackContactInteraction('email_clicked', { contactMethod: 'email', source: 'soft_cta' })}
          >
            hello@orlamariecoach.com
          </a>
        </p>
      </div>
    </section>
  )
}
