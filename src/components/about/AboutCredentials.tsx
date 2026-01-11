'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import CelticDivider from '@/components/ui/CelticDivider'

const credentials = [
  {
    title: 'Creative Mindfulness Ireland',
    description: 'Certified practitioner bringing creativity and imagination into mindfulness practice, helping clients discover their own unique path to presence.',
  },
  {
    title: 'Psychotherapy Background',
    description: 'Trained in psychotherapy at the University of Manchester, bringing a deep understanding of the therapeutic relationship to mindfulness practice.',
  },
  {
    title: 'Kids Mindfulness',
    description: 'Specialised training in teaching mindfulness to children and adolescents, with age-appropriate techniques for developing attention and emotional regulation.',
  },
  {
    title: '500+ Teaching Hours',
    description: 'Extensive experience across group classes, workshops, corporate programmes, and one-to-one coaching sessions throughout Ireland and online.',
  },
  {
    title: 'Your Anam Chara',
    description: 'The ancient Irish tradition of the soul friend—human-guided presence that walks beside you, offering a circular approach to mindfulness where there are no corners for worry to hide.',
  },
]

export default function AboutCredentials() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="relative py-32 md:py-40 bg-living-green/20">
      {/* Celtic dividers */}
      <CelticDivider position="top" />
      <CelticDivider position="bottom" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className={`text-sm uppercase tracking-[0.2em] text-living-green mb-4 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
          >
            Qualifications
          </p>
          <h2
            ref={ref}
            className={`font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep leading-tight ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '100ms' }}
          >
            Training & Experience
          </h2>
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {credentials.map((credential, index) => (
            <div
              key={credential.title}
              className={`bg-white/70 backdrop-blur-sm rounded-2xl p-8 lg:p-10 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } transition-all duration-700`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-forest-deep rounded-full flex-shrink-0 mt-2" />
                <div>
                  <h3 className="font-crimson text-xl lg:text-2xl text-forest-deep mb-3">
                    {credential.title}
                  </h3>
                  <p className="text-sage-calm leading-relaxed">
                    {credential.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
