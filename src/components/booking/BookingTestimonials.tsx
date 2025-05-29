const testimonials = [
  {
    id: 1,
    quote: "Orla's approach is so different from anything I'd tried before. The combination of practical techniques with Celtic wisdom created something truly special. I finally found peace with my anxiety.",
    name: "Sarah M.",
    role: "6-Session Package Client",
    initial: "S"
  },
  {
    id: 2,
    quote: "As a complete beginner, I was nervous about meditation. Orla made it so accessible and personal. The energy healing aspect was unexpected but incredibly powerful.",
    name: "Michael R.",
    role: "Individual Session Client",
    initial: "M"
  },
  {
    id: 3,
    quote: "The personalised approach made all the difference. Instead of generic advice, I got techniques specifically chosen for my lifestyle and challenges. Life-changing experience.",
    name: "Linda K.",
    role: "Returning Client",
    initial: "L"
  }
]

export default function BookingTestimonials() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-4">
            What Clients Say About Their Sessions
          </h2>
          
          <p className="text-medium-text max-w-2xl mx-auto">
            Real transformations from people who've experienced The OM Method 
            approach to meditation and mindfulness.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-pure-light rounded-xl p-6 shadow-md border border-living-green/10
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-medium-text italic mb-6">
                "{testimonial.quote}"
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sage-calm to-living-green rounded-full 
                               flex items-center justify-center text-white font-medium text-xl">
                  {testimonial.initial}
                </div>
                
                <div>
                  <h4 className="text-forest-deep font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-medium-text">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
