import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Draft page for Orla to review on staging. Not linked from the menu or sitemap,
// and hidden on the live site until she approves it.
const isLiveSite = process.env.NEXT_PUBLIC_SITE_URL === 'https://orlamariecoach.com'

export const metadata = {
  title: 'Orla Marie OM Method Meditation Teacher Training',
  description:
    'A 12-week online meditation teacher training with Orla Marie: weekly live calls in a small group, about 100 hours, and a certificate on completion. First group starts September 2027.',
  robots: { index: false, follow: false },
}

const DETAILS = [
  { label: 'Starts', value: 'September 2027' },
  { label: 'Length', value: '12 weeks, about 100 hours' },
  { label: 'Format', value: 'Online: a weekly 2-hour live call with Orla, plus recorded lessons' },
  { label: 'Group', value: 'Up to 12 people' },
  { label: 'Price', value: '€1,250 founding price (about US $1,450). Payment plan available' },
  { label: 'Certificate', value: 'Certified Orla Marie OM Method Meditation Teacher' },
]

const WHY = [
  {
    title: 'A teacher, not a script',
    text: 'Thirty years of daily practice and ten years of teaching. You learn from lived experience, live, every week.',
  },
  {
    title: 'Safety at the heart',
    text: 'With an MA in Counselling, Orla teaches you when meditation helps, when it does not, and how to care for the people in front of you.',
  },
  {
    title: 'The Orla Marie OM Method',
    text: 'Traditional meditation made practical for real life, from five minutes between meetings to a full session, with grounding in nature throughout.',
  },
  {
    title: 'A small, real group',
    text: 'No more than twelve people. You practise teaching each other from week four, with Orla’s feedback.',
  },
]

const PARTS = [
  {
    name: 'Part one: Going inward',
    weeks: [
      ['Your own practice', 'Why you want to teach, and a daily practice to carry you through.'],
      ['Where meditation comes from', 'The great traditions, from the Bhagavad Gita to Christian contemplative prayer.'],
      ['Mind and body', 'Plain-language science: stress, the nervous system, breath and sleep.'],
    ],
  },
  {
    name: 'Part two: The practices',
    weeks: [
      ['Breath and body', 'Breath awareness, body scan and grounding. Your first practice-teaching.'],
      ['Mantra, sound and stillness', 'Mantra, sound meditation, silent sitting and the busy mind.'],
      ['Nature and visualisation', 'Guided journeys through woodland, mountain and sea.'],
    ],
  },
  {
    name: 'Part three: Guiding others',
    weeks: [
      ['The open heart', 'Loving-kindness, self-compassion, forgiveness and gratitude.'],
      ['Finding your voice', 'Writing and recording your own guided meditation.'],
      ['Holding space safely', 'Trauma-aware teaching, boundaries, ethics and referring on.'],
    ],
  },
  {
    name: 'Part four: Teaching',
    weeks: [
      ['Teaching groups and children', 'Shaping a class or short course, online or in a room.'],
      ['Teaching as your work', 'Pricing, insurance and finding your first students.'],
      ['Graduation', 'Teach the group, receive feedback, and celebrate together.'],
    ],
  },
]

const INCLUDED = [
  '12 live calls with Orla, each recorded',
  '12 recorded lessons and guided practices to keep',
  'A printable teacher’s handbook',
  '12 ready-to-use meditation scripts for your own classes',
  'A one-to-one mentoring call before graduation',
  'A private group during the course, and a graduates’ group after',
  'Your certificate and a badge for your website',
]

