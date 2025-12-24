'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import {
  EmailIcon,
  ClockIcon,
  LocationIcon,
  CalendarIcon,
} from '@/components/brand/CelticIcons'

const contactInfo = [
  {
    id: 1,
    icon: <EmailIcon size={24} />,
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
    icon: <ClockIcon size={24} />,
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
    icon: <LocationIcon size={24} />,
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
    icon: <CalendarIcon size={24} />,
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
    <section className="py-24 md:py-32 px-6 bg-white">
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
