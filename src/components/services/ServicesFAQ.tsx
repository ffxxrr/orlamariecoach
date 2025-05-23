'use client'

import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: "What is The OM Method approach?",
    answer: "The OM Method is a personalised approach to mindfulness that combines traditional meditation techniques with practical applications for modern life. It focuses on three core elements: Observe (developing non-judgmental awareness), Mindfulness (cultivating present-moment attention), and Meaning (connecting practice to your values). This method is designed to make meditation accessible and relevant to your unique circumstances."
  },
  {
    id: 2,
    question: "I've never meditated before. Is this suitable for beginners?",
    answer: "Absolutely! The OM Method Foundation Course is specifically designed to welcome beginners and guide you step by step. One-to-one sessions are also excellent for beginners as they provide personalised guidance tailored to your experience level. No prior knowledge or experience is necessary—just an open mind and willingness to learn."
  },
  {
    id: 3,
    question: "How often should I attend sessions to see results?",
    answer: "For one-to-one sessions, most clients begin with weekly sessions for 4-6 weeks to establish a strong foundation, then transition to fortnightly or monthly sessions. The Foundation Course runs weekly for 8 weeks. Consistency is key with mindfulness practice—regular short practices are more effective than occasional long ones. You'll likely notice subtle benefits after just a few sessions, with more significant shifts emerging over 4-8 weeks of regular practice."
  },
  {
    id: 4,
    question: "Are online sessions as effective as in-person?",
    answer: "Yes, The OM Method works wonderfully in both formats. Online sessions offer convenience and accessibility while maintaining the personal connection essential for effective guidance. All online sessions use high-quality audio to ensure clear instruction, and pre-session guidance helps you create an optimal environment at home. Many clients actually prefer online sessions as they learn to practice in their everyday environment."
  },
  {
    id: 5,
    question: "What's the difference between mindfulness and meditation?",
    answer: "Meditation refers to formal practices where you set aside time to train your attention, while mindfulness is the quality of awareness you develop through these practices. Think of meditation as the gym workout, and mindfulness as the fitness you develop. The OM Method teaches formal meditation techniques as well as ways to bring mindful awareness into your daily activities, giving you a comprehensive approach to both practices."
  },
  {
    id: 6,
    question: "Do you offer gift certificates?",
    answer: "Yes! OM Method gift certificates are available for both one-to-one sessions and courses. They make thoughtful presents for birthdays, anniversaries, or anyone going through a challenging time. Each certificate is personalised and valid for 12 months. Contact me directly to arrange a gift certificate with a personal message for your recipient."
  }
]

export default function ServicesFAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  
  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id)
  }
  
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pure-light to-light-border relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-living-green/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage-calm/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-4xl mx-auto">
        <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="w-20 h-1 bg-forest-deep/20 mx-auto mb-12"></div>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id}
              className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
              >
                <span className="font-medium text-forest-deep">{faq.question}</span>
                <span className="text-forest-deep text-xl">
                  {openId === faq.id ? '−' : '+'}
                </span>
              </button>
              
              {openId === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-medium-text">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-medium-text">
            Have more questions? Feel free to <a href="/contact" className="text-forest-deep underline">contact me</a> and I'll be happy to help.
          </p>
        </div>
      </div>
    </section>
  )
}
