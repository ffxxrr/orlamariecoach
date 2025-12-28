'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowFlow, SeedBullet } from '@/components/brand/CelticIcons'
import CelticDivider from '@/components/ui/CelticDivider'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'

const courses = [
  {
    title: 'Mindfulness Foundations',
    subtitle: '8-Week Beginner Course',
    description: 'A comprehensive introduction to mindfulness meditation designed for beginners. This course provides a structured path to establishing a sustainable practice with personalised guidance.',
    price: '€250',
    features: [
      '8 weekly live group sessions (90 minutes each)',
      'Progressive guided meditations for daily practice',
      'Comprehensive workbook and practice materials',
      'Lifetime access to course recordings',
    ],
    level: 'Beginner',
    duration: '8 weeks',
    nextStart: 'June 10, 2025',
    image: '/images/orla/optimized/service/7R500150.webp',
  },
  {
    title: 'Meditation Deepening',
    subtitle: 'Advanced Course',
    description: 'For those with an established practice seeking to explore deeper aspects of meditation. This course builds on foundational skills to develop subtler awareness and insight.',
    price: '€250',
    features: [
      '6 weekly live sessions (2 hours each)',
      'Advanced meditation techniques and practices',
      'Exploration of subtle mind states and insight',
      'Advanced meditation resources and materials',
    ],
    level: 'Intermediate/Advanced',
    duration: '6 weeks',
    nextStart: 'July 15, 2025',
    image: '/images/orla/optimized/service/7R500169.webp',
  },
  {
    title: 'Mindfulness in Daily Life',
    subtitle: 'Practical Integration',
    description: 'Learn to apply mindfulness to everyday challenges and relationships. This course focuses on the practical application of meditation insights to enhance all aspects of your life.',
    price: '€250',
    features: [
      '6 weekly live sessions (90 minutes each)',
      'Real-life application exercises and practices',
      'Mindfulness for relationships and communication',
      'Personalised integration strategy development',
    ],
    level: 'All Levels',
    duration: '6 weeks',
    nextStart: 'August 5, 2025',
    image: '/images/orla/optimized/service/7R500154.webp',
  },
]

interface CourseCardProps {
  course: typeof courses[0]
  index: number
  reverse: boolean
  isLast?: boolean
}

function CourseCard({ course, index, reverse, isLast }: CourseCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const { trackCourseInteraction } = useEventTracker()

  return (
    <div
      ref={ref}
      className={`relative min-h-[70vh] md:min-h-[80vh] flex items-center ${
        index % 2 === 0 ? 'bg-pure-light' : 'bg-living-green/20'
      }`}
    >
      {/* Divider between courses (not after the last one) */}
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
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Price Badge */}
            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="font-crimson text-xl text-forest-deep font-medium">{course.price}</span>
            </div>

            {/* Level Badge */}
            <div className="absolute bottom-6 left-6 bg-forest-deep/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white text-sm">{course.level}</span>
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
              {course.subtitle}
            </p>

            {/* Title */}
            <h2
              className={`font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep mb-6 leading-tight ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '200ms' }}
            >
              {course.title}
            </h2>

            {/* Description */}
            <p
              className={`text-lg text-sage-calm leading-relaxed mb-6 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '300ms' }}
            >
              {course.description}
            </p>

            {/* Course Details */}
            <div
              className={`flex flex-wrap gap-4 mb-6 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '320ms' }}
            >
              <div className="flex items-center gap-2">
                <SeedBullet size={6} className="text-living-green" />
                <span className="text-sage-calm text-sm">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <SeedBullet size={6} className="text-living-green" />
                <span className="text-sage-calm text-sm">Starts {course.nextStart}</span>
              </div>
            </div>

            {/* Features */}
            <ul
              className={`space-y-3 mb-8 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '350ms' }}
            >
              {course.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <SeedBullet size={8} className="text-living-green flex-shrink-0 mt-2" />
                  <span className="text-sage-calm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Link */}
            <Link
              href="/book-session"
              className={`inline-flex items-center gap-3 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } transition-all duration-700`}
              style={{ transitionDelay: '400ms' }}
              onClick={() => trackCourseInteraction('enroll_clicked', {
                courseName: course.title,
                coursePrice: course.price,
                courseLevel: course.level,
                courseDuration: course.duration,
                source: 'courses_list'
              })}
            >
              <span className="text-forest-deep font-medium uppercase tracking-wider text-sm">
                Enroll Now
              </span>
              <ArrowFlow size={32} className="text-forest-deep transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CoursesList() {
  return (
    <section>
      {courses.map((course, index) => (
        <CourseCard
          key={course.title}
          course={course}
          index={index}
          reverse={index % 2 === 1}
          isLast={index === courses.length - 1}
        />
      ))}
    </section>
  )
}
