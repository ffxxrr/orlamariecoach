'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

const faqs = [
  {
    id: 1,
    question: "What is your approach to mindfulness coaching?",
    answer: "My approach combines traditional meditation techniques with practical applications for modern life. It focuses on three core elements: observing with non-judgmental awareness, cultivating present-moment attention, and connecting your practice to your personal values. This method is designed to make meditation accessible and relevant to your unique circumstances."
  },
  {
    id: 2,
    question: "I've never meditated before. Is this suitable for beginners?",
    answer: "Absolutely! The Mindfulness Foundation Course is specifically designed to welcome beginners and guide you step by step. One-to-one sessions are also excellent for beginners as they provide personalised guidance tailored to your experience level. No prior knowledge or experience is necessary—just an open mind and willingness to learn."
  },
  {
    id: 3,
    question: "How often should I attend sessions to see results?",
    answer: "For one-to-one sessions, most clients begin with weekly sessions for 4-6 weeks to establish a strong foundation, then transition to fortnightly or monthly sessions. The Foundation Course runs weekly for 8 weeks. Consistency is key—regular short practices are more effective than occasional long ones."
  },
  {
    id: 4,
    question: "Are online sessions as effective as in-person?",
    answer: "Yes, my approach works wonderfully in both formats. Online sessions offer convenience and accessibility while maintaining the personal connection essential for effective guidance. Many clients actually prefer online sessions as they learn to practice in their everyday environment."
  },
  {
    id: 5,
    question: "Do you offer gift certificates?",
    answer: "Yes! Gift certificates are available for both one-to-one sessions and courses. They make thoughtful presents for birthdays, anniversaries, or anyone going through a challenging time. Contact me directly to arrange a gift certificate with a personal message."
  }
]

export default function ServicesFAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="relative py-24 md:py-32 bg-pure-light overflow-hidden">
      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-living-green/30 to-transparent" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className={`text-sm uppercase tracking-[0.2em] text-living-green mb-4 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
          >
            Questions
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

      {/* Subtle decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent via-living-green/30 to-transparent" />
    </section>
  )
}
