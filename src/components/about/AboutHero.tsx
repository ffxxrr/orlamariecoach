import Image from 'next/image'

export default function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-pure-light to-light-border min-h-[70vh] flex items-center justify-center px-4 py-20 overflow-hidden z-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-80">
        <div 
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 124, 89, 0.05) 0%, rgba(127, 176, 105, 0.05) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="font-crimson text-4xl md:text-5xl font-light text-forest-deep mb-6 leading-tight">
              Meet Orla Marie
            </h1>
            
            <p className="text-lg text-medium-text mb-6">
              Mindfulness coach, meditation teacher, and creator of The OM Method — a personalised approach to 
              mindful living designed to bring balance and clarity to your everyday life.
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="h-0.5 w-12 bg-forest-deep"></div>
              <span className="text-forest-deep font-medium">Based in Donegal, Ireland</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest-deep/10 flex items-center justify-center text-forest-deep">
                  <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M12 6c-2.21 0-4 1.79-4 4 0 1.3.63 2.46 1.6 3.2L8 16h8l-1.6-2.8A4 4 0 0016 10c0-2.21-1.79-4-4-4z"/></svg>
                </div>
                <span className="text-medium-text">MBSR Certified Practitioner</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest-deep/10 flex items-center justify-center text-forest-deep">
                  <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M12 4a4 4 0 00-4 4v2H7a3 3 0 000 6h10a3 3 0 000-6h-1V8a4 4 0 00-4-4z"/></svg>
                </div>
                <span className="text-medium-text">Mindfulness for Kids Certified</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest-deep/10 flex items-center justify-center text-forest-deep">
                  <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M12 8V6h4v2h-4zm0 2a6 6 0 100 12 6 6 0 000-12zm1 7h-2v-5h2v5z"/></svg>
                </div>
                <span className="text-medium-text">500+ Hours Teaching Experience</span>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] max-w-md mx-auto">
              <Image
                src="/images/orla/optimized/about/7R500130.webp"
                alt="Orla Marie meditation coach"
                width={600}
                height={800}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            
            <div className="absolute -top-4 -right-4 transform rotate-12 w-28 h-28 bg-sage-calm/20 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 transform -rotate-12 w-36 h-36 bg-living-green/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
