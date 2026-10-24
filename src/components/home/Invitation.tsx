'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import CelticDivider from '@/components/ui/CelticDivider'
import Image from 'next/image'

export default function Invitation() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="relative py-32 md:py-40 bg-pure-light">
      {/* Celtic dividers */}
      <CelticDivider position="top" />
      <CelticDivider position="bottom" />

      {/* Vesica Piscis sacred geometry background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <Image
          src="/images/sora/vesica-piscis.png"
          alt=""
          width={800}
          height={800}
          className="opacity-[0.05] mix-blend-multiply"
          aria-hidden="true"
        />
      </div>

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
          Mindfulness is the practice of paying attention to the present moment, on
          purpose and without judgement. It is a simple, practical skill
          <span className="text-sage-calm">&mdash;</span>
          and one that anyone can learn, at any age.
        </p>

        {/* Breathing space */}
        <div className="my-12 flex justify-center items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-earth-warmth" />
          <span className="w-1.5 h-1.5 rounded-full bg-living-green/50" />
          <span className="w-2 h-2 rounded-full bg-earth-warmth" />
        </div>

        {/* Second paragraph */}
        <p className="font-crimson text-xl md:text-2xl text-sage-calm leading-relaxed">
          I&apos;m Orla Marie, an accredited mindfulness teacher based in Donegal, Ireland.
          Drawing on thirty years of personal practice and professional training, I deliver
          secular, evidence-based mindfulness programmes that help people manage stress,
          improve focus and build resilience&mdash;in the workplace, in the classroom and
          in everyday life.
        </p>
      </div>
    </section>
  )
}
