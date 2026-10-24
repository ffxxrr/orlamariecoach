'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Link from 'next/link'
import CelticDivider from '@/components/ui/CelticDivider'
import { ArrowFlow } from '@/components/brand/CelticIcons'

export default function AboutGlimpse() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-pure-light">
      {/* Celtic dividers */}
      <CelticDivider position="top" />
      <CelticDivider position="bottom" />

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
              <span className="text-sage-calm">a professional approach</span>
            </h2>

            {/* Story excerpt */}
            <div
              className={`space-y-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-lg text-deep-text leading-relaxed">
                My meditation practice began 30 years ago at the age of sixteen, when I found
                a simple book on meditation that belonged to my father. What started as curiosity became a
                lifelong practice, and later a profession.
              </p>
              <p className="text-lg text-sage-calm leading-relaxed">
                Today I am an accredited mindfulness teacher, trained with Mindfulness Now
                (The UK College of Mindfulness Meditation), with a background in psychotherapy
                training at the University of Manchester. From my base in Donegal, I work with
                organisations, schools and individuals across Ireland, the UK and online.
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
                Read More About Orla
              </span>
              <ArrowFlow size={72} className="transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
            </Link>
      </div>
    </section>
  )
}
