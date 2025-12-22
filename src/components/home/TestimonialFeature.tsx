'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

export default function TestimonialFeature() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="relative py-32 md:py-40 bg-earth-warmth/30 overflow-hidden">
      {/* Background texture - could be replaced with Sora video */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201, 164, 117, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, rgba(241, 203, 184, 0.3) 0%, transparent 50%)`,
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

      {/* Subtle corner decorations */}
      <div className="absolute top-12 left-12 w-24 h-24 border-l-2 border-t-2 border-living-green/10 rounded-tl-3xl" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-r-2 border-b-2 border-living-green/10 rounded-br-3xl" />
    </section>
  )
}
