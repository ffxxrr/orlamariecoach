import Image from 'next/image'

export default function AboutCredentials() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pure-light to-light-border relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-living-green/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage-calm/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="max-w-6xl mx-auto">
        <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-6 text-center">
          Qualifications & Experience
        </h2>
        
        <div className="w-20 h-1 bg-forest-deep/20 mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/orla/optimized/about/teaching.webp"
                alt="Orla Marie teaching a meditation class"
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 transform rotate-12 w-40 h-40 bg-sage-calm/20 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 transform -rotate-12 w-32 h-32 bg-living-green/20 rounded-full -z-10"></div>
          </div>
          
          <div>
            <div className="space-y-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-forest-deep/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-forest-deep font-medium mb-2">MBSR Certification</h3>
                    <p className="text-medium-text">
                      Certified teacher of Mindfulness-Based Stress Reduction, the gold standard
                      evidence-based mindfulness programme developed at the University of Massachusetts Medical School.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-forest-deep/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👶</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-forest-deep font-medium mb-2">Kids Mindfulness Certification</h3>
                    <p className="text-medium-text">
                      Specialised training in teaching mindfulness to children and adolescents,
                      with age-appropriate techniques for developing attention and emotional regulation.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-forest-deep/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🧘‍♀️</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-forest-deep font-medium mb-2">Teaching Experience</h3>
                    <p className="text-medium-text">
                      Over 500 hours of teaching experience across group classes, workshops,
                      corporate programmes, and one-to-one coaching sessions throughout Ireland and online.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-forest-deep/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-forest-deep font-medium mb-2">The OM Method Developer</h3>
                    <p className="text-medium-text">
                      Creator of The OM Method, a personalised approach to mindfulness practice
                      that integrates traditional techniques with practical applications for modern life.
                    </p>
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
