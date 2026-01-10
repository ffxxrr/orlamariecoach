import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy | OrlaMarieCoach',
  description: 'How we respect your privacy. No tracking, no big tech sharing - just a small Irish business trying to help people find peace.',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section padded>
          <Container className="max-w-3xl">
            <div className="text-center mb-16">
              <h1 className="font-crimson text-4xl md:text-5xl text-forest-deep mb-6">
                Your Privacy Matters
              </h1>
              <p className="text-lg text-sage-calm">
                Written by a real person, for real people
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white/60 rounded-2xl p-8 md:p-12 mb-12">
                <h2 className="font-crimson text-2xl text-forest-deep mb-6">
                  The Short Version
                </h2>
                <p className="text-deep-text leading-relaxed mb-6">
                  I don&apos;t track you. I don&apos;t sell your data. I don&apos;t hand your browsing
                  habits over to the big tech companies so they can figure out new ways to
                  sell you things you don&apos;t need.
                </p>
                <p className="text-deep-text leading-relaxed">
                  This is a small meditation coaching business run from Donegal, Ireland.
                  My interest is in helping people find peace, not in building advertising profiles.
                </p>
              </div>

              <div className="space-y-12">
                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    What I Do Collect
                  </h2>
                  <p className="text-deep-text leading-relaxed mb-4">
                    I use simple, privacy-respecting analytics to understand the basics:
                    which pages people visit, roughly where in the world they&apos;re coming from,
                    and how they found me. That&apos;s it.
                  </p>
                  <p className="text-deep-text leading-relaxed">
                    This helps me understand if my writing resonates, if people in America
                    are finding their way here, or if a particular course is generating interest.
                    It&apos;s the kind of insight any small business needs to survive in a world
                    dominated by corporations with unlimited marketing budgets.
                  </p>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    What I Don&apos;t Do
                  </h2>
                  <ul className="space-y-3 text-deep-text">
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No Facebook Pixel, Google Analytics, or any tracking that follows you around the internet</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No selling or sharing your information with third parties</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No building profiles about you or your interests</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No retargeting ads that haunt you across the web</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    If You Contact Me
                  </h2>
                  <p className="text-deep-text leading-relaxed">
                    When you send me a message or book a session, I&apos;ll have your email address
                    and whatever you choose to share. I keep this information secure and use it
                    only to communicate with you about your mindfulness journey. I won&apos;t add
                    you to marketing lists unless you specifically ask to join my newsletter.
                  </p>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    A Note on Why This Matters
                  </h2>
                  <p className="text-deep-text leading-relaxed mb-4">
                    Mindfulness is about presence, awareness, and respect. It would feel deeply
                    wrong to teach these values while simultaneously harvesting your data for
                    profit or feeding the surveillance economy.
                  </p>
                  <p className="text-deep-text leading-relaxed">
                    The internet doesn&apos;t have to work the way the big platforms have trained
                    us to expect. This corner of it works differently.
                  </p>
                </div>

                <div className="border-t border-earth-warmth pt-8">
                  <p className="text-sage-calm text-sm">
                    Last updated: December 2025
                  </p>
                  <p className="text-sage-calm text-sm mt-2">
                    Questions? <Link href="/contact" className="text-forest-deep hover:underline">Get in touch</Link>.
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
