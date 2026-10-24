'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowFlow, SeedBullet } from '@/components/brand/CelticIcons'
import CelticDivider from '@/components/ui/CelticDivider'

const services = [
  {
    title: 'One-to-One Mindfulness',
    subtitle: 'For Individuals',
    description: 'A personal mindfulness programme built around your needs, pace and schedule. Over a series of sessions you\'ll learn core mindfulness meditation practices—breath, body and mindful movement—and practical ways to use them to manage stress and bring more calm and focus to daily life.',
    features: [
      'Individual sessions, in person or online',
      'Programme length tailored to you',
      'Guided recordings to support home practice',
      'Suitable for complete beginners',
      'Trauma-informed and gently paced',
    ],
    image: '/images/orla/optimized/about/orla-green-door.webp',
    href: '/contact',
    cta: 'Get in Touch',
  },
  {
    title: 'Mindfulness in Schools',
    subtitle: 'For Education',
    description: 'Age-appropriate mindfulness for primary and secondary pupils, alongside wellbeing programmes for teachers and school staff. Short, practical exercises that fit into the school day and help pupils, and the adults who support them, build attention, calm and emotional awareness.',
    features: [
      'Classroom sessions for pupils',
      'Wellbeing workshops and courses for staff',
      'Simple practices teachers can use in class',
      'Delivered in school or online',
      'Trauma-informed and age-appropriate',
    ],
    image: '/images/orla/optimized/service/orla-schools-classroom.webp',
    imagePosition: 'center 15%',
    href: '/contact',
    cta: 'Get in Touch',
  },
  {
    title: 'Workplace Mindfulness',
    subtitle: 'For Organisations',
    description: 'Evidence-based mindfulness programmes that support employee wellbeing, focus and resilience. From introductory workshops to multi-week courses for teams and leaders, each programme is tailored to your organisation and can sit within your wider wellbeing strategy.',
    features: [
      'Tailored to your organisation',
      'Workshops, courses and ongoing sessions',
      'For teams, managers and leaders',
      'Delivered on-site or online',
      'Trauma-informed and inclusive',
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
