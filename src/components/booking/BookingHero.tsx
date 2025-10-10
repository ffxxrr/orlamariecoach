import Link from 'next/link'

export default function BookingHero() {
  return (
    <section className="relative bg-gradient-to-br from-forest-deep to-sage-calm text-white py-16 px-4 overflow-hidden z-0">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='white' opacity='0.5'%3E%3Ccircle cx='20' cy='30' r='2'/%3E%3Ccircle cx='80' cy='20' r='1.5'/%3E%3Ccircle cx='60' cy='80' r='1'/%3E%3Ccircle cx='30' cy='70' r='1.5'/%3E%3Cpath d='M10 50 Q30 40 50 50 Q70 60 90 50' stroke='white' stroke-width='1' fill='none' opacity='0.2'/%3E%3C/svg%3E")`
          }}
        />
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="font-crimson text-4xl md:text-5xl font-light mb-6 leading-tight">
          Book Your Personalised Meditation Session
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Experience The OM Method with individual guidance tailored to your unique needs, 
          goals, and lifestyle. Transform stress into peace with authentic Celtic wisdom 
          and modern techniques.
        </p>
        
        <div className="flex flex-wrap gap-8 justify-center my-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
              🌍
            </div>
            <span className="text-white font-medium">Global Timezone Support</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
              🎯
            </div>
            <span className="text-white font-medium">Personalised Approach</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
              ✨
            </div>
            <span className="text-white font-medium">Energy Healing Integration</span>
          </div>
        </div>
        
        <div className="mt-8">
          <p className="text-white/90">
            Have questions first?{' '}
            <Link 
              href="/contact" 
              className="text-white hover:underline font-medium"
            >
              Get personalised guidance before booking →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
