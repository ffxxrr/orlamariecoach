'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Image from 'next/image'
import CelticDivider from '@/components/ui/CelticDivider'

export default function AboutStory() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="relative py-32 md:py-40 bg-pure-light">
      {/* Celtic dividers */}
      <CelticDivider position="top" />
      <CelticDivider position="bottom" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Image with decorative frame */}
          <div
            className={`relative ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            } transition-all duration-1000 ease-out`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative aspect-[4/5]">
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/orla/optimized/orla-looking-away.webp"
                  alt="Orla Marie gazing contemplatively into the distance"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              {/* Decorative frame offset */}
              <div className="absolute inset-0 border-2 border-living-green/20 rounded-2xl -z-10 translate-y-3 translate-x-3" />
            </div>
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
              A pilgrimage through the thin places
            </h2>

            <div
              className={`space-y-6 text-sage-calm leading-relaxed ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '300ms' }}
            >
              <p>
                My journey has been a thirty-year <em>Turas</em>&mdash;a guided pilgrimage
                through the inner and outer landscapes of the soul. From discovering a simple
                book on meditation which belonged to my father at sixteen to walking
                the ancient stations of the Inishowen Peninsula, my practice is a continuous
                circle of return and renewal.
              </p>

              <p>
                I grew up in Donegal&apos;s thin places&mdash;those thresholds where the veil
                between worlds grows thin and the ordinary becomes sacred. The earthy scent
                of damp moss, the raw energy of the Atlantic, the stillness at ancient
                standing stones. These landscapes taught me that peace isn&apos;t something
                we find&mdash;it&apos;s something we return to.
              </p>

              <p>
                Now I guide others to their own internal thin place. In a world of
                disconnected algorithms, I offer the ancient Irish tradition of the
                <em> Anam Chara</em>&mdash;a soul friend who walks beside you. My purpose
                is to help you build your own architecture of resilience, rooted in
                three thousand years of heritage and thirty years of practice.
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
              &ldquo;I guide you to the threshold&mdash;you step through.&rdquo;
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}
