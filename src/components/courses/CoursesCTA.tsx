import Link from 'next/link'

export default function CoursesCTA() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pure-light to-light-border relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-living-green/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage-calm/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6">
          Ready to Start Your Journey?
        </h2>
        
        <p className="text-medium-text mb-10 max-w-2xl mx-auto">
          Join hundreds of students who have transformed their lives through The OM Method courses.
          Begin your mindfulness journey today with expert guidance every step of the way.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact"
            className="btn btn-secondary px-8 py-4"
          >
            Ask a Question
          </Link>
          
          <Link 
            href="/booking"
            className="btn btn-primary px-8 py-4"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </section>
  )
}
