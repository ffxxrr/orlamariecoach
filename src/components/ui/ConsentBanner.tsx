'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import PrivacyManager from '@/lib/analytics/privacy'

interface ConsentBannerProps {
  onConsentChange?: (hasConsented: boolean) => void
}

export default function ConsentBanner({ onConsentChange }: ConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [privacyManager] = useState(() => new PrivacyManager())

  useEffect(() => {
    const existingConsent = privacyManager.getConsentSettings()
    if (!existingConsent) {
      // Small delay to prevent flash on page load
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [privacyManager])

  useEffect(() => {
    const handleConsentChange = (event: CustomEvent) => {
      setIsVisible(false)
      onConsentChange?.(event.detail.analytics)
    }

    window.addEventListener('analyticsConsentChange', handleConsentChange as EventListener)
    return () => {
      window.removeEventListener('analyticsConsentChange', handleConsentChange as EventListener)
    }
  }, [onConsentChange])

  const handleAccept = async () => {
    setIsProcessing(true)
    try {
      await privacyManager.grantConsent()
      setIsVisible(false)
      onConsentChange?.(true)
    } catch (error) {
      console.error('Failed to grant consent:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDecline = async () => {
    setIsProcessing(true)
    try {
      await privacyManager.denyConsent()
      setIsVisible(false)
      onConsentChange?.(false)
    } catch (error) {
      console.error('Failed to deny consent:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[1001] transform transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Gradient fade at top */}
      <div className="h-8 bg-gradient-to-t from-pure-light to-transparent" />

      <div className="bg-pure-light border-t border-earth-warmth/50 px-6 py-6 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Content */}
            <div className="flex-1">
              <p className="text-deep-text leading-relaxed">
                <span className="font-medium">We respect your privacy.</span>{' '}
                <span className="text-sage-calm">
                  Simple analytics help this small Irish business understand what resonates.
                  No tracking, no big tech.{' '}
                  <Link href="/privacy" className="text-forest-deep hover:underline">
                    Learn more
                  </Link>
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleDecline}
                disabled={isProcessing}
                className="px-5 py-2.5 text-sm text-sage-calm hover:text-forest-deep transition-colors disabled:opacity-50"
              >
                No thanks
              </button>
              <button
                onClick={handleAccept}
                disabled={isProcessing}
                className="px-6 py-2.5 bg-forest-deep text-white text-sm font-medium rounded-full hover:bg-sage-calm transition-all duration-300 disabled:opacity-50"
              >
                {isProcessing ? 'Saving...' : 'That\u0027s fine'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
