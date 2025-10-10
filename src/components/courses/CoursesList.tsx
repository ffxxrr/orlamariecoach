'use client'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'

const courses = [
  {
    id: 1,
    title: "OM Method Foundations",
    subtitle: "8-Week Mindfulness Course",
    description: "A comprehensive introduction to mindfulness meditation designed for beginners. This course provides a structured path to establishing a sustainable practice using The OM Method approach.",
    price: "€250",
    features: [
      "8 weekly live group sessions (90 minutes each)",
      "Progressive guided meditations for daily practice",
      "Comprehensive workbook and practice materials",
      "Personalised feedback and guidance",
      "Lifetime access to course recordings",
      "Private community support group"
    ],
    level: "Beginner",
    duration: "8 weeks",
    format: "Online Live + Recordings",
    nextStart: "June 10, 2025",
    image: "/images/content/courses/foundations.webp",
    icon: "🌱"
  },
  {
    id: 2,
    title: "OM Method Deepening",
    subtitle: "Advanced Meditation Course",
    description: "For those with an established practice seeking to explore deeper aspects of meditation. This course builds on foundational skills to develop subtler awareness and insight.",
    price: "€250",
    features: [
      "6 weekly live sessions (2 hours each)",
      "Advanced meditation techniques and practices",
      "Exploration of subtle mind states and insight",
      "Personal guidance on deepening your practice",
      "Intensive practice periods with support",
      "Advanced meditation resources and materials"
    ],
    level: "Intermediate/Advanced",
    duration: "6 weeks",
    format: "Online Live + Recordings",
    nextStart: "July 15, 2025",
    image: "/images/content/courses/deepening.webp",
    icon: "🌿"
  },
  {
    id: 3,
    title: "OM Method in Daily Life",
    subtitle: "Practical Mindfulness Integration",
    description: "Learn to apply mindfulness to everyday challenges and relationships. This course focuses on the practical application of meditation insights to enhance all aspects of your life.",
    price: "€250",
    features: [
      "6 weekly live sessions (90 minutes each)",
      "Real-life application exercises and practices",
      "Mindfulness for relationships and communication",
      "Stress response tools and emotional resilience",
      "Personalised integration strategy development",
      "Ongoing implementation support"
    ],
    level: "All Levels",
    duration: "6 weeks",
    format: "Online Live + Recordings",
    nextStart: "August 5, 2025",
    image: "/images/content/courses/daily-life.webp",
    icon: "🍃"
  }
]

export default function CoursesList() {
  const { trackCourseInteraction } = useEventTracker()

  const handleCourseView = (course: any) => {
    trackCourseInteraction('view', {
      courseId: course.id.toString(),
      courseName: course.title,
      coursePrice: parseInt(course.price.replace('€', '')),
      courseLevel: course.level,
      source: 'courses_page_list'
    })
  }

  const handleCourseEnquiry = (course: any, action: string) => {
    trackCourseInteraction('enquiry', {
      courseId: course.id.toString(),
      courseName: course.title,
      coursePrice: parseInt(course.price.replace('€', '')),
      action,
      source: 'courses_page_list'
    })
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-16">
          {courses.map((course) => (
            <div 
              key={course.id}
              onMouseEnter={() => handleCourseView(course)}
              className="bg-pure-light rounded-2xl overflow-hidden shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-full">
                  <ImagePlaceholder 
                    text={course.title}
                    icon={course.icon || undefined}
                    aspectRatio="h-full"
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4 fade-in-up">
                    <div>
                      <h2 className="font-crimson text-2xl md:text-3xl text-forest-deep">
                        {course.title}
                      </h2>
                      <p className="text-medium-text">{course.subtitle}</p>
                    </div>
                    <div className="bg-forest-deep text-white px-4 py-2 rounded-full text-lg font-medium">
                      {course.price}
                    </div>
                  </div>
                  
                  <p className="text-medium-text mb-6 fade-in-up">
                    {course.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 fade-in-up">
                    <div className="flex items-center gap-2">
                      <span className="text-forest-deep">⚡</span>
                      <span className="text-medium-text text-sm">Level: {course.level}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-forest-deep">⏱️</span>
                      <span className="text-medium-text text-sm">Duration: {course.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-forest-deep">🌐</span>
                      <span className="text-medium-text text-sm">Format: {course.format}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-forest-deep">📅</span>
                      <span className="text-medium-text text-sm">Next: {course.nextStart}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-forest-deep font-medium mb-2">Course Includes:</h3>
                    <ul className="space-y-2">
                      {course.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-medium-text">
                          <span className="text-forest-deep">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href={`/courses/${course.id}`} onClick={() => handleCourseEnquiry(course, 'details_clicked')}>
                      <Button variant="primary">Course Details</Button>
                    </Link>
                    <Link href="/book-session" onClick={() => handleCourseEnquiry(course, 'enroll_clicked')}>
                      <Button variant="secondary">Enroll Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
