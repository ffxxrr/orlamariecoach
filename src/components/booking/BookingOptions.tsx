import Link from 'next/link'

const sessionOptions = [
  {
    id: 1,
    title: "Individual Session",
    subtitle: "Perfect for getting started or addressing specific needs",
    price: "€100",
    note: "per session",
    description: "Ideal for those new to meditation or looking to address specific challenges. You'll receive personalised technique matching, gentle guidance, and practical tools you can use immediately.",
    features: [
      "90 minutes of focused guidance",
      "Personalised technique matching",
      "Energy healing integration",
      "Post-session email summary",
      "3 days of follow-up support",
      "Celtic wisdom integration"
    ],
    cta: "Book Single Session",
    link: "#booking-widget",
    featured: false
  },
  {
    id: 2,
    title: "6-Session Package",
    subtitle: "Complete transformation journey with ongoing support",
    price: "€400",
    note: "save €200",
    description: "Transform your relationship with stress and discover lasting peace. This comprehensive package provides structured progression through The OM Method with continuous support and refinement.",
    features: [
      "6 × 90-minute sessions",
      "Progressive skill development",
      "Ongoing support between sessions",
      "Personalised practice plan",
      "Celtic spiritual guidance",
      "Lifetime email support",
      "Flexible scheduling over 6 months"
    ],
    cta: "Book Package Deal",
    link: "#booking-widget",
    featured: true
  }
]

export default function BookingOptions() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-4">
            Choose Your Session Experience
          </h2>
          
          <p className="text-medium-text max-w-2xl mx-auto">
            Whether you're looking for a single transformative session or ongoing support, 
            each option includes personalised guidance using The OM Method approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sessionOptions.map((option) => (
            <div 
              key={option.id}
              className={`relative bg-pure-light rounded-xl p-6 md:p-8 border border-living-green/10
                         ${option.featured ? 'transform md:scale-105 bg-gradient-to-br from-living-green to-sage-calm text-white' : ''}
                         shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
            >
              {option.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-forest-deep 
                               text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h3 className={`font-crimson text-2xl ${option.featured ? 'text-white' : 'text-forest-deep'} mb-1`}>
                    {option.title}
                  </h3>
                  <p className={option.featured ? 'text-white/90' : 'text-medium-text'}>
                    {option.subtitle}
                  </p>
                </div>
                
                <div className="mt-4 md:mt-0 text-right">
                  <div className={`font-crimson text-3xl font-semibold ${option.featured ? 'text-white' : 'text-forest-deep'}`}>
                    {option.price}
                  </div>
                  <div className={option.featured ? 'text-white/80 text-sm' : 'text-medium-text text-sm'}>
                    {option.note}
                  </div>
                </div>
              </div>
              
              <div className={`${option.featured ? 'bg-white/20' : 'bg-white/70'} rounded-lg p-4 mb-6`}>
                <p className={option.featured ? 'text-white/90' : 'text-medium-text'}>
                  {option.description}
                </p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2
                                   ${option.featured ? 'bg-white' : 'bg-living-green'}`}>
                    </div>
                    <span className={option.featured ? 'text-white/90' : 'text-medium-text'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Link
                href={option.link}
                className={`block w-full text-center py-3 px-6 rounded-lg font-medium transition-all duration-300
                          ${option.featured 
                            ? 'bg-white text-forest-deep hover:bg-pure-light' 
                            : 'bg-forest-deep text-white hover:bg-sage-calm'}`}
              >
                {option.cta}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10 text-medium-text">
          <p className="font-medium">
            All sessions include: Secure video calls via Digital Samba, global timezone accommodation, 
            and payment via Revolut or PayPal. Sessions are recorded for your reference (with permission).
          </p>
        </div>
      </div>
    </section>
  )
}
