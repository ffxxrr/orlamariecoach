'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowFlow, SeedBullet } from '@/components/brand/CelticIcons'
import CelticDivider from '@/components/ui/CelticDivider'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'
import CourseJourneyModal from '@/components/ui/CourseJourneyModal'

const courses = [
  {
    title: 'The Dark Half',
    subtitle: 'Inner Foundations',
    description: 'Just as the land withdraws into stillness to prepare for renewal, this course invites you to turn inward. Learn to quiet the noise, release old burdens like the fires of the Winter Woods, and build a structural framework for grounding before you attempt to grow.',
    price: '€250',
    features: [
      'Station 1–4: Stillness, breath, and body awareness',
      'Station 5–6: Forgiveness and releasing practices',
      'Station 7–8: Inner child work and self-compassion',
      'Lifetime access to guided meditations',
    ],
    level: 'Beginner',
    duration: '8 stations',
    nextStart: 'Samhain (November)',
    image: '/images/courses/optimized/dark-half-potrait.webp',
    journeyMap: '/images/courses/optimized/dark-half-landscape.webp',
    phase: 'dark' as const,
  },
  {
    title: 'The Bright Half',
    subtitle: 'Solar Alignment',
    description: 'Align your practice with the energy of the Sun Palace. This course focuses on outward resilience, positive intentionality, and standing tall like the stones of Beltany—aloof, imposing, and profoundly spiritual—against the winds of daily life.',
    price: '€250',
    features: [
      'Station 1–2: Grounding in the present moment',
      'Station 3–4: Positive intentionality practices',
      'Station 5–6: Manifestation and expansion',
      'Advanced meditation resources and materials',
    ],
    level: 'Intermediate',
    duration: '6 stations',
    nextStart: 'Bealtaine (May)',
    image: '/images/courses/optimized/bright-half-potrait.webp',
    journeyMap: '/images/courses/optimized/bright-half-landscape.webp',
    phase: 'bright' as const,
  },
  {
    title: 'The Turas',
    subtitle: 'Daily Pilgrimage',
    description: 'A guided pilgrimage of the mind where you circle the stations of your own heart. Like pilgrims leaving clooties at the Holy Wells of Donegal, learn to deposit your emotional burdens and watch them dissolve over time.',
    price: '€250',
    features: [
      'Apply stillness to everyday challenges',
      'Mindfulness for relationships and communication',
      'Build your inner fortress of resilience',
      'Personalised integration strategy',
    ],
    level: 'All Levels',
    duration: '6 stations',
    nextStart: 'Rolling enrolment',
    image: '/images/courses/optimized/turas-portrait.webp',
    journeyMap: '/images/courses/optimized/turas-landscape.webp',
    phase: 'integration' as const,
  },
]

interface CourseCardProps {
  course: typeof courses[0]
  index: number
  reverse: boolean
  isLast?: boolean
}

// Phase-based background colors
const phaseBackgrounds = {
  dark: 'bg-gradient-to-br from-[#1a2f2a]/5 via-pure-light to-[#2d4a44]/5', // Cool forest greens
  bright: 'bg-gradient-to-br from-[#f5e6d3]/40 via-pure-light to-earth-warmth/20', // Warm ambers
  integration: 'bg-pure-light', // Neutral
}

function CourseCard({ course, index, reverse, isLast }: CourseCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const { trackCourseInteraction } = useEventTracker()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewJourney = () => {
    setIsModalOpen(true)
    trackCourseInteraction('journey_map_viewed', {
      courseName: course.title,
      source: 'courses_list'
    })
  }

  return (
    <div
      ref={ref}
      className={`relative min-h-[70vh] md:min-h-[80vh] flex items-center ${phaseBackgrounds[course.phase]}`}
    >
      {/* Divider between courses (not after the last one) */}
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
            {/* Image container */}
            <div className="relative aspect-[9/16]">
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Phase Badge - stays on image */}
                <div className={`absolute bottom-6 left-6 backdrop-blur-sm px-4 py-2 rounded-full ${
                  course.phase === 'dark' ? 'bg-[#1a2f2a]/90' :
                  course.phase === 'bright' ? 'bg-[#8B6914]/90' :
                  'bg-forest-deep/90'
                }`}>
                  <span className="text-white text-sm">{course.level}</span>
                </div>
              </div>
              {/* Decorative frame offset - alternates direction */}
              <div className={`absolute inset-0 border-2 border-living-green/20 rounded-2xl -z-10 ${
                reverse ? 'translate-y-3 -translate-x-3' : 'translate-y-3 translate-x-3'
              }`} />
            </div>

            {/* Price and View Journey - below image */}
            <div className="flex items-center justify-between mt-4 px-1">
              <span className="font-crimson text-2xl text-forest-deep font-medium">{course.price}</span>
              <button
                onClick={handleViewJourney}
                className="flex items-center gap-2 text-living-green hover:text-forest-deep transition-colors group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:scale-110 transition-transform"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                <span className="text-sm font-medium">View Journey</span>
              </button>
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
              <ArrowFlow size={72} className="transform group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Journey Map Modal */}
      <CourseJourneyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={course.journeyMap}
        title={course.title}
        subtitle={course.subtitle}
      />
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
