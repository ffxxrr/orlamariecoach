import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Link from 'next/link'

export const metadata = {
  title: 'Cookies',
  description: 'How this website uses cookies.',
}

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section padded>
          <Container className="max-w-3xl">
            <div className="text-center mb-16">
              <h1 className="font-crimson text-4xl md:text-5xl text-forest-deep mb-6">
                Cookie Policy
              </h1>
              <p className="text-lg text-sage-calm">
                How this website uses cookies
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white/60 rounded-2xl p-8 md:p-12 mb-12">
                <h2 className="font-crimson text-2xl text-forest-deep mb-6">
                  Summary
                </h2>
                <p className="text-deep-text leading-relaxed">
                  This website uses a minimal number of cookies. There are no advertising
                  cookies and no third-party tracking cookies.
                </p>
              </div>

              <div className="space-y-12">
                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Cookies Used
                  </h2>
                  <div className="space-y-6">
                    <div className="border-l-2 border-living-green pl-6">
                      <h3 className="font-semibold text-deep-text mb-2">Essential Cookies</h3>
                      <p className="text-deep-text leading-relaxed">
                        These are needed for the website to work properly, for example to remember
                        your cookie preferences. They do not identify you personally.
                      </p>
                    </div>
                    <div className="border-l-2 border-living-green pl-6">
                      <h3 className="font-semibold text-deep-text mb-2">Analytics (with your consent)</h3>
                      <p className="text-deep-text leading-relaxed">
                        Privacy-respecting analytics help me understand which pages are visited and
                        how people find the site. They do not identify you personally or track you
                        across other websites, and are only used if you accept them.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Cookies Not Used
                  </h2>
                  <ul className="space-y-3 text-deep-text">
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No Google Analytics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No Facebook Pixel</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No advertising cookies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No third-party tracking scripts, cross-site tracking or retargeting</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Managing Cookies
                  </h2>
                  <p className="text-deep-text leading-relaxed">
                    You can control or delete cookies through your browser settings. Blocking
                    essential cookies may affect how parts of the site work.
                  </p>
                </div>

                <div className="border-t border-earth-warmth pt-8">
                  <p className="text-sage-calm text-sm">
                    Last updated: October 2026
                  </p>
                  <p className="text-sage-calm text-sm mt-2">
                    More questions? See the <Link href="/privacy" className="text-forest-deep hover:underline">Privacy Policy</Link> or <Link href="/contact" className="text-forest-deep hover:underline">get in touch</Link>.
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
