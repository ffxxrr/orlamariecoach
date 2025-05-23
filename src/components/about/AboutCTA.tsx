import Link from 'next/link'

export default function AboutCTA() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6">
          Ready to Begin Your Mindfulness Journey?
        </h2>
        
        <p className="text-medium-text mb-10 max-w-2xl mx-auto">
          Whether you're seeking personal growth, stress reduction, or simply curious about 
          meditation, I'm here to support your unique path to mindfulness with The OM Method.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/services"
            className="btn btn-secondary px-8 py-4"
          >
            Explore Services
          </Link>
          
          <Link 
            href="/book-session"
            className="btn btn-primary px-8 py-4"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </section>
  )
}
