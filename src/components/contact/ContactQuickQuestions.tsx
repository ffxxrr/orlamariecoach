'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

const questionCategories = [
  {
    id: 1,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Getting Started with Meditation",
    description: "Perfect for complete beginners who want to understand the basics and find the right approach for their lifestyle.",
    questions: [
      "I've never meditated before - where do I start?",
      "How much time do I need to practice daily?",
      "What if I can't stop my mind from racing?",
      "Which technique would work best for me?"
    ],
    linkText: "Ask About Starting"
  },
  {
    id: 2,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Course Recommendations",
    description: "Get personalised advice on which online course would be the perfect fit for your experience level and goals.",
    questions: [
      "Which course is right for my experience level?",
      "What's included in the courses?",
      "Can I switch between courses?",
      "Do you offer payment plans?"
    ],
    linkText: "Course Guidance"
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Deepening Your Practice",
    description: "For those with some meditation experience who want to take their practice to the next level with personalised guidance.",
    questions: [
      "How can I deepen my existing practice?",
      "I'm stuck in my meditation - what next?",
      "Can you help me with specific challenges?",
      "How do I integrate Celtic spirituality?"
    ],
    linkText: "Deepen Practice"
  },
  {
    id: 4,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Workplace & Stress Management",
    description: "Practical meditation solutions for busy professionals dealing with stress, focus issues, and work-life balance.",
    questions: [
      "How can meditation help with work stress?",
      "I'm too busy - can meditation still work?",
      "Quick techniques for stressful moments?",
      "Building a sustainable practice with a busy schedule?"
    ],
    linkText: "Workplace Solutions"
  }
]

export default function ContactQuickQuestions() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section className="py-16 px-4 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`font-crimson text-3xl md:text-4xl text-forest-deep mb-4 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
          >
            What Can I Help You With?
          </h2>

          <p
            className={`text-medium-text max-w-2xl mx-auto ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '100ms' }}
          >
            I love answering questions about meditation and helping people find their perfect path to inner peace.
            Here are some common areas where I provide guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {questionCategories.map((category, index) => (
            <div
              key={category.id}
              className={`bg-pure-light rounded-xl p-6 border border-living-green/10 shadow-sm
                         hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + index * 75}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-sage-calm to-living-green rounded-full
                              flex items-center justify-center text-white mb-4 mx-auto">
                {category.icon}
              </div>

              <h3 className="font-crimson text-xl text-forest-deep mb-3 text-center">
                {category.title}
              </h3>

              <p className="text-medium-text mb-4 text-center">
                {category.description}
              </p>

              <div className="bg-white/70 rounded-lg p-4 mb-6 flex-grow">
                <h4 className="text-forest-deep font-medium text-sm mb-2">Common Questions:</h4>
                <ul className="space-y-1">
                  {category.questions.map((question, qIndex) => (
                    <li key={qIndex} className="flex items-start gap-2 text-medium-text text-sm">
                      <span className="text-living-green mt-1">•</span>
                      <span>"{question}"</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="#contact-form"
                className="btn btn-secondary text-center self-center"
              >
                {category.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
