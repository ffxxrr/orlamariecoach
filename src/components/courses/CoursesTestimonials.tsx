'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import CelticDivider from '@/components/ui/CelticDivider'

const testimonial = {
  quote: "The Mindfulness Foundations course was transformative. Orla's teaching style makes mindfulness approachable and practical. I've gone from skeptical to practicing daily, and the benefits in my stress levels and sleep quality have been remarkable.",
  name: "Laura Kennedy",
  location: "Dublin, Ireland",
  course: "Mindfulness Foundations"
}

export default function CoursesTestimonials() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })

  return (
    <section className="relative py-24 md:py-32 bg-pure-light overflow-hidden">
      {/* Celtic dividers */}
      <CelticDivider position="top" />
      <CelticDivider position="bottom" />

      {/* Warm atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 50%, rgba(241, 203, 184, 0.45) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 50% 45%, rgba(201, 164, 117, 0.25) 0%, transparent 45%)
          `,
        }}
      />

      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Large quote mark */}
        <div className="text-6xl md:text-8xl text-forest-deep/20 font-crimson mb-8">
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
          <p className="text-living-green text-sm mt-2">{testimonial.course}</p>
        </div>
      </div>

    </section>
  )
}
