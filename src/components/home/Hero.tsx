import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-pure-light to-light-border min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-80">
        <div 
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800' fill='none'><defs><pattern id='botanicalPattern' x='0' y='0' width='200' height='200' patternUnits='userSpaceOnUse'><circle cx='50' cy='50' r='2' fill='%234a7c59' opacity='0.1'/><path d='M100 20 Q120 40 130 60 Q120 80 100 100' stroke='%237fb069' stroke-width='1' fill='none' opacity='0.15'/><circle cx='150' cy='120' r='1.5' fill='%235a9bb5' opacity='0.1'/><path d='M20 150 Q40 130 60 150 Q40 170 20 150' fill='%23d4a574' opacity='0.08'/></pattern></defs><rect width='100%' height='100%' fill='url(%23botanicalPattern)'/><path d='M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z' fill='%23f8fffe' opacity='0.6'/></svg>")`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-crimson text-4xl md:text-5xl lg:text-6xl font-light text-forest-deep mb-6 leading-tight">
          Find Your Inner Peace Through{' '}
          <span className="relative">
            Authentic Meditation
            <span className="absolute -top-2 -right-8 text-4xl animate-float-flower">🌸</span>
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
