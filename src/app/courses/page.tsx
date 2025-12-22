import CoursesHero from '@/components/courses/CoursesHero'
import CoursesList from '@/components/courses/CoursesList'
import CoursesTestimonials from '@/components/courses/CoursesTestimonials'
import CoursesFAQ from '@/components/courses/CoursesFAQ'
import CoursesCTA from '@/components/courses/CoursesCTA'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Mindfulness Courses | Orla Marie Meditation Coach',
  description: 'Join structured mindfulness courses including Foundations for beginners, Deepening for advanced practitioners, and Daily Life integration. Online courses with live sessions.',
}

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero - Full bleed immersive */}
        <CoursesHero />

        {/* Courses - Full width alternating bands */}
        <CoursesList />

        {/* Testimonial - Large quote */}
        <CoursesTestimonials />

        {/* FAQ - Clean accordion */}
        <CoursesFAQ />

        {/* Soft CTA */}
        <CoursesCTA />
      </main>
      <Footer />
    </>
  )
}
