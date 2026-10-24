import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy',
  description: 'How Orla Marie Coach collects, uses and protects your information.',
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
                Privacy Policy
              </h1>
              <p className="text-lg text-sage-calm">
                How your information is collected, used and protected
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white/60 rounded-2xl p-8 md:p-12 mb-12">
                <h2 className="font-crimson text-2xl text-forest-deep mb-6">
                  Summary
                </h2>
                <p className="text-deep-text leading-relaxed mb-6">
                  I collect only the information needed to run this website and respond to
                  enquiries. I do not sell your data, share it with advertisers, or use
                  tracking that follows you across other websites.
                </p>
                <p className="text-deep-text leading-relaxed">
                  Orla Marie Coach is based in Donegal, Ireland, and handles personal data in
                  line with the General Data Protection Regulation (GDPR).
                </p>
              </div>

              <div className="space-y-12">
                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Website Analytics
                  </h2>
                  <p className="text-deep-text leading-relaxed">
                    With your consent, this site uses simple, privacy-respecting analytics to
                    understand which pages are visited, roughly which country visitors come from,
                    and how they found the site. This helps me keep the website useful and
                    relevant. The analytics do not identify you personally.
                  </p>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    What I Don&apos;t Do
                  </h2>
                  <ul className="space-y-3 text-deep-text">
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No Facebook Pixel, Google Analytics or cross-site tracking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No selling or sharing of your information with third parties</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No advertising profiles</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>No retargeting adverts</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    If You Contact Me
                  </h2>
                  <p className="text-deep-text leading-relaxed">
                    When you get in touch, I will hold your name, email address and whatever you
                    choose to share. This information is kept securely and used only to respond to
                    your enquiry and, where relevant, to arrange and deliver a programme. I will
                    not add you to a mailing list unless you ask to join it.
                  </p>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Your Rights
                  </h2>
                  <p className="text-deep-text leading-relaxed">
                    You can ask to see, correct or delete the personal information I hold about
                    you at any time. To do so, please{' '}
                    <Link href="/contact" className="text-forest-deep hover:underline">get in touch</Link>.
                  </p>
                </div>

                <div className="border-t border-earth-warmth pt-8">
                  <p className="text-sage-calm text-sm">
                    Last updated: October 2026
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
