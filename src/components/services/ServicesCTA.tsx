import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function ServicesCTA() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6">
          Begin Your OM Method Journey
        </h2>
        
        <p className="text-medium-text mb-10 max-w-2xl mx-auto">
          Ready to experience the transformative benefits of mindfulness with personalised guidance? 
          Choose the path that best suits your needs and take the first step today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/book-session">
            <Button size="md" variant="primary">Book a Session</Button>
          </Link>
          <Link href="/contact">
            <Button size="md" variant="secondary">Ask a Question</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
