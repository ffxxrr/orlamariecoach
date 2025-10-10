import React from 'react'
import { CelticTriskelion } from '@/components/brand'

const pillarsLeft = [
  {
    icon: '🌱',
    title: 'Organic',
    description: 'Natural progression that honors your individual pace and authentic needs, allowing meditation to unfold organically in your life.'
  },
  {
    icon: '🧠',
    title: 'Mindful',
    description: 'Conscious awareness brought to every moment, cultivating a deeper understanding of your thoughts, emotions, and responses.'
  }
]

const pillarsRight = [
  {
    icon: '🌸',
    title: 'Compassionate',
    description: 'Gentle, non-judgmental approach that meets you exactly where you are, fostering growth through kindness and understanding.'
  },
  {
    icon: '🌊',
    title: 'Flowing',
    description: 'Adaptive practices that move with life\'s changes, creating sustainable habits that strengthen rather than strain your daily rhythm.'
  }
]

const benefits = [
  {
    icon: '⏰',
    title: 'Sustainable Practice',
    description: 'Build a meditation routine that fits naturally into your life without overwhelming your schedule.'
  },
  {
    icon: '🎯',
    title: 'Personal Relevance',
    description: 'Techniques adapted to your specific challenges, goals, and learning style for maximum effectiveness.'
  },
  {
    icon: '🌊',
    title: 'Gentle Progress',
    description: 'Compassionate approach that meets you where you are, fostering growth without pressure or judgment.'
  },
  {
    icon: '🔄',
    title: 'Lasting Change',
    description: 'Integration strategies that help meditation principles flow into all areas of your daily experience.'
  }
]

export default function OMMethod() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-light-border/30 via-pure-light to-light-border/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-[5%] left-[3%] w-12 h-16 opacity-15">
        <div 
          className="w-full h-full bg-no-repeat bg-contain animate-sway"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 70'><path d='M25 10 Q35 25 40 45 Q35 65 25 68 Q15 65 10 45 Q15 25 25 10' fill='%234a7c59' opacity='0.15'/><circle cx='28' cy='30' r='2' fill='%237fb069' opacity='0.2'/><circle cx='22' cy='50' r='1.5' fill='%235a9bb5' opacity='0.2'/></svg>")`
          }}
        />
      </div>
      
      <div className="absolute bottom-[8%] right-[5%] w-16 h-16 opacity-15">
        <div 
          className="w-full h-full bg-no-repeat bg-contain animate-float-flower"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='30' r='8' fill='%23d4a574' opacity='0.1'/><circle cx='25' cy='55' r='6' fill='%237fb069' opacity='0.1'/><circle cx='75' cy='55' r='6' fill='%235a9bb5' opacity='0.1'/><circle cx='50' cy='75' r='5' fill='%23d4a574' opacity='0.1'/></svg>")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-crimson text-3xl lg:text-4xl text-forest-deep mb-6">
            The OM Method
          </h2>
          <p className="text-lg text-medium-text max-w-3xl mx-auto leading-relaxed">
            A unique approach that blends ancient wisdom with modern understanding, creating a pathway to lasting inner peace.
          </p>
        </div>

        {/* Method Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Pillars */}
          <div className="space-y-6 lg:order-1">
            {pillarsLeft.map((pillar, index) => (
              <div 
                key={index}
                className="group bg-white p-6 rounded-xl shadow-sm border border-light-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center relative overflow-hidden"
              >
                <div className="absolute -top-1 -right-1 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="w-full h-full bg-no-repeat bg-contain animate-float-flower"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='25' fill='%237fb069' opacity='0.1'/></svg>")`
                    }}
                  />
                </div>
                <div className="text-3xl mb-3">{pillar.icon}</div>
                <h3 className="font-crimson text-lg font-medium text-forest-deep mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-medium-text leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center OM Symbol */}
          <div className="flex justify-center items-center lg:order-2 order-first lg:mb-0 mb-8">
            <div className="relative">
              <div className="absolute -inset-3 border-2 border-living-green rounded-full opacity-30 animate-ripple" />
              <div className="w-60 h-60 lg:w-72 lg:h-72 bg-gradient-to-br from-forest-deep to-sage-calm rounded-full flex flex-col items-center justify-center text-white text-center shadow-2xl animate-gentle-pulse p-6">
                <div className="text-6xl lg:text-7xl font-light mb-1">ॐ</div>
                <div className="mb-2">
                  <CelticTriskelion size={48} className="mx-auto" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-crimson text-lg lg:text-xl font-medium leading-tight">
                    Balanced Integration
                  </h3>
                  <p className="text-sm lg:text-base opacity-90 leading-relaxed max-w-48">
                    The OM Method creates harmony between your inner world and daily life, making meditation not just a practice, but a way of being.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Pillars */}
          <div className="space-y-6 lg:order-3">
            {pillarsRight.map((pillar, index) => (
              <div 
                key={index}
                className="group bg-white p-6 rounded-xl shadow-sm border border-light-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center relative overflow-hidden"
              >
                <div className="absolute -top-1 -right-1 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="w-full h-full bg-no-repeat bg-contain animate-float-flower"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='25' fill='%237fb069' opacity='0.1'/></svg>")`
                    }}
                  />
                </div>
                <div className="text-3xl mb-3">{pillar.icon}</div>
                <h3 className="font-crimson text-lg font-medium text-forest-deep mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-medium-text leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Method Benefits */}
        <div className="text-center">
          <h3 className="font-crimson text-2xl lg:text-3xl text-forest-deep mb-12 font-medium">
            Why the OM Method Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-3xl mb-4 block">{benefit.icon}</div>
                <h4 className="font-crimson text-lg font-medium text-forest-deep mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm text-medium-text leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
