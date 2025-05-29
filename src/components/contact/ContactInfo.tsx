import Link from 'next/link'

const contactInfo = [
  {
    id: 1,
    icon: "📧",
    title: "Direct Email",
    content: (
      <>
        <a href="mailto:admin@orlamariecoach.com" className="text-forest-deep hover:underline">admin@orlamariecoach.com</a><br />
        Personal response within 24 hours
      </>
    )
  },
  {
    id: 2,
    icon: "⏰",
    title: "Response Time",
    content: (
      <>
        Typically respond within 12-24 hours<br />
        All messages answered personally by Orla
      </>
    )
  },
  {
    id: 3,
    icon: "🍀",
    title: "Based in Ireland",
    content: (
      <>
        Donegal, Ireland (GMT timezone)<br />
        Serving clients globally online
      </>
    )
  },
  {
    id: 4,
    icon: "🎯",
    title: "Ready to Start?",
    content: (
      <>
        <Link href="/book-session" className="text-forest-deep hover:underline">Book a personalised session</Link><br />
        Direct path to one-on-one guidance
      </>
    )
  }
]

export default function ContactInfo() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-4">
            Other Ways to Connect
          </h2>
          
          <p className="text-medium-text max-w-2xl mx-auto">
            Multiple options to suit your communication preferences and needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info) => (
            <div 
              key={info.id}
              className="bg-pure-light rounded-xl p-6 text-center shadow-sm border border-living-green/10
                         hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-sage-calm to-living-green rounded-full 
                              flex items-center justify-center text-white text-2xl mb-4 mx-auto">
                <span>{info.icon}</span>
              </div>
              
              <h3 className="font-crimson text-xl text-forest-deep mb-3">
                {info.title}
              </h3>
              
              <p className="text-medium-text">
                {info.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
