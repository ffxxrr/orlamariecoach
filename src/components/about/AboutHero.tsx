'use client'

import { useEffect, useRef, useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

export default function AboutHero() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleCanPlay = () => setVideoLoaded(true)
      video.addEventListener('canplay', handleCanPlay)
      return () => video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Video Background */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          poster="/media/sora/about-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/media/sora/about.mp4" type="video/mp4" />
        </video>
      )}

      {/* Poster fallback */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          videoLoaded && !prefersReducedMotion ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundImage: 'url(/media/sora/about-poster.jpg)' }}
      />

      {/* Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

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
            About Orla Marie
          </p>

          {/* Main Headline */}
          <h1
            className={`font-crimson text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6 leading-[1.1] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '200ms' }}
          >
            Thirty years of practice.
            <br />
            <span className="text-earth-warmth">One calling.</span>
          </h1>

          {/* Description */}
          <p
            className={`text-lg md:text-xl text-white/90 mb-8 leading-relaxed ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '300ms' }}
          >
            Mindfulness coach and meditation teacher from Donegal, Ireland.
            Guiding people home to themselves since 2015.
          </p>

          {/* Trust Indicators */}
          <div
            className={`flex flex-wrap gap-6 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-earth-warmth" />
              <span className="text-white/80 text-sm">500+ Clients Guided</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-earth-warmth" />
              <span className="text-white/80 text-sm">MBSR Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-earth-warmth" />
              <span className="text-white/80 text-sm">Kids Mindfulness Trained</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
