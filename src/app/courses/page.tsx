'use client'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import CoursesHero from '@/components/courses/CoursesHero'
import CoursesList from '@/components/courses/CoursesList'
import CoursesTestimonials from '@/components/courses/CoursesTestimonials'
import CoursesFAQ from '@/components/courses/CoursesFAQ'
import CoursesCTA from '@/components/courses/CoursesCTA'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Divider from '@/components/ui/Divider'
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
        <Section padded>
          <Container>
            <CoursesHero />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <CoursesList />
          </Container>
        </Section>
        <Section padded={false}>
          <Container>
            <Divider className="my-2" />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <CoursesTestimonials />
          </Container>
        </Section>
        <Section padded={false}>
          <Container>
            <Divider className="my-2" />
          </Container>
        </Section>
        <Section padded className="bg-white/60">
          <Container>
            <CoursesFAQ />
          </Container>
        </Section>
        <Section padded>
          <Container>
            <CoursesCTA />
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