export default function TeacherTrainingPage() {
  if (isLiveSite) notFound()

  return (
    <>
      <Navbar />
      <main className="bg-pure-light">
        {/* Draft notice */}
        <div className="pt-28 px-6">
          <p className="max-w-6xl mx-auto text-sm text-sage-calm bg-earth-warmth/30 rounded-lg px-4 py-3">
            Draft preview for Orla. This page is not on the live site or in the menu.
          </p>
        </div>

        {/* Intro */}
        <section className="pt-10 pb-16 md:pt-14 md:pb-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-living-green mb-6">
                Meditation Teacher Training &middot; Online
              </p>
              <h1 className="font-crimson text-4xl sm:text-5xl md:text-6xl font-light text-forest-deep leading-[1.1] mb-8">
                Learn to guide others
                <br />
                <span className="text-sage-calm">into stillness.</span>
              </h1>
              <p className="text-lg md:text-xl text-sage-calm leading-relaxed mb-8">
                The Orla Marie OM Method Meditation Teacher Training is twelve weeks of live
                teaching, practice and mentoring in a small group. You will learn to lead
                meditation safely, in your own voice, with a teacher beside you the whole way.
              </p>
              <Link
                href="/contact#contact-form"
                className="inline-flex items-center justify-center bg-forest-deep text-white px-8 py-4 rounded-full font-medium hover:bg-sage-calm transition-all duration-300 min-w-[220px]"
              >
                Join the Waiting List
              </Link>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/orla/optimized/about/7R500150.webp"
                alt="Orla Marie, meditation teacher"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="py-20 px-6 bg-living-green/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep text-center mb-12">
              Why train with Orla
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WHY.map((w) => (
                <div key={w.title} className="bg-white/70 rounded-2xl p-8">
                  <h3 className="font-crimson text-2xl text-forest-deep mb-3">{w.title}</h3>
                  <p className="text-sage-calm leading-relaxed">{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden md:col-span-2">
              <Image
                src="/images/orla/optimized/about/7R500333.webp"
                alt="Orla Marie reading at home"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="md:col-span-3">
            <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6">Who it’s for</h2>
            <p className="text-lg text-deep-text leading-relaxed mb-4">
              For anyone whose life has been changed by meditation and who now feels called to
              share it: yoga and Pilates teachers, counsellors, coaches and therapists, holistic
              practitioners, teachers, carers and nurses.
            </p>
            <p className="text-lg text-sage-calm leading-relaxed">
              You will need at least a year of your own practice. New to meditation? My six-week
              mindfulness course is the place to begin. Every applicant has a short call with me
              first, so we both know it is right for you.
            </p>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="py-20 px-6 bg-living-green/20">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep text-center mb-12">
              Training details
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
              Allow about six to eight hours a week, including twenty minutes of daily practice.
            </p>
          </div>
        </section>

        {/* The twelve weeks */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep text-center mb-12">
              The twelve weeks
            </h2>
            <div className="space-y-12">
              {PARTS.map((part, p) => (
                <div key={part.name}>
                  <h3 className="text-sm uppercase tracking-[0.2em] text-living-green mb-4">{part.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {part.weeks.map(([title, text], i) => (
                      <div key={title} className="bg-white/70 border border-earth-warmth/40 rounded-2xl p-8">
                        <p className="text-sm text-sage-calm mb-2">Week {p * 3 + i + 1}</p>
                        <h4 className="font-crimson text-2xl text-forest-deep mb-3">{title}</h4>
                        <p className="text-sage-calm leading-relaxed">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Included + certificate */}
        <section className="py-20 px-6 bg-living-green/20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6">What’s included</h2>
              <ul className="space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex gap-3 text-lg text-deep-text leading-relaxed">
                    <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-living-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6">Earning your certificate</h2>
              <p className="text-lg text-deep-text leading-relaxed mb-4">
                You earn your certificate by showing you can teach, not by passing a quiz. You will
                keep a practice journal, write and record your own guided meditation, and lead a
                live session for the group.
              </p>
              <p className="text-lg text-sage-calm leading-relaxed">
                Independent accreditation is being arranged for the first group.
              </p>
            </div>
          </div>
        </section>

        {/* Price + waiting list */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6">Founding group, September 2027</h2>
            <p className="text-lg text-sage-calm leading-relaxed mb-4">
              The first group has a founding price of €1,250 (about US $1,450), or a €250 deposit
              and four monthly payments of €270. Past students of my courses receive €100 off.
            </p>
            <p className="text-lg text-sage-calm leading-relaxed mb-10">
              Join the waiting list to hear first when applications open, and to be invited to a
              free online taster evening.
            </p>
            <Link
              href="/contact#contact-form"
              className="inline-flex items-center justify-center bg-forest-deep text-white px-8 py-4 rounded-full font-medium hover:bg-sage-calm transition-all duration-300 min-w-[220px]"
            >
              Join the Waiting List
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
