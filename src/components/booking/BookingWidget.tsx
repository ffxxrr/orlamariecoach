'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { PhoneIcon, CheckIcon, SeedBullet } from '@/components/brand/CelticIcons'
import CelticDivider from '@/components/ui/CelticDivider'

export default function BookingWidget() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="relative py-24 md:py-32 px-6 bg-living-green/20 overflow-hidden" id="booking-widget">
      {/* Celtic dividers */}
      <CelticDivider position="top" />
      <CelticDivider position="bottom" />

      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`font-crimson text-3xl md:text-4xl text-forest-deep mb-4 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
          >
            Schedule Your Session
          </h2>

          <p
            className={`text-medium-text max-w-2xl mx-auto ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '100ms' }}
          >
            Choose your preferred time and complete secure payment.
            You'll receive confirmation with all session details within minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Booking Steps */}
          <div
            className={`lg:col-span-2 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-living-green/10">
              <h3 className="font-crimson text-2xl text-forest-deep mb-6">
                Booking Process
              </h3>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-7 h-7 bg-living-green rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-forest-deep font-medium mb-1">Select Your Session</h4>
                    <p className="text-sm text-medium-text">
                      Choose between individual session or 6-session package based on your needs and goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-7 h-7 bg-living-green rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-forest-deep font-medium mb-1">Pick Your Time</h4>
                    <p className="text-sm text-medium-text">
                      Select from available slots that work with your timezone and schedule preferences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-7 h-7 bg-living-green rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-forest-deep font-medium mb-1">Complete Details</h4>
                    <p className="text-sm text-medium-text">
                      Provide basic information and any specific goals or challenges you'd like to focus on.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-7 h-7 bg-living-green rounded-full flex items-center justify-center text-white font-medium flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-forest-deep font-medium mb-1">Secure Payment</h4>
                    <p className="text-sm text-medium-text">
                      Complete payment via Revolut or PayPal with full security and instant confirmation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-pure-light rounded-lg p-4">
                <h4 className="flex items-center gap-2 text-forest-deep font-medium mb-3">
                  <PhoneIcon size={20} />
                  Booking Support
                </h4>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-medium-text">
                    <CheckIcon size={16} className="text-living-green flex-shrink-0" />
                    Instant email confirmation
                  </li>
                  <li className="flex items-center gap-2 text-sm text-medium-text">
                    <CheckIcon size={16} className="text-living-green flex-shrink-0" />
                    Calendar invitation with video link
                  </li>
                  <li className="flex items-center gap-2 text-sm text-medium-text">
                    <CheckIcon size={16} className="text-living-green flex-shrink-0" />
                    Pre-session preparation guide
                  </li>
                  <li className="flex items-center gap-2 text-sm text-medium-text">
                    <CheckIcon size={16} className="text-living-green flex-shrink-0" />
                    24/7 technical support
                  </li>
                  <li className="flex items-center gap-2 text-sm text-medium-text">
                    <CheckIcon size={16} className="text-living-green flex-shrink-0" />
                    Flexible rescheduling options
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Widget */}
          <div
            className={`lg:col-span-3 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '250ms' }}
          >
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-living-green/10 h-full flex flex-col items-center justify-center text-center">
              <div className="max-w-md mx-auto">
                <h3 className="font-crimson text-2xl text-forest-deep mb-4">
                  Digital Samba Booking Interface
                </h3>

                <p className="text-medium-text mb-8">
                  Interactive booking calendar with real-time availability, session selection,
                  and integrated payment processing.
                </p>

                <div className="bg-pure-light rounded-lg p-4 mb-8 text-left">
                  <h4 className="text-forest-deep font-medium mb-3">Widget Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <SeedBullet size={8} className="text-living-green flex-shrink-0 mt-1.5" />
                      Real-time calendar availability
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <SeedBullet size={8} className="text-living-green flex-shrink-0 mt-1.5" />
                      Session type selection (Individual/Package)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <SeedBullet size={8} className="text-living-green flex-shrink-0 mt-1.5" />
                      Timezone automatic detection
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <SeedBullet size={8} className="text-living-green flex-shrink-0 mt-1.5" />
                      Personal information collection
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <SeedBullet size={8} className="text-living-green flex-shrink-0 mt-1.5" />
                      Goals and preferences questionnaire
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <SeedBullet size={8} className="text-living-green flex-shrink-0 mt-1.5" />
                      Secure payment processing
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <SeedBullet size={8} className="text-living-green flex-shrink-0 mt-1.5" />
                      Instant confirmation system
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <SeedBullet size={8} className="text-living-green flex-shrink-0 mt-1.5" />
                      Automatic email notifications
                    </li>
                  </ul>
                </div>

                <div
                  className="w-full bg-gradient-to-r from-forest-deep to-sage-calm text-white font-medium
                           py-3 px-6 rounded-lg text-center"
                >
                  Digital Samba Integration Placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
