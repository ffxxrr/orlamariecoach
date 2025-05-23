import Link from 'next/link'

export default function FeaturedCourse() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-sage-calm to-forest-deep text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-5 left-5 w-10 h-16 opacity-10">
        <div 
          className="w-full h-full bg-no-repeat bg-contain animate-sway"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 60'><path d='M20 10 Q30 20 35 35 Q30 50 20 55 Q10 50 5 35 Q10 20 20 10' fill='white' opacity='0.1'/><circle cx='22' cy='25' r='2' fill='white' opacity='0.15'/><circle cx='18' cy='40' r='1.5' fill='white' opacity='0.15'/></svg>")`
          }}
        />
      </div>
      
      <div className="absolute bottom-8 right-8 w-12 h-12 opacity-10">
        <div 
          className="w-full h-full bg-no-repeat bg-contain animate-float-flower"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='30' r='6' fill='white' opacity='0.1'/><circle cx='30' cy='50' r='5' fill='white' opacity='0.1'/><circle cx='70' cy='50' r='5' fill='white' opacity='0.1'/><circle cx='50' cy='70' r='6' fill='white' opacity='0.1'/></svg>")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Course Info */}
          <div className="space-y-6">
            <h2 className="font-crimson text-3xl lg:text-4xl mb-6">
              Mindfulness Foundations
            </h2>
            <p className="text-lg opacity-90 leading-relaxed">
              A comprehensive 8-week programme designed to introduce you to the core practices of mindfulness meditation. Perfect for beginners or anyone looking to establish a consistent practice.
            </p>
            
            {/* Course Features */}
            <div className="flex flex-wrap gap-4 my-8">
              {['8 Weeks', 'Video Lessons', 'Guided Audio', 'Community Access'].map((feature, index) => (
                <span 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>

            <Link 
              href="/courses"
              className="inline-block bg-white text-forest-deep px-8 py-4 rounded-full font-medium hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Enrol Now - £250
            </Link>
          </div>

          {/* Course Preview */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md h-80 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="text-6xl opacity-80">▶️</div>
              
              {/* Preview overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Course stats overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-semibold">8</div>
                    <div className="text-xs opacity-80">Modules</div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold">3hrs</div>
                    <div className="text-xs opacity-80">Content</div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold">∞</div>
                    <div className="text-xs opacity-80">Access</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
