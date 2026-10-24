'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import CelticDivider from '@/components/ui/CelticDivider'

const faqs = [
  {
    id: 1,
    question: "What is mindfulness?",
    answer: "Mindfulness means paying attention to the present moment, on purpose and without judgement. Through simple meditation practices—focusing on the breath, the body and everyday activities—we learn to notice thoughts and feelings without being carried away by them. It is a secular, practical skill that anyone can learn."
  },
  {
    id: 2,
    question: "Is this suitable for beginners?",
    answer: "Yes. All programmes are designed for people with no previous experience of meditation. Each practice is introduced step by step, and you'll be supported throughout."
  },
  {
    id: 7,
    question: "What does trauma-informed mean?",
    answer: "A trauma-informed approach recognises that many people carry difficult experiences, and that some meditation practices can bring up strong feelings. Practices are always offered as invitations, never requirements: you can keep your eyes open, adapt a practice or pause at any time, and we work at a pace that feels safe for you."
  },
  {
    id: 3,
    question: "What does the research say?",
    answer: "Mindfulness-based approaches have been studied extensively over the past forty years. Evidence suggests they can help reduce stress and support wellbeing, focus and resilience."
  },
  {
    id: 4,
    question: "Can mindfulness replace therapy or medical treatment?",
    answer: "No. Mindfulness can be a valuable support, but it is not a substitute for medical or psychological care. If you are going through significant mental health difficulties, we'll talk beforehand to make sure a programme is suitable for you, and I'd encourage you to speak with your GP."
  },
  {
    id: 5,
    question: "Are online sessions as effective as in-person?",
    answer: "Online sessions work very well for mindfulness. Many people find it helpful to practise in their own environment, and online delivery makes it easy for teams in different locations to take part."
  },
  {
    id: 6,
    question: "How do I arrange a programme for my workplace or school?",
    answer: "Get in touch with a short outline of your organisation and what you'd like to achieve. I'll arrange a call to discuss your needs and then send a tailored proposal."
  }
]

export default function ServicesFAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="relative py-24 md:py-32 bg-pure-light">
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
    </section>
  )
}
