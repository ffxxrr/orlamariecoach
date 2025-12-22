import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | OrlaMarieCoach',
  description: 'Simple, human terms for using this website. No lawyers required.',
}

export default function TermsPage() {
  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <Section padded>
          <Container className="max-w-3xl">
            <div className="text-center mb-16">
              <h1 className="font-crimson text-4xl md:text-5xl text-forest-deep mb-6">
                Terms of Service
              </h1>
              <p className="text-lg text-sage-calm">
                The human version
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white/60 rounded-2xl p-8 md:p-12 mb-12">
                <h2 className="font-crimson text-2xl text-forest-deep mb-6">
                  Let&apos;s Keep This Simple
                </h2>
                <p className="text-deep-text leading-relaxed mb-6">
                  This website offers information about mindfulness and meditation, along with
                  ways to book sessions and courses with me. By using it, you&apos;re agreeing to
                  be respectful and use it for its intended purpose.
                </p>
                <p className="text-deep-text leading-relaxed">
                  I&apos;ve tried to write these terms like I&apos;d explain them over a cup of tea,
                  not like a lawyer trying to bill by the word.
                </p>
              </div>

              <div className="space-y-12">
                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    What I Offer
                  </h2>
                  <p className="text-deep-text leading-relaxed mb-4">
                    I provide mindfulness coaching and meditation guidance. While I have years of
                    training and experience, I&apos;m not a medical professional, therapist, or
                    psychologist. What I offer complements but doesn&apos;t replace professional
                    healthcare.
                  </p>
                  <p className="text-deep-text leading-relaxed">
                    If you&apos;re experiencing serious mental health challenges, please also seek
                    support from qualified healthcare providers.
                  </p>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Bookings and Payments
                  </h2>
                  <ul className="space-y-3 text-deep-text">
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Sessions can be rescheduled with at least 24 hours notice</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Cancellations with less notice may forfeit the session fee</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Course purchases are non-refundable once access is granted, but I&apos;m always happy to discuss individual circumstances</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Payment is accepted via Revolut, PayPal, or bank transfer</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Your Responsibilities
                  </h2>
                  <p className="text-deep-text leading-relaxed mb-4">
                    When booking sessions or accessing content, please:
                  </p>
                  <ul className="space-y-3 text-deep-text">
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Provide accurate information when booking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Let me know about any health conditions that might be relevant</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Don&apos;t share or redistribute course materials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Treat this as a space for genuine learning and growth</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Content and Copyright
                  </h2>
                  <p className="text-deep-text leading-relaxed">
                    The words, images, audio recordings, and course materials on this site are
                    my work. You&apos;re welcome to share links and quote small excerpts with
                    attribution, but please don&apos;t copy or redistribute substantial portions
                    without asking. If you want to use something, just reach out &mdash; I&apos;m
                    usually happy to say yes.
                  </p>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    A Small Business Reality
                  </h2>
                  <p className="text-deep-text leading-relaxed">
                    This is a one-person business. I do my best to ensure everything works
                    smoothly, but I can&apos;t guarantee the website will be available 100% of
                    the time or that every piece of information will always be perfectly current.
                    If you notice something amiss, I&apos;d genuinely appreciate you letting me know.
                  </p>
                </div>

                <div className="border-t border-earth-warmth pt-8">
                  <p className="text-sage-calm text-sm">
                    Last updated: December 2025
                  </p>
                  <p className="text-sage-calm text-sm mt-2">
                    Questions about these terms? <Link href="/contact" className="text-forest-deep hover:underline">Get in touch</Link>.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
