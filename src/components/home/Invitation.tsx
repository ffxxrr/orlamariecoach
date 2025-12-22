'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

export default function Invitation() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="relative py-32 md:py-40 bg-pure-light overflow-hidden">
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-living-green/30 to-transparent" />

      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Small intro text */}
        <p className="text-sm uppercase tracking-[0.2em] text-living-green mb-8">
          Welcome
        </p>

        {/* Main invitation text - large, elegant, breathing */}
        <p className="font-crimson text-2xl md:text-3xl lg:text-4xl text-deep-text leading-relaxed md:leading-relaxed lg:leading-relaxed">
          In a world that never stops moving, finding stillness isn&apos;t a luxury
          <span className="text-sage-calm">&mdash;</span>
          it&apos;s essential. I&apos;m Orla Marie, and for thirty years I&apos;ve walked
          the path of meditation, from the ancient standing stones of Donegal
          to guiding over 500 people home to themselves.
        </p>

        {/* Breathing space */}
        <div className="my-12 flex justify-center items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-earth-warmth" />
          <span className="w-1.5 h-1.5 rounded-full bg-living-green/50" />
          <span className="w-2 h-2 rounded-full bg-earth-warmth" />
        </div>

        {/* Second paragraph */}
        <p className="font-crimson text-xl md:text-2xl text-sage-calm leading-relaxed">
          This isn&apos;t about apps or algorithms. It&apos;s about the irreplaceable
          gift of human guidance, tailored to your unique journey.
        </p>
      </div>

      {/* Subtle decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent via-living-green/30 to-transparent" />
    </section>
  )
}
