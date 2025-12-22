'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Link from 'next/link'

export default function SoftCTA() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-pure-light to-earth-warmth/20 overflow-hidden">
      {/* Decorative top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-pure-light to-transparent" />

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
            className="inline-flex items-center justify-center bg-forest-deep text-white px-8 py-4 rounded-full font-medium hover:bg-sage-calm hover:shadow-lg transition-all duration-300"
          >
            Book a Session
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-transparent text-forest-deep border-2 border-forest-deep/30 px-8 py-4 rounded-full font-medium hover:border-forest-deep hover:bg-forest-deep/5 transition-all duration-300"
          >
            Get in Touch
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
          >
            hello@orlamariecoach.com
          </a>
        </p>
      </div>
    </section>
  )
}
