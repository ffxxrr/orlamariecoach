'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

const contactInfo = [
  {
    id: 1,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Direct Email",
    content: (
      <>
        <a href="mailto:admin@orlamariecoach.com" className="text-forest-deep hover:underline">admin@orlamariecoach.com</a><br />
        Personal response within 24 hours
      </>
    )
  },
  {
    id: 2,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Response Time",
    content: (
      <>
        Typically respond within 12-24 hours<br />
        All messages answered personally by Orla
      </>
    )
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Based in Ireland",
    content: (
      <>
        Donegal, Ireland (GMT timezone)<br />
        Serving clients globally online
      </>
    )
  },
  {
    id: 4,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Ready to Start?",
    content: (
      <>
        <Link href="/book-session" className="text-forest-deep hover:underline">Book a personalised session</Link><br />
        Direct path to one-on-one guidance
      </>
    )
  }
]

export default function ContactInfo() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="py-16 px-4 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`font-crimson text-3xl md:text-4xl text-forest-deep mb-4 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
          >
            Other Ways to Connect
          </h2>

          <p
            className={`text-medium-text max-w-2xl mx-auto ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '100ms' }}
          >
            Multiple options to suit your communication preferences and needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={info.id}
              className={`bg-pure-light rounded-xl p-6 text-center shadow-sm border border-living-green/10
                         hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${150 + index * 75}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-sage-calm to-living-green rounded-full
                              flex items-center justify-center text-white mb-4 mx-auto">
                {info.icon}
              </div>

              <h3 className="font-crimson text-xl text-forest-deep mb-3">
                {info.title}
              </h3>

              <p className="text-medium-text">
                {info.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
