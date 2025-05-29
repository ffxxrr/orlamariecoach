import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import CoursesHero from '@/components/courses/CoursesHero'
import CoursesList from '@/components/courses/CoursesList'
import CoursesTestimonials from '@/components/courses/CoursesTestimonials'
import CoursesFAQ from '@/components/courses/CoursesFAQ'
import CoursesCTA from '@/components/courses/CoursesCTA'

export const metadata = {
  title: 'Mindfulness Courses | Orla Marie Meditation Coach',
  description: 'Discover The OM Method mindfulness courses with personalised guidance from experienced meditation teacher Orla Marie. Online and in-person options available.',
}

export default function CoursesPage() {
  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <CoursesHero />
        <CoursesList />
        <CoursesTestimonials />
        <CoursesFAQ />
        <CoursesCTA />
      </main>
      <Footer />
    </>
  )
}
