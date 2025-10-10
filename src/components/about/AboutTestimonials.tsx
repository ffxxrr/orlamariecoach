'use client'

import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Dublin, Ireland",
    text: "Working with Orla transformed my relationship with stress. The OM Method gave me practical tools I use daily, and her Kids Mindfulness techniques have been invaluable for my children during exam periods.",
    emoji: "👩"
  },
  {
    id: 2,
    name: "Michael O'Connor",
    location: "Cork, Ireland",
    text: "As someone who was skeptical about meditation, I was surprised by how accessible Orla makes it. Her approach is grounded, practical, and free from jargon. Six months later, I'm sleeping better and handling work pressure with much more ease.",
    emoji: "👨"
  },
  {
    id: 3,
    name: "Emma Walsh",
    location: "Galway, Ireland",
    text: "Orla's patience and authentic teaching style creates a space where anyone can learn mindfulness. The personal touches in The OM Method helped me create a sustainable practice that fits my busy life as a mother of three.",
    emoji: "👩"
  }
]

export default function AboutTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }
  
  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }
  
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pure-light to-light-border relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-forest-deep/5 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-sage-calm/5 rounded-full translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-4xl mx-auto">
        <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6 text-center">
          Student Experiences
        </h2>
        
        <div className="w-20 h-1 bg-forest-deep/20 mx-auto mb-12"></div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm relative">
          <div className="flex justify-center mb-8">
            <span className="text-6xl">❝</span>
          </div>
          
          <p className="text-medium-text text-lg text-center mb-8 min-h-[100px]">
            {testimonials[activeIndex].text}
          </p>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-forest-deep/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">{testimonials[activeIndex].emoji}</span>
            </div>
            <p className="text-forest-deep font-medium">{testimonials[activeIndex].name}</p>
            <p className="text-medium-text text-sm">{testimonials[activeIndex].location}</p>
          </div>
          
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === activeIndex ? 'bg-forest-deep' : 'bg-light-border'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-forest-deep hover:bg-forest-deep hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              &larr;
            </button>
          </div>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-forest-deep hover:bg-forest-deep hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
