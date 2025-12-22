'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'

const services = [
  {
    title: '1-on-1 Sessions',
    description: 'Personalised meditation guidance tailored to your specific needs, challenges, and goals. Experience the power of individual attention in a supportive, non-judgmental environment.',
    link: '/book-session',
    gradient: 'from-forest-deep to-sage-calm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )
  },
  {
    title: 'Online Courses',
    description: 'Self-paced learning programmes that guide you step-by-step through foundational meditation practices. Learn at your own rhythm with lifetime access to comprehensive materials.',
    link: '/courses',
    gradient: 'from-living-green to-sage-calm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    )
  },
  {
    title: 'Group Workshops',
    description: 'Connect with like-minded individuals in supportive group settings. Experience the power of community whilst learning practical techniques for daily life.',
    link: '/contact',
    gradient: 'from-earth-warmth to-living-green',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    )
  }
]

export default function Services() {
  return (
    <section className="py-16 lg:py-24 bg-white relative">
      {/* Decorative Element - Earthy palette */}
      <div className="absolute top-8 left-[5%] w-10 h-10 opacity-20">
        <div
          className="w-full h-full bg-no-repeat bg-contain"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='M20 80 Q30 20 50 30 Q70 20 80 80 Q70 60 50 70 Q30 60 20 80' fill='%23C9A475' opacity='0.2'/></svg>")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="font-crimson text-3xl lg:text-4xl text-forest-deep mb-6">
              How I Can Help You Find Peace
            </h2>
            <p className="text-lg text-medium-text max-w-3xl mx-auto leading-relaxed">
              Whether you&apos;re completely new to meditation or looking to deepen your practice, I offer personalised approaches that honour your unique journey.
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} animation="fadeInUp" delay={index * 150}>
              <div
                className="group bg-white p-8 rounded-xl shadow-sm border border-light-border hover:shadow-md hover:-translate-y-2 transition-all duration-300 relative overflow-hidden h-full"
              >
                {/* Hover decoration - Earthy palette */}
                <div className="absolute -top-2 -right-2 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="w-full h-full bg-no-repeat bg-contain animate-float-flower"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='30' r='8' fill='%23F1CBB8' opacity='0.3'/><circle cx='30' cy='50' r='6' fill='%23C9A475' opacity='0.3'/><circle cx='70' cy='50' r='6' fill='%236E5A2F' opacity='0.3'/><circle cx='50' cy='70' r='8' fill='%23F1CBB8' opacity='0.3'/></svg>")`
                    }}
                  />
                </div>

                {/* Service Icon - Decorative gradient circle */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${service.gradient} mb-6 mx-auto flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
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
                  <Link href={service.link} className="inline-block">
                    <span className="sr-only">Learn more about {service.title}</span>
                    <div className="bg-gradient-to-r from-forest-deep to-sage-calm text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                      Learn More
                    </div>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
