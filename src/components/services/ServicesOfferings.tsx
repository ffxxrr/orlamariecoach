'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowFlow, SeedBullet } from '@/components/brand/CelticIcons'
import CelticDivider from '@/components/ui/CelticDivider'

const services = [
  {
    title: 'One-to-One Sessions',
    subtitle: 'Personal Guidance',
    description: 'Bespoke meditation sessions tailored entirely to your needs, your pace, your life. Whether you\'re seeking relief from anxiety, deeper self-awareness, or simply a moment of peace in a busy world.',
    price: '€100',
    priceNote: 'per session',
    features: [
      '60-minute personalised coaching',
      'Customised meditation techniques',
      'Progress tracking and adjustments',
      'Email support between sessions',
    ],
    image: '/images/orla/optimized/service/7R500130.webp',
    href: '/book-session',
    cta: 'Book a Session',
  },
  {
    title: 'Mindfulness Foundation Course',
    subtitle: 'Structured Learning',
    description: 'Journey through a comprehensive 8-week programme designed to build lasting practice. From foundations for beginners to deepening work for experienced practitioners.',
    price: '€250',
    priceNote: 'per course',
    features: [
      '8 weekly group sessions (90 minutes)',
      'Guided meditations for daily practice',
      'Course materials and recordings',
      'Private community support',
    ],
    image: '/images/orla/optimized/service/7R500406.webp',
    href: '/courses',
    cta: 'Explore Courses',
  },
  {
    title: 'Corporate Programmes',
    subtitle: 'Workplace Wellbeing',
    description: 'Bring mindfulness to your organisation with customised programmes designed to reduce stress, enhance focus, and improve wellbeing across your team.',
    price: 'Custom',
    priceNote: 'pricing',
    features: [
      'Tailored to your organisation',
      'Flexible delivery (in-person/online)',
      'Progress measurement and reporting',
      'Integration with existing initiatives',
    ],
    image: '/images/orla/optimized/service/7R500362.webp',
    href: '/contact',
    cta: 'Get in Touch',
  },
]

interface ServicePathProps {
  service: typeof services[0]
  reverse: boolean
  index: number
  isLast?: boolean
}

function ServicePath({ service, reverse, index, isLast }: ServicePathProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`relative min-h-[70vh] md:min-h-[80vh] flex items-center ${
        index % 2 === 0 ? 'bg-pure-light' : 'bg-living-green/20'
      }`}
    >
      {/* Divider between paths (not after the last one) */}
      {!isLast && <CelticDivider position="bottom" />}

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${
          reverse ? 'md:grid-flow-dense' : ''
        }`}>
          {/* Image */}
          <div
            className={`relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl ${
              reverse ? 'md:col-start-2' : ''
            } ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            } transition-all duration-1000 ease-out`}
            style={{ transitionDelay: '200ms' }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Price Badge */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-crimson text-xl text-forest-deep font-medium">{service.price}</span>
              <span className="text-sage-calm text-sm ml-1">{service.priceNote}</span>
            </div>
          </div>

          {/* Content */}
          <div className={`${reverse ? 'md:col-start-1 md:row-start-1' : ''}`}>
            {/* Subtitle */}
            <p
              className={`text-sm uppercase tracking-[0.2em] text-living-green mb-4 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '100ms' }}
            >
              {service.subtitle}
            </p>

            {/* Title */}
            <h2
              className={`font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep mb-6 leading-tight ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '200ms' }}
            >
              {service.title}
            </h2>

            {/* Description */}
            <p
              className={`text-lg text-sage-calm leading-relaxed mb-8 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '300ms' }}
            >
              {service.description}
            </p>

            {/* Features */}
            <ul
              className={`space-y-3 mb-8 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '350ms' }}
            >
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <SeedBullet size={8} className="text-living-green flex-shrink-0 mt-2" />
                  <span className="text-sage-calm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Link */}
            <Link
              href={service.href}
              className={`inline-flex items-center gap-3 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '400ms' }}
            >
              <span className="text-forest-deep font-medium uppercase tracking-wider text-sm">
                {service.cta}
              </span>
              <ArrowFlow size={72} className="transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesOfferings() {
  return (
    <section>
      {services.map((service, index) => (
        <ServicePath
          key={service.title}
          service={service}
          reverse={index % 2 === 1}
          index={index}
          isLast={index === services.length - 1}
        />
      ))}
    </section>
  )
}
