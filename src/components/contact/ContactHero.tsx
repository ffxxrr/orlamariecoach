import Link from 'next/link'

export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-pure-light to-light-border py-16 px-4 text-center overflow-hidden z-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-60 z-0">
        <div 
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Cdefs%3E%3Cpattern id='contactPattern' x='0' y='0' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='15' cy='15' r='1' fill='%234a7c59' opacity='0.1'/%3E%3Ccircle cx='35' cy='35' r='1.5' fill='%237fb069' opacity='0.1'/%3E%3Cpath d='M10 25 Q25 20 40 25' stroke='%23d4a574' stroke-width='0.5' fill='none' opacity='0.15'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23contactPattern)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="font-crimson text-4xl md:text-5xl font-light text-forest-deep mb-6 leading-tight">
          Have Questions? Get Personalised Guidance
        </h1>
        
        <p className="text-lg text-medium-text mb-8 max-w-2xl mx-auto">
          Whether you're curious about meditation, need course recommendations, or want to understand 
          which approach might work best for you, I'm here to help with personalised guidance.
        </p>
        
        <div className="inline-block bg-forest-deep/10 text-forest-deep font-medium px-6 py-3 rounded-full mb-6 border border-forest-deep/20">
          ⚡ Personal response within 24 hours
        </div>
        
        <div className="mt-6">
          <p className="text-medium-text">
            Ready to book a session?{' '}
            <Link 
              href="/book-session" 
              className="text-forest-deep font-medium hover:underline"
            >
              Schedule your personalised meditation session →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
