'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import CelticDivider from '@/components/ui/CelticDivider'

const faqs = [
  {
    id: 1,
    question: "Do I need any previous meditation experience?",
    answer: "Not at all for the Mindfulness Foundations course, which is specifically designed for beginners. The Daily Life course is suitable for all levels, while the Deepening course is better suited for those with some previous meditation experience."
  },
  {
    id: 2,
    question: "How are the online courses structured?",
    answer: "All courses include weekly live sessions conducted via Zoom, guided meditation recordings for daily practice, comprehensive course materials, and access to a private community group. All live sessions are recorded for those who cannot attend in real-time."
  },
  {
    id: 3,
    question: "What if I miss a live session?",
    answer: "No problem! All live sessions are recorded and made available within 24 hours. Many students successfully complete courses using the recordings exclusively due to time zone differences or scheduling conflicts."
  },
  {
    id: 4,
    question: "How much practice time is needed between sessions?",
    answer: "For optimal results, we recommend 15-30 minutes of daily practice using the guided meditations provided. However, even 5-10 minutes daily is beneficial. The courses emphasize quality and consistency over duration."
  },
  {
    id: 5,
    question: "Is there a payment plan available?",
    answer: "Yes, all courses offer the option to pay in three monthly installments instead of the full amount upfront. There's no additional fee for choosing the payment plan."
  }
]

export default function CoursesFAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="relative py-24 md:py-32 bg-living-green/20 overflow-hidden">
      {/* Celtic dividers */}
      <CelticDivider position="top" />
      <CelticDivider position="bottom" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className={`text-sm uppercase tracking-[0.2em] text-living-green mb-4 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
          >
            Course Questions
          </p>
          <h2
            ref={ref}
            className={`font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep leading-tight ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '100ms' }}
          >
            Frequently Asked
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: `${200 + index * 50}ms` }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none group"
              >
                <span className="font-crimson text-lg text-forest-deep group-hover:text-sage-calm transition-colors">
                  {faq.question}
                </span>
                <span className={`text-living-green text-2xl transition-transform duration-300 ${
                  openId === faq.id ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                openId === faq.id ? 'max-h-96' : 'max-h-0'
              }`}>
                <p className="px-6 pb-5 text-sage-calm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact prompt */}
        <p className="text-center mt-12 text-sage-calm">
          Have another question?{' '}
          <a href="/contact" className="text-forest-deep hover:underline">
            Get in touch
          </a>
        </p>
      </div>
    </section>
  )
}
