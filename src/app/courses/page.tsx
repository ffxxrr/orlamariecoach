'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import CoursesHero from '@/components/courses/CoursesHero'
import CoursesList from '@/components/courses/CoursesList'
import CoursesTestimonials from '@/components/courses/CoursesTestimonials'
import CoursesFAQ from '@/components/courses/CoursesFAQ'
import CoursesCTA from '@/components/courses/CoursesCTA'
// Analytics handled by AnalyticsProvider
import { useEffect } from 'react'

// Metadata is handled by layout.tsx for client components

export default function CoursesPage() {
  // Page view tracking handled by AnalyticsProvider

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
