import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// Linked from the MailerLite welcome email. Kept out of search results.
export const metadata = {
  title: 'Your Free Gift',
  description: 'A free guided mindfulness meditation and guide from Orla Marie.',
  robots: { index: false, follow: true },
}

export default function FreeGiftPage() {
  return (
    <>
      <Navbar />
      <main className="bg-pure-light">
        <section className="pt-36 pb-16 md:pt-44 md:pb-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-living-green mb-6">Your Free Gift</p>
            <h1 className="font-crimson text-4xl sm:text-5xl font-light text-forest-deep leading-[1.1] mb-6">
              Welcome. Take a moment for yourself.
            </h1>
            <p className="text-lg text-sage-calm leading-relaxed">
              Thank you for joining me. Find a comfortable place to sit or lie down, and when you
              are ready, press play.
            </p>
          </div>
        </section>

        <section className="pb-16 px-6">
          <div className="max-w-2xl mx-auto bg-white/70 border border-earth-warmth/40 rounded-2xl p-8 md:p-10">
            <h2 className="font-crimson text-3xl text-forest-deep mb-2">Guided mindfulness meditation</h2>
            <p className="text-sage-calm mb-6">10 minutes, with soft piano</p>
            <audio controls preload="none" className="w-full" src="/free/orla-marie-guided-meditation.mp3">
              Your browser cannot play this audio.{' '}
              <a href="/free/orla-marie-guided-meditation.mp3">Download the meditation</a>.
            </audio>
            <p className="text-sm text-sage-calm mt-4">
              <a href="/free/orla-marie-guided-meditation.mp3" download className="underline hover:text-forest-deep">
                Download the meditation
              </a>{' '}
              to listen any time, even without an internet connection.
            </p>
          </div>
        </section>

        <section className="pb-16 px-6">
          <div className="max-w-2xl mx-auto bg-white/70 border border-earth-warmth/40 rounded-2xl p-8 md:p-10">
            <h2 className="font-crimson text-3xl text-forest-deep mb-2">Five simple mindfulness practices</h2>
            <p className="text-sage-calm mb-6">
              A one-page guide to practices that take from one to five minutes and fit into an
              ordinary day.
            </p>
            <a
              href="/free/five-simple-mindfulness-practices.pdf"
              className="inline-flex items-center justify-center bg-forest-deep text-white px-8 py-4 rounded-full font-medium hover:bg-sage-calm transition-all duration-300"
            >
              Download the Guide
            </a>
          </div>
        </section>

        <section className="py-16 px-6 bg-living-green/20">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-sage-calm leading-relaxed mb-8">
              Go gently. You are always in charge of your practice: keep your eyes open if you
              prefer, move whenever you need to, and stop at any time.
            </p>
            <Link
              href="/mindfulness-course"
              className="text-forest-deep font-medium uppercase tracking-wider text-sm underline hover:no-underline"
            >
              Six-week mindfulness course, starting January
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
