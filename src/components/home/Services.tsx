import Link from 'next/link'

const services = [
  {
    icon: '🧘‍♀️',
    title: '1-on-1 Sessions',
    description: 'Personalised meditation guidance tailored to your specific needs, challenges, and goals. Experience the power of individual attention in a supportive, non-judgmental environment.',
    link: '/book-session',
    gradient: 'from-forest-deep to-sage-calm'
  },
  {
    icon: '📚',
    title: 'Online Courses',
    description: 'Self-paced learning programmes that guide you step-by-step through foundational meditation practices. Learn at your own rhythm with lifetime access to comprehensive materials.',
    link: '/courses',
    gradient: 'from-living-green to-sage-calm'
  },
  {
    icon: '👥',
    title: 'Group Workshops',
    description: 'Connect with like-minded individuals in supportive group settings. Experience the power of community whilst learning practical techniques for daily life.',
    link: '/workshops',
    gradient: 'from-ocean-breath to-living-green'
  }
]

export default function Services() {
  return (
    <section className="py-16 lg:py-24 bg-white relative">
      {/* Decorative Element */}
      <div className="absolute top-8 left-[5%] w-10 h-10 opacity-20">
        <div 
          className="w-full h-full bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M20 80 Q30 20 50 30 Q70 20 80 80 Q70 60 50 70 Q30 60 20 80' fill='%237fb069' opacity='0.2'/></svg>")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-crimson text-3xl lg:text-4xl text-forest-deep mb-6">
            How I Can Help You Find Peace
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto leading-relaxed">
            Whether you&apos;re completely new to meditation or looking to deepen your practice, I offer personalised approaches that honour your unique journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white p-8 rounded-xl shadow-sm border border-light-border hover:shadow-md hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover decoration */}
              <div className="absolute -top-2 -right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div 
                  className="w-full h-full bg-no-repeat bg-contain animate-float-flower"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='30' r='8' fill='%23d4a574' opacity='0.3'/><circle cx='30' cy='50' r='6' fill='%237fb069' opacity='0.3'/><circle cx='70' cy='50' r='6' fill='%235a9bb5' opacity='0.3'/><circle cx='50' cy='70' r='8' fill='%23d4a574' opacity='0.3'/></svg>")`
                  }}
                />
              </div>

              {/* Service Icon */}
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center text-3xl text-white mb-6 mx-auto`}>
                {service.icon}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="font-crimson text-xl font-medium text-forest-deep mb-4">
                  {service.title}
                </h3>
                <p className="text-medium-text mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  href={service.link}
                  className="inline-block bg-gradient-to-r from-forest-deep to-sage-calm text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
