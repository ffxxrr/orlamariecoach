'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutGlimpse() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-pure-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-5 gap-12 lg:gap-20 items-center">
          {/* Image - Takes 2 columns */}
          <div
            className={`md:col-span-2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/orla/optimized/about/7R500325.webp"
                  alt="Orla Marie - Meditation Coach"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
              {/* Decorative frame offset */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-living-green/20 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Content - Takes 3 columns */}
          <div className="md:col-span-3">
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
        </div>
      </div>
    </section>
  )
}
