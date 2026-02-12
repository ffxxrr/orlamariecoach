'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowFlow, SeedBullet } from '@/components/brand/CelticIcons'
import CelticDivider from '@/components/ui/CelticDivider'
import { FEATURES } from '@/lib/features'

const services = [
  {
    title: 'Anam Chara Guidance',
    subtitle: 'Your Soul Friend',
    description: 'In a world of disconnected algorithms, I offer the ancient Irish tradition of the Anam Chara—your "Soul Friend." Together we walk the threshold between your daily life and your deeper spirit, releasing what no longer serves you like waters dissolving burdens at a holy well.',
    price: '€100',
    priceNote: 'per session',
    features: [
      '60-minute one-to-one session',
      'Human-guided, not algorithm-driven',
      'Purification and release practices',
      'Ongoing support between sessions',
    ],
    image: '/images/orla/optimized/about/orla-green-door.webp',
    href: FEATURES.courses ? '/book-session' : '/contact',
    cta: FEATURES.courses ? 'Book a Session' : 'Get in Touch',
  },
  {
    title: 'The Celtic Wheel',
    subtitle: 'Seasonal Rhythms',
    description: 'Journey through an 8-week programme aligned with the ancient Irish seasonal wheel. Move through the Dark Half—a time of inward reflection and mending—toward the Bright Half of outward growth and renewal, synchronising your inner life with the rhythms of the natural world.',
    price: '€250',
    priceNote: 'per course',
    features: [
      '8 weekly group sessions (90 minutes)',
      'Dark Half: forgiveness, inner child work',
      'Bright Half: intentionality, manifestation',
      'Private community of fellow travellers',
    ],
    image: '/images/orla/optimized/about/orla-celtic-wheel-v2.webp',
    href: FEATURES.courses ? '/courses' : '/contact',
    cta: FEATURES.courses ? 'Explore Courses' : 'Learn More',
  },
  {
    title: 'Organisational Resilience',
    subtitle: 'Workplace Grounding',
    description: 'Like the ancient cashels that sheltered communities for millennia, build structural resilience within your organisation. Customised programmes that help your team find the stillness at the centre of the storm.',
    price: 'Custom',
    priceNote: 'pricing',
    features: [
      'Tailored to your organisation',
      'Grounding practices for busy teams',
      'Progress measurement and reporting',
      'Flexible delivery (in-person/online)',
    ],
    image: '/images/orla/optimized/service/office-plants.webp',
    href: '/contact',
    cta: 'Get in Touch',
  },
]

interface Service {
  title: string
  subtitle: string
  description: string
  price: string
  priceNote: string
  features: string[]
  image: string
  imagePosition?: string
  href: string
  cta: string
}

interface ServicePathProps {
  service: Service
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
          {/* Image with decorative frame */}
          <div
            className={`relative ${
              reverse ? 'md:col-start-2' : ''
            } ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            } transition-all duration-1000 ease-out`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative aspect-[4/5] md:aspect-square">
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: service.imagePosition || 'center' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {/* Price Badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="font-crimson text-xl text-forest-deep font-medium">{service.price}</span>
                  <span className="text-sage-calm text-sm ml-1">{service.priceNote}</span>
                </div>
              </div>
              {/* Decorative frame offset - alternates direction */}
              <div className={`absolute inset-0 border-2 border-living-green/20 rounded-2xl -z-10 ${
                reverse ? 'translate-y-3 -translate-x-3' : 'translate-y-3 translate-x-3'
              }`} />
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
