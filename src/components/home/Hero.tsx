'use client'
import Link from 'next/link'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'
import Button from '@/components/ui/Button'

export default function Hero() {
  const { trackNavigation } = useEventTracker();
  return (
    <section className="relative bg-gradient-to-br from-pure-light to-light-border min-h-screen flex items-center justify-center px-4 overflow-hidden z-0">
      {/* Background Pattern - Using simpler pattern without SVG data URL */}
      <div className="absolute inset-0 opacity-80">
        <div 
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 124, 89, 0.05) 0%, rgba(127, 176, 105, 0.05) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-crimson text-4xl md:text-5xl lg:text-6xl font-light text-forest-deep mb-6 leading-tight fade-in-up">
          Find Your Inner Peace Through{' '}
          <span className="relative">
            Authentic Meditation
            <span className="absolute -top-2 -right-8 text-4xl">🌸</span>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-medium-text mb-8 max-w-3xl mx-auto font-light leading-relaxed fade-in-up">
          Discover the transformative power of mindfulness with personalised guidance rooted in traditional wisdom and modern understanding.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up">
          <Link href="/book-session" onClick={() => trackNavigation('cta_clicked', '/book-session', 'hero')}>
            <Button size="lg" variant="primary">Start Your Journey</Button>
          </Link>
          <Link href="/about" onClick={() => trackNavigation('cta_clicked', '/about', 'hero')}>
            <Button size="lg" variant="secondary">Learn More</Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-light-border fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-semibold text-forest-deep">500+</div>
              <div className="text-sm text-medium-text">Students Guided</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-semibold text-forest-deep">4.9/5</div>
              <div className="text-sm text-medium-text">Average Rating</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-semibold text-forest-deep">30+</div>
              <div className="text-sm text-medium-text">Countries Reached</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
