'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your email service
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setEmail('')
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-living-green to-ocean-breath text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-[10%] left-[10%] w-8 h-10 opacity-10">
        <div 
          className="w-full h-full bg-no-repeat bg-contain animate-float-leaf"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 40'><path d='M15 5 Q22 15 25 25 Q22 35 15 38 Q8 35 5 25 Q8 15 15 5' fill='white' opacity='0.1'/></svg>")`
          }}
        />
      </div>
      
      <div className="absolute bottom-[20%] right-[15%] w-9 h-9 opacity-10">
        <div 
          className="w-full h-full bg-no-repeat bg-contain animate-float-flower"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='30' r='6' fill='white' opacity='0.1'/><circle cx='30' cy='50' r='5' fill='white' opacity='0.1'/><circle cx='70' cy='50' r='5' fill='white' opacity='0.1'/><circle cx='50' cy='70' r='6' fill='white' opacity='0.1'/></svg>")`
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10">
        <h2 className="font-crimson text-3xl lg:text-4xl mb-6">
          Weekly Mindfulness Inspiration
        </h2>
        <p className="text-lg opacity-90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Receive gentle reminders, practical tips, and exclusive insights delivered to your inbox every Wednesday. Join our community of mindful practitioners.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-grow px-6 py-4 rounded-full border-none text-deep-text placeholder-medium-text focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            disabled={isSubmitted}
            className="bg-forest-deep hover:bg-sage-calm text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitted ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>

        <p className="text-sm opacity-75 mt-6">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}
