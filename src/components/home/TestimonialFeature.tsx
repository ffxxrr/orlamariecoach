'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

export default function TestimonialFeature() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="relative py-32 md:py-40 bg-earth-warmth/30">
      {/* Layered atmospheric light mist effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary soft glow - asymmetric light pools */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 140% 100% at 10% 20%, rgba(241, 203, 184, 0.75) 0%, transparent 40%),
              radial-gradient(ellipse 130% 90% at 90% 80%, rgba(201, 164, 117, 0.6) 0%, transparent 35%),
              radial-gradient(ellipse 100% 70% at 50% 50%, rgba(255, 252, 241, 0.65) 0%, transparent 50%)
            `,
          }}
        />
        {/* Darker vignette edges for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 110% 90% at 50% 50%, transparent 25%, rgba(86, 20, 15, 0.12) 100%)',
          }}
        />
      </div>

      <div
        ref={ref}
        className="relative max-w-4xl mx-auto px-6 text-center"
      >
        {/* Decorative quote mark */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <svg
            className="w-16 h-16 mx-auto text-living-green/40"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* The Quote */}
        <blockquote
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <p className="font-crimson text-2xl md:text-3xl lg:text-4xl text-forest-deep leading-relaxed md:leading-relaxed italic">
            Working with Orla has been transformative. She has this rare gift of meeting
            you exactly where you are, without judgement, and gently guiding you toward
            a peace I didn&apos;t know I was capable of finding.
          </p>
        </blockquote>

        {/* Attribution */}
        <div
          className={`mt-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="w-12 h-px bg-living-green mx-auto mb-6" />
          <p className="text-sage-calm">
            <span className="font-medium">Sarah M.</span>
            <span className="mx-2 text-living-green/50">&mdash;</span>
            <span className="text-sm">Dublin, Ireland</span>
          </p>
        </div>
      </div>

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
    </section>
  )
}
