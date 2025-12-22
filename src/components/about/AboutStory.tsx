'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Image from 'next/image'

export default function AboutStory() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="relative py-24 md:py-32 bg-pure-light overflow-hidden">
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-living-green/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image */}
          <div
            className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            } transition-all duration-1000 ease-out`}
            style={{ transitionDelay: '200ms' }}
          >
            <Image
              src="/images/orla/optimized/about/7R500406.webp"
              alt="Orla Marie teaching meditation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div>
            <p
              className={`text-sm uppercase tracking-[0.2em] text-living-green mb-4 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '100ms' }}
            >
              My Story
            </p>

            <h2
              className={`font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep mb-6 leading-tight ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '200ms' }}
            >
              From the hills of Donegal to guiding souls home
            </h2>

            <div
              className={`space-y-6 text-sage-calm leading-relaxed ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '300ms' }}
            >
              <p>
                My path to mindfulness began in the rolling hills of Donegal. Growing up
                surrounded by nature&apos;s serene beauty, I developed an appreciation for
                stillness long before I understood its power.
              </p>

              <p>
                Like many, my deeper journey started during a challenging time. Working in
                a high-pressure corporate environment, I found myself disconnected from
                the present moment, constantly anxious about the future. Meditation
                offered not just relief, but a fundamental shift in how I related to
                my thoughts and experiences.
              </p>

              <p>
                Returning to Donegal, I began sharing these practices with others.
                What started as small group sessions grew as people experienced
                transformation for themselves. Through working with hundreds of
                students, I developed a personalised approach that makes mindfulness
                accessible and relevant to modern life.
              </p>
            </div>

            {/* Breathing space */}
            <div className="my-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-earth-warmth" />
              <span className="w-1.5 h-1.5 rounded-full bg-living-green/50" />
              <span className="w-2 h-2 rounded-full bg-earth-warmth" />
            </div>

            <p
              className={`font-crimson text-xl md:text-2xl text-forest-deep italic ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '400ms' }}
            >
              &ldquo;Mindfulness isn&apos;t just a practice&mdash;it&apos;s a way of being.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Subtle decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent via-living-green/30 to-transparent" />
    </section>
  )
}
