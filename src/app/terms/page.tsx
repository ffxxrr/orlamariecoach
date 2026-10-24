import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms for using this website and taking part in mindfulness programmes with Orla Marie Coach.',
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section padded>
          <Container className="max-w-3xl">
            <div className="text-center mb-16">
              <h1 className="font-crimson text-4xl md:text-5xl text-forest-deep mb-6">
                Terms of Service
              </h1>
              <p className="text-lg text-sage-calm">
                Clear, straightforward terms
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-white/60 rounded-2xl p-8 md:p-12 mb-12">
                <h2 className="font-crimson text-2xl text-forest-deep mb-6">
                  Overview
                </h2>
                <p className="text-deep-text leading-relaxed">
                  This website provides information about mindfulness meditation programmes for
                  individuals, workplaces and schools, and a way to get in touch. By using it,
                  you agree to use it respectfully and for its intended purpose.
                </p>
              </div>

              <div className="space-y-12">
                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    What I Offer
                  </h2>
                  <p className="text-deep-text leading-relaxed mb-4">
                    I provide mindfulness meditation programmes for individuals, workplaces and
                    schools. These programmes are educational and supportive in nature. They are
                    not therapy, counselling or medical treatment, and they do not replace
                    professional healthcare.
                  </p>
                  <p className="text-deep-text leading-relaxed">
                    If you are experiencing significant mental health difficulties, please seek
                    support from your GP or another qualified healthcare provider, and let me know
                    before starting a programme so we can make sure it is suitable for you.
                  </p>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Sessions and Cancellations
                  </h2>
                  <ul className="space-y-3 text-deep-text">
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>One-to-one sessions can be rescheduled with at least 24 hours&apos; notice</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Sessions cancelled with less notice may be charged</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Terms for workplace and school programmes are agreed in writing before the programme begins</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Your Responsibilities
                  </h2>
                  <p className="text-deep-text leading-relaxed mb-4">
                    When taking part in a programme, please:
                  </p>
                  <ul className="space-y-3 text-deep-text">
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Provide accurate information when enquiring or booking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Let me know about any health conditions that might be relevant</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-living-green mr-3 mt-1">&#8226;</span>
                      <span>Don&apos;t share or redistribute programme materials or recordings</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Content and Copyright
                  </h2>
                  <p className="text-deep-text leading-relaxed">
                    The text, images, audio recordings and programme materials on this site are my
                    work. You are welcome to share links and quote short excerpts with attribution,
                    but please ask before copying or redistributing anything more substantial.
                  </p>
                </div>

                <div>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-4">
                    Website Availability
                  </h2>
                  <p className="text-deep-text leading-relaxed">
                    I take care to keep this website accurate and available, but I cannot guarantee
                    that it will be available at all times or that all information will always be
                    current. If you notice anything that needs correcting, please let me know.
                  </p>
                </div>

                <div className="border-t border-earth-warmth pt-8">
                  <p className="text-sage-calm text-sm">
                    Last updated: October 2026
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
