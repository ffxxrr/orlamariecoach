'use client'

import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: "How quickly will I hear back from you?",
    answer: "I personally read and respond to every message within 24 hours, often much sooner. You'll receive a thoughtful, personalised response addressing your specific questions and situation."
  },
  {
    id: 2,
    question: "What if I'm not sure which course or approach is right for me?",
    answer: "That's exactly what I'm here to help with! Tell me about your situation, experience level, and goals, and I'll provide personalised recommendations for the best path forward."
  },
  {
    id: 3,
    question: "Do you offer free consultations before booking a session?",
    answer: "While I don't offer formal consultations, I'm always happy to answer questions via email to help you determine if my approach would be a good fit before you book a session."
  },
  {
    id: 4,
    question: "Can you help me even if I'm a complete beginner?",
    answer: "Absolutely! I love working with complete beginners. My approach is gentle, practical, and designed to meet you exactly where you are in your journey, with no experience required."
  },
  {
    id: 5,
    question: "What makes your approach different from meditation apps?",
    answer: "Unlike apps, you get personalised guidance based on your unique situation, Celtic spiritual integration, and the ability to ask questions and receive individual support. It's real mentorship, not just content."
  }
]

export default function ContactFAQ() {
  const [activeId, setActiveId] = useState<number | null>(null)
  
  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id)
  }
  
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pure-light to-light-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-4">
            Quick Answers
          </h2>
          
          <p className="text-medium-text max-w-2xl mx-auto">
            Common questions about getting in touch and what to expect.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-living-green/10"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                aria-expanded={activeId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium text-forest-deep">{faq.question}</span>
                <span className="text-forest-deep text-xl">
                  {activeId === faq.id ? '−' : '+'}
                </span>
              </button>
              
              {activeId === faq.id && (
                <div 
                  id={`faq-answer-${faq.id}`}
                  className="px-6 pb-4 text-medium-text"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
