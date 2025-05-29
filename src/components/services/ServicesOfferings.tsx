import Link from 'next/link'
import Image from 'next/image'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

const services = [
  {
    id: 1,
    title: "One-to-One OM Method Sessions",
    description: "Personalised mindfulness coaching tailored to your unique needs and goals. Whether you're a beginner or experienced practitioner, these sessions provide focused guidance to deepen your practice.",
    price: "€100 per session",
    features: [
      "60-minute personalised coaching",
      "Customised meditation techniques",
      "Progress tracking and adjustments",
      "Email support between sessions",
      "Flexible scheduling options"
    ],
    image: "/images/services/one-to-one.webp",
    cta: "Book Your Session",
    link: "/book-session"
  },
  {
    id: 2,
    title: "The OM Method Foundation Course",
    description: "A comprehensive 8-week programme that provides a structured introduction to mindfulness meditation using The OM Method framework. Perfect for beginners or those wanting to establish a consistent practice.",
    price: "€250 per course",
    features: [
      "8 weekly group sessions (90 minutes each)",
      "Small groups of 6-12 participants",
      "Guided meditations and exercises",
      "Course materials and recordings",
      "Private community support"
    ],
    image: "/images/services/group-course.webp",
    cta: "Explore Course Details",
    link: "/courses/foundation"
  },
  {
    id: 3,
    title: "Corporate OM Method Programmes",
    description: "Bring mindfulness to your workplace with customised programmes designed to reduce stress, enhance focus, and improve wellbeing across your team. Available as workshops, courses, or retreat days.",
    price: "Custom pricing based on requirements",
    features: [
      "Tailored to your organisation's needs",
      "Flexible delivery options (in-person/online)",
      "Evidence-based techniques for workplace focus",
      "Progress measurement and reporting",
      "Integration with existing wellbeing initiatives"
    ],
    image: "/images/services/corporate.webp",
    cta: "Request Corporate Information",
    link: "/corporate"
  }
]

export default function ServicesOfferings() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-12">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={service.id === 1 ? '/images/orla/optimized/service/7R500325.webp' :
                         service.id === 2 ? '/images/orla/optimized/service/7R500126.webp' :
                         '/images/orla/optimized/service/7R500362.webp'}
                    alt={service.title}
                    width={600}
                    height={450}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              <div className={`${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                <h2 className="font-crimson text-2xl md:text-3xl text-forest-deep mb-3">
                  {service.title}
                </h2>
                
                <p className="text-medium-text mb-4">
                  {service.description}
                </p>
                
                <div className="bg-pure-light rounded-lg p-4 mb-6">
                  <div className="text-forest-deep font-medium mb-2">
                    {service.price}
                  </div>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-medium-text">
                        <span className="text-forest-deep">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href={service.link}
                  className="btn btn-primary inline-block"
                >
                  {service.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
