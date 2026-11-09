import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Mindfulness Gift Vouchers',
  description:
    'Give the gift of calm. Mindfulness gift vouchers from Orla Marie, accredited mindfulness teacher in Inishowen, Co. Donegal, in euro or sterling, for one-to-one sessions or the six-week mindfulness course.',
  alternates: { canonical: '/gift-vouchers' },
}

const SUGGESTED = [
  {
    euro: '€50',
    sterling: '£45',
    title: 'A Gentle Start',
    text: 'A thoughtful gift towards a one-to-one session or a place on a course.',
  },
  {
    euro: '€100',
    sterling: '£85',
    title: 'One-to-One Session',
    text: 'A personal mindfulness session, in person in Inishowen or online.',
  },
  {
    euro: '€150',
    sterling: '£130',
    title: 'Mindfulness Course',
    text: 'A place on the six-week mindfulness course at The Sliabh Sneacht Centre, starting in January.',
  },
]

const STEPS = [
  'Get in touch using the form, telling me the amount and who the voucher is for.',
  'I send you payment details by email. You can pay in euro or sterling, by Revolut or PayPal.',
  'I email you a voucher, ready to print or forward, with your own message if you like.',
]

export default function GiftVouchersPage() {
  return (
    <>
      <Navbar />
      <main className="bg-pure-light">
        {/* Intro */}
        <section className="pt-36 pb-16 md:pt-44 md:pb-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-living-green mb-6">Gift Vouchers</p>
            <h1 className="font-crimson text-4xl sm:text-5xl md:text-6xl font-light text-forest-deep leading-[1.1] mb-8">
              Give the gift of calm.
            </h1>
            <p className="text-lg md:text-xl text-sage-calm leading-relaxed">
              A mindfulness gift voucher is a meaningful present for someone you care about: time to
              slow down, breathe and reconnect, guided by an accredited, trauma-informed mindfulness
              teacher. Choose any amount, in euro or sterling.
            </p>
          </div>
        </section>

        {/* Suggested amounts */}
        <section className="pb-20 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-sm uppercase tracking-[0.2em] text-living-green mb-10">
              Suggested amounts
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUGGESTED.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/70 border border-earth-warmth/40 rounded-2xl p-8 text-center"
                >
                  <p className="font-crimson text-4xl text-forest-deep mb-1">{item.euro}</p>
                  <p className="text-sage-calm text-sm mb-6">or {item.sterling}</p>
                  <h2 className="font-crimson text-2xl text-forest-deep mb-3">{item.title}</h2>
                  <p className="text-sage-calm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sage-calm mt-8">
              Or choose your own amount. Every voucher can be used for one-to-one sessions or courses.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-6 bg-living-green/20">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep text-center mb-12">
              How it works
            </h2>
            <ol className="space-y-8">
              {STEPS.map((step, i) => (
                <li key={step} className="flex gap-6 items-start">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-forest-deep text-white font-crimson text-xl flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-lg text-deep-text leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
            <p className="text-sage-calm text-center mt-12">
              Vouchers are valid for twelve months. For Christmas, please order by 20 December.
            </p>
            <div className="text-center mt-10">
              <Link
                href="/contact?enquiry=gift-voucher#contact-form"
                className="inline-flex items-center justify-center bg-forest-deep text-white px-8 py-4 rounded-full font-medium hover:bg-sage-calm transition-all duration-300 min-w-[220px]"
              >
                Order a Gift Voucher
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
