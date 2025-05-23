import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-pure-light to-light-border min-h-screen flex items-center justify-center px-4 overflow-hidden">
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
        <h1 className="font-crimson text-4xl md:text-5xl lg:text-6xl font-light text-forest-deep mb-6 leading-tight">
          Find Your Inner Peace Through{' '}
          <span className="relative">
            Authentic Meditation
            <span className="absolute -top-2 -right-8 text-4xl">🌸</span>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-medium-text mb-8 max-w-3xl mx-auto font-light leading-relaxed">
          Discover the transformative power of mindfulness with personalised guidance rooted in traditional wisdom and modern understanding.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/book-session"
            className="btn btn-primary px-8 py-4 text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Start Your Journey
          </Link>
          <Link 
            href="/about"
            className="btn btn-secondary px-8 py-4 text-lg hover:bg-forest-deep hover:text-white transition-all duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-light-border">
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
