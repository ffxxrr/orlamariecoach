import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BotanicalAccents from '@/components/ui/BotanicalAccents'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Link from 'next/link'

export const metadata = {
  title: 'Cookies | OrlaMarieCoach',
  description: 'Our refreshingly simple approach to cookies. Spoiler: we barely use them.',
}

export default function CookiesPage() {
  return (
    <>
      <BotanicalAccents />
      <Navbar />
      <main>
        <Section padded>
          <Container className="max-w-3xl">
            <div className="text-center mb-16">
              <h1 className="font-crimson text-4xl md:text-5xl text-forest-deep mb-6">
                Cookies
              </h1>
              <p className="text-lg text-sage-calm">
                Not the delicious kind, unfortunately
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white/60 rounded-2xl p-8 md:p-12 mb-12">
                <h2 className="font-crimson text-2xl text-forest-deep mb-6">
                  The Refreshingly Short Story
                </h2>
                <p className="text-deep-text leading-relaxed mb-6">
                  This website uses minimal cookies. No advertising cookies. No tracking
                  cookies that follow you around the internet. No third-party cookies from
                  Facebook, Google, or any of the usual suspects.
                </p>
                <p className="text-deep-text leading-relaxed">
                  If the whole internet worked this way, we wouldn&apos;t need those annoying
                  cookie banners everywhere.
                </p>
              </div>

              <div className="space-y-12">
                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    What Cookies We Use
                  </h2>
                  <div className="space-y-6">
                    <div className="border-l-2 border-living-green pl-6">
                      <h3 className="font-semibold text-deep-text mb-2">Essential Cookies</h3>
                      <p className="text-deep-text leading-relaxed">
                        These make the website work properly &mdash; things like remembering if
                        you&apos;re logged in, or keeping your session active while booking. Without
                        these, the site wouldn&apos;t function. They&apos;re deleted when you close your browser.
                      </p>
                    </div>
                    <div className="border-l-2 border-living-green pl-6">
                      <h3 className="font-semibold text-deep-text mb-2">Simple Analytics</h3>
                      <p className="text-deep-text leading-relaxed">
                        I use privacy-respecting analytics to understand basic things like which
                        pages people visit and how they found the site. This helps me improve
                        the content and understand if my work is reaching people. These analytics
                        don&apos;t identify you personally or track you across other websites.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    What We Don&apos;t Use
                  </h2>
                  <ul className="space-y-3 text-deep-text">
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No Google Analytics (they track you across the entire web)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No Facebook Pixel (designed to profile you for advertising)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No advertising cookies of any kind</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No third-party tracking scripts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No cross-site tracking or retargeting</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Why This Matters
                  </h2>
                  <p className="text-deep-text leading-relaxed mb-4">
                    Most websites load dozens of tracking scripts that report your every move
                    to advertising companies. These companies build detailed profiles about
                    you &mdash; what you read, what you buy, what you worry about &mdash; and
                    sell access to anyone willing to pay.
                  </p>
                  <p className="text-deep-text leading-relaxed mb-4">
                    That&apos;s not how I want to run a mindfulness business. When you visit
                    this site, you&apos;re not being watched, profiled, or catalogued.
                  </p>
                  <p className="text-deep-text leading-relaxed">
                    It&apos;s a small gesture, but it aligns with what I teach: being present,
                    being mindful, and treating people with respect.
                  </p>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Managing Cookies
                  </h2>
                  <p className="text-deep-text leading-relaxed">
                    You can control cookies through your browser settings. Since we only use
                    essential cookies, blocking them might affect how the site works (like
                    staying logged in). But honestly, there&apos;s not much to block here.
                  </p>
                </div>

                <div className="bg-earth-warmth/30 rounded-xl p-6">
                  <p className="text-sage-calm italic">
                    &ldquo;In a world of surveillance capitalism, choosing not to track people
                    is itself a form of mindfulness.&rdquo;
                  </p>
                </div>

                <div className="border-t border-earth-warmth pt-8">
                  <p className="text-sage-calm text-sm">
                    Last updated: December 2025
                  </p>
                  <p className="text-sage-calm text-sm mt-2">
                    More questions? See our <Link href="/privacy" className="text-forest-deep hover:underline">Privacy Policy</Link> or <Link href="/contact" className="text-forest-deep hover:underline">get in touch</Link>.
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
