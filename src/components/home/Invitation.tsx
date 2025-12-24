'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

export default function Invitation() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="relative py-32 md:py-40 bg-pure-light">
      {/* Warm center glow - visible radiance */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 50%, rgba(241, 203, 184, 0.55) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201, 164, 117, 0.35) 0%, transparent 45%)
          `,
        }}
      />

      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-living-green/30 to-transparent" />

      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Small intro text */}
        <p className="text-lg md:text-xl uppercase tracking-[0.15em] text-living-green mb-8 font-medium">
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

      {/* Celtic circle divider - bottom */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 z-20 pointer-events-none">
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
    </section>
  )
}
