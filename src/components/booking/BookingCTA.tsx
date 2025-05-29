import Link from 'next/link'

export default function BookingCTA() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-forest-deep to-sage-calm text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='white' opacity='0.5'%3E%3Ccircle cx='20' cy='30' r='2'/%3E%3Ccircle cx='80' cy='20' r='1.5'/%3E%3Ccircle cx='60' cy='80' r='1'/%3E%3Ccircle cx='30' cy='70' r='1.5'/%3E%3Cpath d='M10 50 Q30 40 50 50 Q70 60 90 50' stroke='white' stroke-width='1' fill='none' opacity='0.2'/%3E%3C/svg%3E")`
          }}
        />
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-crimson text-3xl md:text-4xl font-light mb-6">
          Your Transformation Starts Today
        </h2>
        
        <p className="text-white/90 mb-10 max-w-2xl mx-auto">
          Take the first step toward lasting peace and clarity. Book your personalised 
          meditation session and discover how The OM Method can transform your relationship 
          with stress and bring authentic calm to your life.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="#booking-widget"
            className="bg-white text-forest-deep font-medium px-8 py-4 rounded-full 
                     hover:bg-pure-light hover:-translate-y-1 transition-all duration-300"
          >
            Schedule Your Session
          </Link>
          
          <Link
            href="/contact"
            className="bg-transparent border-2 border-white text-white font-medium px-8 py-4 rounded-full 
                     hover:bg-white hover:text-forest-deep hover:-translate-y-1 transition-all duration-300"
          >
            Ask Questions First
          </Link>
        </div>
      </div>
    </section>
  )
}
