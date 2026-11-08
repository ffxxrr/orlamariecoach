'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'

type Props = {
  /** Where the form sits, recorded with each sign-up (e.g. "homepage", "blog") */
  source: string
  /** "section" is a full-width band; "card" sits inside a page such as a blog post */
  variant?: 'section' | 'card'
}

export default function EmailSignup({ source, variant = 'section' }: Props) {
  const { trackConversion } = useEventTracker()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, consent, source, website: honeypot }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Sorry, something went wrong.')
      }
      trackConversion('newsletter_signup', { source })
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sorry, something went wrong.')
      setStatus('error')
    }
  }

  const input =
    'w-full px-5 py-3.5 bg-white border border-earth-warmth/40 rounded-full text-deep-text placeholder:text-sage-calm/70 focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50 transition-all'

  const content = (
    <div className={variant === 'section' ? 'max-w-2xl mx-auto text-center' : 'text-center'}>
      <p className="text-sm uppercase tracking-[0.2em] text-living-green mb-4">A Free Gift</p>
      <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep leading-tight mb-4">
        A guided meditation and a simple guide to everyday mindfulness
      </h2>
      <p className="text-sage-calm leading-relaxed mb-8">
        Join my mailing list and I&apos;ll send you a free guided meditation, plus a short guide
        to five simple practices you can use in everyday life. You&apos;ll also hear about new
        courses and occasional reflections. No spam, and you can unsubscribe at any time.
      </p>

      {status === 'done' ? (
        <p className="font-crimson text-2xl text-forest-deep" aria-live="polite">
          Thank you{name ? `, ${name}` : ''}. Your free meditation and guide are on their way to your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="sr-only">First name</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="First name" autoComplete="given-name" className={input} />
            </label>
            <label className="block">
              <span className="sr-only">Email address</span>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoComplete="email" className={input} />
            </label>
          </div>
          <label className="flex items-start gap-3 cursor-pointer text-sm text-sage-calm">
            <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
            <span>
              Yes, please email me the free gift and occasional news. See the{' '}
              <Link href="/privacy" className="underline hover:text-forest-deep">privacy policy</Link>.
            </span>
          </label>
          <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-forest-deep text-white font-medium py-4 px-6 rounded-full hover:bg-sage-calm transition-all duration-300 disabled:opacity-60 disabled:cursor-wait"
          >
            {status === 'sending' ? 'Sending...' : 'Send Me the Free Gift'}
          </button>
          {status === 'error' && (
            <p className="text-center text-forest-deep text-sm" aria-live="polite">{error}</p>
          )}
        </form>
      )}
    </div>
  )

  if (variant === 'card') {
    return <aside className="bg-earth-warmth/25 border border-earth-warmth/50 rounded-2xl p-8 md:p-10">{content}</aside>
  }
  return <section className="py-20 md:py-28 px-6 bg-earth-warmth/25">{content}</section>
}
