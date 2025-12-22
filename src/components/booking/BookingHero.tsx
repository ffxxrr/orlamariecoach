'use client'

import Link from 'next/link'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import VideoHeroBackground from '@/components/ui/VideoHeroBackground'

export default function BookingHero() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Video/Poster Background */}
      <VideoHeroBackground
        videoSrc="/media/sora/booking.mp4"
        posterSrc="/media/sora/booking-poster.jpg"
        mobileFocalPoint="center center"
      />

      {/* Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      {/* Content */}
      <div
        ref={ref}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20"
      >
        <div className="max-w-2xl">
          {/* Subtitle */}
          <p
            className={`text-sm uppercase tracking-[0.2em] text-earth-warmth mb-6 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '100ms' }}
          >
            Book a Session
          </p>

          {/* Main Headline */}
          <h1
            className={`font-crimson text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '200ms' }}
          >
            Your journey
            <br />
            <span className="text-earth-warmth">begins here.</span>
          </h1>

          {/* Description */}
          <p
            className={`text-lg md:text-xl text-white/90 mb-8 leading-relaxed ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '300ms' }}
          >
            Experience personalised guidance tailored to your unique needs.
            Transform stress into peace with authentic wisdom and modern techniques.
          </p>

          {/* Trust Indicators */}
          <div
            className={`flex flex-wrap gap-6 mb-8 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-earth-warmth" />
              <span className="text-white/80 text-sm">Global Timezone Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-earth-warmth" />
              <span className="text-white/80 text-sm">Personalised Approach</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-earth-warmth" />
              <span className="text-white/80 text-sm">Online & In-Person</span>
            </div>
          </div>

          {/* Contact Link */}
          <p
            className={`text-white/80 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '500ms' }}
          >
            Have questions?{' '}
            <Link
              href="/contact"
              className="text-earth-warmth hover:text-white transition-colors underline underline-offset-4"
            >
              Get in touch first
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
