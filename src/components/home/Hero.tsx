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
            Mindfulness for
            <br />
            <span className="text-earth-warmth">work, school and life.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Evidence-based, trauma-informed mindfulness meditation programmes for organisations, schools and individuals, led by accredited mindfulness teacher Orla Marie.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/contact"
              onClick={() => trackNavigation('cta_clicked', '/contact', 'hero')}
              className="inline-flex items-center justify-center bg-earth-warmth text-forest-deep px-8 py-4 rounded-full font-medium text-lg hover:bg-white hover:shadow-lg transition-all duration-300 min-w-[200px]"
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              onClick={() => trackNavigation('cta_clicked', '/services', 'hero')}
              className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white/60 px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 hover:border-white transition-all duration-300 min-w-[200px]"
            >
              Explore Programmes
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-semibold text-white">30</div>
              <div className="text-sm text-white/70 mt-1">Years&apos; Practice</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-semibold text-white">1:1</div>
              <div className="text-sm text-white/70 mt-1">Group &amp; Team</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-semibold text-white">Online</div>
              <div className="text-sm text-white/70 mt-1">&amp; In Person</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
