import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Six-Week Mindfulness Course in Buncrana',
  description:
    'A structured six-week mindfulness course in Buncrana, Inishowen, on Tuesday evenings from 12 January 2027. Beginners welcome. Taught by accredited, trauma-informed mindfulness teacher Orla Marie.',
  alternates: { canonical: '/mindfulness-course' },
}

const DETAILS = [
  { label: 'When', value: 'Tuesdays, 12 January to 16 February 2027' },
  { label: 'Time', value: '7pm to 8.30pm' },
  { label: 'Where', value: 'Buncrana, Inishowen (venue confirmed when you book)' },
  { label: 'Price', value: '€150 for all six weeks' },
  { label: 'Group', value: 'Small group, places limited' },
]

const WEEKS = [
  { title: 'Arriving in the present moment', text: 'What mindfulness is, and how to begin with the breath.' },
  { title: 'Coming back to the body', text: 'The body scan, and noticing how stress shows up physically.' },
  { title: 'Working with thoughts', text: 'Seeing thoughts as thoughts, and stepping out of autopilot.' },
  { title: 'Understanding stress', text: 'How the stress response works, and practices that steady it.' },
  { title: 'Kindness towards yourself', text: 'Self-compassion and a gentler inner voice.' },
  { title: 'Mindfulness for everyday life', text: 'Building a practice that lasts beyond the course.' },
]

export default function MindfulnessCoursePage() {
  return (
    <>
      <Navbar />
      <main className="bg-pure-light">
        {/* Intro */}
        <section className="pt-36 pb-16 md:pt-44 md:pb-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-living-green mb-6">
                Six-Week Mindfulness Course &middot; Buncrana
              </p>
              <h1 className="font-crimson text-4xl sm:text-5xl md:text-6xl font-light text-forest-deep leading-[1.1] mb-8">
                A calm start
                <br />
                <span className="text-sage-calm">to the new year.</span>
              </h1>
              <p className="text-lg md:text-xl text-sage-calm leading-relaxed mb-8">
                A structured six-week mindfulness course for anyone who would like to feel less
                stressed, sleep better and meet life with a little more steadiness. Each week
                builds on the last, with guided home practice between sessions. Secular,
                evidence-based and trauma-informed. Complete beginners are very welcome.
              </p>
              <Link
                href="/contact?enquiry=mindfulness-course#contact-form"
                className="inline-flex items-center justify-center bg-forest-deep text-white px-8 py-4 rounded-full font-medium hover:bg-sage-calm transition-all duration-300 min-w-[220px]"
              >
                Book Your Place
              </Link>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/orla/optimized/about/7R500325.webp"
                alt="Orla Marie, accredited mindfulness teacher"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mindfulness course, not a meditation class */}
        <section className="pb-20 px-6">
          <div className="max-w-3xl mx-auto bg-white/70 border border-earth-warmth/40 rounded-2xl p-8 md:p-12">
            <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6">
              A mindfulness course, not a meditation class
            </h2>
            <p className="text-lg text-deep-text leading-relaxed mb-4">
              This is a training in mindfulness, and it goes further than my five-week meditation
              course. As well as guided meditation, each session includes teaching on how the mind
              and stress work, mindful movement, group reflection and practical tools to use in
              everyday life.
            </p>
            <p className="text-lg text-sage-calm leading-relaxed">
              Self-practice is at the heart of it. Between sessions you will practise at home each
              day with guided recordings and short exercises, so that mindfulness becomes a skill
              you can rely on long after the six weeks.
            </p>
          </div>
        </section>

        {/* Details */}
        <section className="py-20 px-6 bg-living-green/20">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep text-center mb-12">
              Course details
            </h2>
            <dl className="bg-white/70 rounded-2xl p-8 md:p-10 divide-y divide-earth-warmth/30">
              {DETAILS.map((d) => (
                <div key={d.label} className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-6">
                  <dt className="text-sm uppercase tracking-wider text-living-green font-medium pt-1">{d.label}</dt>
                  <dd className="sm:col-span-2 text-lg text-deep-text">{d.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sage-calm text-center mt-8">
              Includes guided recordings and weekly home practice to support you between sessions.
            </p>
          </div>
        </section>

        {/* Weeks */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep text-center mb-12">
              The six weeks
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WEEKS.map((w, i) => (
                <div key={w.title} className="bg-white/70 border border-earth-warmth/40 rounded-2xl p-8">
                  <p className="text-sm uppercase tracking-[0.2em] text-living-green mb-3">Week {i + 1}</p>
                  <h3 className="font-crimson text-2xl text-forest-deep mb-3">{w.title}</h3>
                  <p className="text-sage-calm leading-relaxed">{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section className="py-20 px-6 bg-living-green/20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6">How to book</h2>
            <p className="text-lg text-sage-calm leading-relaxed mb-4">
              Send me a message using the form and I will reply with payment details. Your place is
              confirmed once payment is received. Places are limited to keep the group small.
            </p>
            <p className="text-lg text-sage-calm leading-relaxed mb-10">
              Looking for a gift? A{' '}
              <Link href="/gift-vouchers" className="text-forest-deep underline hover:no-underline">
                gift voucher
              </Link>{' '}
              can be used for a place on this course.
            </p>
            <Link
              href="/contact?enquiry=mindfulness-course#contact-form"
              className="inline-flex items-center justify-center bg-forest-deep text-white px-8 py-4 rounded-full font-medium hover:bg-sage-calm transition-all duration-300 min-w-[220px]"
            >
              Book Your Place
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
