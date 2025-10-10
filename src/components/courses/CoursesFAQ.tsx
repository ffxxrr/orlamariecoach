'use client'

import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: "Do I need any previous meditation experience for these courses?",
    answer: "Not at all for the OM Method Foundations course, which is specifically designed for beginners. The Daily Life course is suitable for all levels, while the Deepening course is better suited for those with some previous meditation experience. Each course clearly indicates the recommended experience level."
  },
  {
    id: 2,
    question: "How are the online courses structured?",
    answer: "All courses include weekly live sessions conducted via Zoom, guided meditation recordings for daily practice, comprehensive course materials, and access to a private community group. The live sessions combine teaching, guided practice, Q&A, and group discussion. All live sessions are recorded for those who cannot attend in real-time."
  },
  {
    id: 3,
    question: "What if I miss a live session?",
    answer: "No problem! All live sessions are recorded and made available within 24 hours. You can watch the recording, complete the practices, and post any questions in the community group. Many students successfully complete courses by using the recordings exclusively due to time zone differences or scheduling conflicts."
  },
  {
    id: 4,
    question: "How much time should I commit to practice between sessions?",
    answer: "For optimal results, we recommend 15-30 minutes of daily practice using the guided meditations provided. However, even 5-10 minutes daily is beneficial. The courses emphasize quality and consistency over duration, and include strategies for establishing a sustainable practice that fits your lifestyle."
  },
  {
    id: 5,
    question: "Is there a payment plan available?",
    answer: "Yes, all courses offer the option to pay in three monthly installments instead of the full amount upfront. This option is available during the checkout process. There's no additional fee for choosing the payment plan."
  },
  {
    id: 6,
    question: "What happens after I complete a course?",
    answer: "After completing any course, you'll retain lifetime access to all course materials and recordings. Graduates are also invited to join our alumni community for ongoing support. Many students choose to progress through the course sequence, moving from Foundations to Daily Life to Deepening, though each course can also be taken independently."
  }
]

export default function CoursesFAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  
  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id)
  }
  
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="w-20 h-1 bg-forest-deep/20 mx-auto mb-12"></div>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id}
              className="bg-pure-light rounded-lg shadow-sm overflow-hidden"
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
