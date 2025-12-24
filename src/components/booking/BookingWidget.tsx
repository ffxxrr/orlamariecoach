'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

export default function BookingWidget() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section className="py-16 px-4 bg-pure-light" id="booking-widget">
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
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Booking Support
                </h4>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-medium-text">
                    <div className="w-4 h-4 bg-living-green rounded-full flex items-center justify-center text-white text-xs">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Instant email confirmation
                  </li>
                  <li className="flex items-center gap-2 text-sm text-medium-text">
                    <div className="w-4 h-4 bg-living-green rounded-full flex items-center justify-center text-white text-xs">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Calendar invitation with video link
                  </li>
                  <li className="flex items-center gap-2 text-sm text-medium-text">
                    <div className="w-4 h-4 bg-living-green rounded-full flex items-center justify-center text-white text-xs">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    Pre-session preparation guide
                  </li>
                  <li className="flex items-center gap-2 text-sm text-medium-text">
                    <div className="w-4 h-4 bg-living-green rounded-full flex items-center justify-center text-white text-xs">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    24/7 technical support
                  </li>
                  <li className="flex items-center gap-2 text-sm text-medium-text">
                    <div className="w-4 h-4 bg-living-green rounded-full flex items-center justify-center text-white text-xs">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
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
                      <span className="text-living-green font-bold">•</span>
                      Real-time calendar availability
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <span className="text-living-green font-bold">•</span>
                      Session type selection (Individual/Package)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <span className="text-living-green font-bold">•</span>
                      Timezone automatic detection
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <span className="text-living-green font-bold">•</span>
                      Personal information collection
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <span className="text-living-green font-bold">•</span>
                      Goals and preferences questionnaire
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <span className="text-living-green font-bold">•</span>
                      Secure payment processing
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <span className="text-living-green font-bold">•</span>
                      Instant confirmation system
                    </li>
                    <li className="flex items-start gap-2 text-sm text-medium-text">
                      <span className="text-living-green font-bold">•</span>
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
