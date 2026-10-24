'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowFlow } from '@/components/brand/CelticIcons'
import CelticDivider from '@/components/ui/CelticDivider'

interface PathProps {
  title: string
  subtitle: string
  description: string
  image: string
  imagePosition?: string
  href: string
  cta: string
  reverse?: boolean
  index: number
  isLast?: boolean
}

function Path({ title, subtitle, description, image, imagePosition, href, cta, reverse, index, isLast }: PathProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`relative py-20 md:py-28 ${
        index % 2 === 0 ? 'bg-pure-light' : 'bg-living-green/20'
      }`}
    >
      {/* Divider between paths (not after the last one) */}
      {!isLast && <CelticDivider position="bottom" />}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`grid md:grid-cols-2 gap-12 lg:gap-16 items-center ${
          reverse ? 'md:grid-flow-dense' : ''
        }`}>
          {/* Image with decorative frame */}
          <div
            className={`relative ${reverse ? 'md:col-start-2' : ''} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            } transition-all duration-1000 ease-out`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] max-h-[500px] md:max-h-[550px]">
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: imagePosition || 'center' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle overlay gradient */}
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
              className={`text-lg md:text-xl uppercase tracking-[0.15em] text-living-green mb-4 font-medium ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '100ms' }}
            >
              {subtitle}
            </p>

            {/* Title */}
            <h2
              className={`font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep mb-6 leading-tight ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '200ms' }}
            >
              {title}
            </h2>

            {/* Description */}
            <p
              className={`text-lg text-sage-calm leading-relaxed mb-8 max-w-lg ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '300ms' }}
            >
              {description}
            </p>

            {/* CTA Link */}
            <Link
              href={href}
              className={`inline-flex items-center gap-3 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '400ms' }}
            >
              <span className="text-forest-deep font-medium uppercase tracking-wider text-sm">
                {cta}
              </span>
              <ArrowFlow size={72} className="transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ThreePaths() {
  const paths = [
    {
      title: 'One-to-One Mindfulness',
      subtitle: 'For Individuals',
      description: 'A structured, personal programme tailored to your needs and pace. Learn core mindfulness meditation practices and practical ways to bring them into daily life, whether you\'re managing stress, looking for better focus or simply wanting to begin.',
      image: '/images/orla/optimized/about/7R500325.webp',
      href: '/services',
      cta: 'Find Out More',
    },
    {
      title: 'Workplace Mindfulness',
      subtitle: 'For Organisations',
      description: 'Programmes for teams and leaders that support wellbeing, focus and resilience at work. From introductory workshops to multi-week courses, delivered on-site or online and tailored to your organisation.',
      image: '/images/orla/optimized/service/office-plants.webp',
      href: '/services',
      cta: 'Find Out More',
    },
    {
      title: 'Mindfulness in Schools',
      subtitle: 'For Education',
      description: 'Age-appropriate mindfulness for pupils, and wellbeing programmes for teachers and staff. Practical skills for attention, calm and emotional awareness that fit into the school day.',
      image: '/images/orla/orla-read.jpeg',
      href: '/services',
      cta: 'Find Out More',
    },
  ]

  return (
    <section>
      {paths.map((path, index) => (
        <Path
          key={path.title}
          {...path}
          reverse={index % 2 === 1}
          index={index}
          isLast={index === paths.length - 1}
        />
      ))}
    </section>
  )
}
