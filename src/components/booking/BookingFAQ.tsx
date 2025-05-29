'use client'

import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: "How do online sessions work?",
    answer: "Sessions are conducted via secure video call using Digital Samba. You'll receive a session link 24 hours before your appointment along with preparation guidelines. All you need is a quiet space and stable internet connection."
  },
  {
    id: 2,
    question: "What if I need to reschedule my session?",
    answer: "You can reschedule up to 24 hours before your session at no charge. For package clients, sessions are valid for 6 months, providing maximum flexibility for your schedule."
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "I accept payments through Revolut and PayPal, both supporting major credit cards and bank transfers globally. Payment is processed securely during booking with instant confirmation."
  },
  {
    id: 4,
    question: "Do I need any special equipment or preparation?",
    answer: "No special equipment needed! Just a quiet, comfortable space where you won't be interrupted. I'll send preparation guidelines 24 hours before your session to help you get the most from our time together."
  },
  {
    id: 5,
    question: "What if I'm a complete beginner to meditation?",
    answer: "Perfect! Most of my clients are beginners, and my approach is specifically designed to be accessible. I'll guide you through everything step-by-step with techniques chosen specifically for your learning style."
  },
  {
    id: 6,
    question: "How is the 6-session package structured?",
    answer: "The package provides progressive development over 6 sessions, typically spaced 1-2 weeks apart. Each session builds on the previous one, with ongoing support between sessions. You have 6 months to complete all sessions."
  }
]

export default function BookingFAQ() {
  const [activeId, setActiveId] = useState<number | null>(null)
  
  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id)
  }
  
  return (
    <section className="py-16 px-4 bg-pure-light">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-4">
            Booking Questions
          </h2>
          
          <p className="text-medium-text max-w-2xl mx-auto">
            Everything you need to know about scheduling and preparing for your session.
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
