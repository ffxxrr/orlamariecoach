import Link from 'next/link'

export default function About() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-pure-light via-light-border/50 to-pure-light relative">
      {/* Decorative Element */}
      <div className="absolute bottom-[10%] right-[5%] w-16 h-20 opacity-15">
        <div 
          className="w-full h-full bg-no-repeat bg-contain animate-sway"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 80'><path d='M30 5 Q45 25 50 45 Q45 65 30 75 Q15 65 10 45 Q15 25 30 5' fill='%234a7c59' opacity='0.15'/><path d='M30 5 L30 75' stroke='%232d5a27' stroke-width='2' opacity='0.2'/><circle cx='35' cy='20' r='2' fill='%237fb069' opacity='0.3'/><circle cx='25' cy='35' r='1.5' fill='%235a9bb5' opacity='0.3'/><circle cx='35' cy='50' r='2' fill='%23d4a574' opacity='0.3'/></svg>")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image/Avatar */}
          <div className="relative">
            <div className="w-full max-w-md mx-auto h-96 lg:h-[400px] bg-gradient-to-br from-sage-calm to-living-green rounded-2xl flex items-center justify-center text-white relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-3 left-3 w-6 h-6 opacity-30">
                <div 
                  className="w-full h-full bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='25' r='8' fill='white' opacity='0.3'/><circle cx='25' cy='50' r='6' fill='white' opacity='0.3'/><circle cx='75' cy='50' r='6' fill='white' opacity='0.3'/><circle cx='50' cy='75' r='8' fill='white' opacity='0.3'/></svg>")`
                  }}
                />
              </div>
              <div className="text-8xl relative z-10">🧘‍♀️</div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="font-crimson text-3xl lg:text-4xl text-forest-deep">
              Meet Orla Marie
            </h2>
            
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="text-medium-text">
                Hello, I&apos;m Orla, and I believe that{' '}
                <span className="text-forest-deep font-medium">everyone has the capacity for inner peace</span>
                {' '}– sometimes we just need the right guidance to discover it.
              </p>
              
              <p className="text-medium-text">
                My journey to meditation began during a particularly challenging period in my life. Through consistent practice and dedicated study, I discovered how powerful mindfulness can be in transforming not just our minds, but our entire experience of living.
              </p>
              
              <p className="text-medium-text">
                Now, I&apos;m passionate about sharing these ancient practices in a way that feels{' '}
                <span className="text-forest-deep font-medium">authentic, accessible, and deeply personal</span>
                {' '}to each person I work with.
              </p>
            </div>

            {/* Credentials */}
            <div className="bg-white p-6 rounded-xl border border-light-border shadow-sm">
              <h3 className="font-crimson text-lg font-medium text-forest-deep mb-4">
                Qualifications & Training
              </h3>
              <ul className="space-y-2 text-medium-text">
                <li className="flex items-center space-x-2">
                  <span className="text-living-green">✓</span>
                  <span>Certified Meditation Teacher</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-living-green">✓</span>
                  <span>Mindfulness-Based Stress Reduction (MBSR)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-living-green">✓</span>
                  <span>Mindfulness for Kids Certified</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-living-green">✓</span>
                  <span>500+ hours of teaching experience</span>
                </li>
              </ul>
            </div>

            <Link 
              href="/about"
              className="inline-block bg-transparent border-2 border-forest-deep text-forest-deep px-8 py-3 rounded-full font-medium hover:bg-forest-deep hover:text-white transition-all duration-300"
            >
              Read My Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
