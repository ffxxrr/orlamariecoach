'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Link from 'next/link'

export default function AboutGlimpse() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-pure-light">
      {/* Celtic circle divider - top */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 z-20 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-living-green/40">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M100 30 Q140 65 100 100 Q60 65 100 30" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M170 100 Q135 140 100 100 Q135 60 170 100" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M100 170 Q60 135 100 100 Q140 135 100 170" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M30 100 Q65 60 100 100 Q65 140 30 100" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          {/* Small decorative element */}
          <div
            className={`mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            <svg className="w-8 h-8 mx-auto text-living-green/30" viewBox="0 0 32 32" fill="currentColor">
              <circle cx="16" cy="16" r="3" />
            </svg>
          </div>

          {/* Label */}
            <p
              className={`text-sm uppercase tracking-[0.2em] text-living-green mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Meet Orla
            </p>

            {/* Heading */}
            <h2
              className={`font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep mb-8 leading-tight transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Thirty years of practice,
              <br />
              <span className="text-sage-calm">one purpose</span>
            </h2>

            {/* Story excerpt */}
            <div
              className={`space-y-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-lg text-deep-text leading-relaxed">
                My journey began at sixteen, when I discovered the Bhagavad Gita in my
                grandmother&apos;s bookshelf. What started as curiosity became a life&apos;s
                calling, leading me from the ancient sites of Ireland to teaching
                mindfulness across the world.
              </p>
              <p className="text-lg text-sage-calm leading-relaxed">
                Today, I blend traditional contemplative practices with modern understanding,
                creating approaches that honour the wisdom of the past while meeting the
                challenges of contemporary life.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className={`inline-flex items-center gap-3 mt-10 group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <span className="text-forest-deep font-medium uppercase tracking-wider text-sm">
                Read My Story
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
    </section>
  )
}
