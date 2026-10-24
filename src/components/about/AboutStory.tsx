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
              From personal practice to professional teaching
            </h2>

            <div
              className={`space-y-6 text-sage-calm leading-relaxed ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '300ms' }}
            >
              <p>
                My meditation practice began 30 years ago at the age of sixteen, when I
                discovered a book on meditation that belonged to my father. What started as
                curiosity became a daily practice that has stayed with me ever since.
              </p>

              <p>
                Living in Donegal, close to the Atlantic coast and open landscape, I learned
                early how much a few moments of stillness can change the way we meet the day.
                That experience led me to train professionally, so that I could share
                mindfulness safely and effectively with others.
              </p>

              <p>
                I am an accredited mindfulness teacher, trained with Mindfulness Now, The UK
                College of Mindfulness Meditation. My teaching draws on the established,
                evidence-based mindfulness approaches developed over the past forty
                years. It is secular, practical and trauma-informed, and always adapted to
                the people in front of me.
              </p>

              <p>
                Today I deliver mindfulness programmes for workplaces, schools and
                individuals, in person and online. My aim is simple: to give people
                practical skills they can use for life.
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
              &ldquo;Mindfulness isn&apos;t about emptying the mind. It&apos;s about learning
              to be present with whatever is here.&rdquo;
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}
