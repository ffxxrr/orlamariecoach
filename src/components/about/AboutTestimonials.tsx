'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

const testimonial = {
  quote: "Working with Orla transformed my relationship with stress. Her approach is grounded, practical, and free from jargon. Six months later, I'm sleeping better and handling work pressure with much more ease.",
  name: "Michael O'Connor",
  location: "Cork, Ireland",
}

export default function AboutTestimonials() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="relative py-24 md:py-32 bg-pure-light overflow-hidden">
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-living-green/30 to-transparent" />

      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Large quote mark */}
        <div className="text-6xl md:text-8xl text-earth-warmth/50 font-crimson mb-8">
          &ldquo;
        </div>

        {/* Quote */}
        <blockquote className="font-crimson text-2xl md:text-3xl lg:text-4xl text-forest-deep leading-relaxed mb-12">
          {testimonial.quote}
        </blockquote>

        {/* Attribution */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-px bg-living-green/50 mb-6" />
          <p className="text-forest-deep font-medium">{testimonial.name}</p>
          <p className="text-sage-calm text-sm">{testimonial.location}</p>
        </div>
      </div>

      {/* Subtle decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent via-living-green/30 to-transparent" />
    </section>
  )
}
