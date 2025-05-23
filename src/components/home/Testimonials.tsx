const testimonials = [
  {
    quote: "Orla's gentle guidance helped me find calm in the chaos of everyday life. Her approach is so authentic and grounded – exactly what I needed.",
    author: "Sarah Murphy",
    location: "Working Mother, Dublin",
    initials: "SM"
  },
  {
    quote: "I was sceptical about meditation, but Orla's practical approach made it accessible. The techniques I learned have genuinely changed how I handle stress.",
    author: "David Chen",
    location: "Business Owner, Cork",
    initials: "DC"
  },
  {
    quote: "The online course was beautifully structured. Orla's voice is so calming, and I love that I can practise at my own pace whilst still feeling supported.",
    author: "Emma O'Brien",
    location: "Teacher, Galway",
    initials: "EO"
  }
]

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-white relative">
      {/* Decorative Element */}
      <div className="absolute top-[15%] right-[8%] w-12 h-12 opacity-20">
        <div 
          className="w-full h-full bg-no-repeat bg-contain animate-float-leaf"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M30 20 Q50 10 70 20 Q80 40 70 60 Q50 70 30 60 Q20 40 30 20' fill='%237fb069' opacity='0.1'/><circle cx='45' cy='35' r='3' fill='%235a9bb5' opacity='0.2'/><circle cx='55' cy='45' r='2' fill='%23d4a574' opacity='0.2'/></svg>")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-crimson text-3xl lg:text-4xl text-forest-deep mb-6">
            What My Clients Say
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto leading-relaxed">
            Real transformations from people who&apos;ve found their path to inner peace
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-pure-light via-light-border/30 to-pure-light p-8 rounded-xl border-l-4 border-living-green hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative"
            >
              {/* Decorative Element */}
              <div className="absolute top-4 right-4 w-5 h-5 opacity-40">
                <div 
                  className="w-full h-full bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='30' r='5' fill='%237fb069' opacity='0.4'/><circle cx='30' cy='50' r='4' fill='%235a9bb5' opacity='0.4'/><circle cx='70' cy='50' r='4' fill='%23d4a574' opacity='0.4'/><circle cx='50' cy='70' r='5' fill='%237fb069' opacity='0.4'/></svg>")`
                  }}
                />
              </div>

              {/* Quote */}
              <blockquote className="font-crimson text-lg italic text-sage-calm mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-sage-calm rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-deep-text font-semibold mb-1">
                    {testimonial.author}
                  </h4>
                  <p className="text-medium-text text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
