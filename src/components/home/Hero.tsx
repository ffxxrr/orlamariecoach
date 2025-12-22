'use client'
import Link from 'next/link'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'
import VideoHeroBackground from '@/components/ui/VideoHeroBackground'

export default function Hero() {
  const { trackNavigation } = useEventTracker()

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video/Poster Background */}
      <VideoHeroBackground
        videoSrc="/media/sora/hero-forest-light.mp4"
        posterSrc="/media/sora/hero-forest-light-poster.jpg"
        mobileFocalPoint="center center"
      />

      {/* Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="font-crimson text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.1] tracking-tight">
            Find stillness.
            <br />
            <span className="text-earth-warmth">Find yourself.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Personalised meditation guidance rooted in 30 years of practice and ancient Irish wisdom.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/book-session"
              onClick={() => trackNavigation('cta_clicked', '/book-session', 'hero')}
              className="inline-flex items-center justify-center bg-earth-warmth text-forest-deep px-8 py-4 rounded-full font-medium text-lg hover:bg-white hover:shadow-lg transition-all duration-300 min-w-[200px]"
            >
              Begin Your Journey
            </Link>
            <Link
              href="/about"
              onClick={() => trackNavigation('cta_clicked', '/about', 'hero')}
              className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white/60 px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 hover:border-white transition-all duration-300 min-w-[200px]"
            >
              Learn More
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-semibold text-white">500+</div>
              <div className="text-sm text-white/70 mt-1">Clients Guided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-semibold text-white">30</div>
              <div className="text-sm text-white/70 mt-1">Years Practice</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-semibold text-white">1:1</div>
              <div className="text-sm text-white/70 mt-1">Personal Sessions</div>
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
      </div>
    </section>
  )
}
