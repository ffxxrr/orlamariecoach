'use client'

import { useState, useRef } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import CelticDivider from '@/components/ui/CelticDivider'
import { useEventTracker } from '@/components/ui/AnalyticsProvider'

export default function ContactForm() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const { trackContactInteraction, trackConversion } = useEventTracker()
  const hasStartedForm = useRef(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: '',
    experience: '',
    message: '',
    newsletter: false,
    privacy: false
  })

  const handleFormStart = () => {
    if (!hasStartedForm.current) {
      hasStartedForm.current = true
      trackContactInteraction('form_started')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Track form submission
    trackContactInteraction('form_submitted', {
      inquiryType: formData.inquiryType,
      experience: formData.experience,
      newsletterOptIn: formData.newsletter
    })
    trackConversion('course_enquiry', {
      source: 'contact_form',
      inquiryType: formData.inquiryType
    })

    console.log('Form submitted:', formData)
    alert('Thank you for your message! I will respond within 24 hours.')
    hasStartedForm.current = false
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      inquiryType: '',
      experience: '',
      message: '',
      newsletter: false,
      privacy: false
    })
  }

  return (
    <section className="relative py-24 md:py-32 bg-living-green/20 overflow-hidden" id="contact-form">
      {/* Celtic dividers */}
      <CelticDivider position="top" />
      <CelticDivider position="bottom" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            ref={ref}
            className={`text-sm uppercase tracking-[0.2em] text-living-green mb-4 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
          >
            Send a Message
          </p>
          <h2
            className={`font-crimson text-3xl md:text-4xl lg:text-5xl text-forest-deep leading-tight ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '100ms' }}
          >
            Ask your questions
          </h2>
          <p
            className={`mt-4 text-sage-calm max-w-xl mx-auto ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } transition-all duration-700`}
            style={{ transitionDelay: '150ms' }}
          >
            I read and personally respond to every message.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`bg-white/70 backdrop-blur-sm rounded-2xl p-8 lg:p-10 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          } transition-all duration-1000`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-forest-deep font-medium mb-2 text-sm">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={handleFormStart}
                required
                className="w-full px-4 py-3 bg-white border border-earth-warmth/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50 transition-all"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-forest-deep font-medium mb-2 text-sm">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-earth-warmth/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50 transition-all"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="email" className="block text-forest-deep font-medium mb-2 text-sm">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-earth-warmth/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="inquiryType" className="block text-forest-deep font-medium mb-2 text-sm">
                What can I help with?
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-earth-warmth/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50 transition-all"
              >
                <option value="">Please select...</option>
                <option value="getting-started">Getting started with meditation</option>
                <option value="course-info">Course information</option>
                <option value="session-info">Session information</option>
                <option value="corporate">Corporate programmes</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="experience" className="block text-forest-deep font-medium mb-2 text-sm">
                Your experience level
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-earth-warmth/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50 transition-all"
              >
                <option value="">Please select...</option>
                <option value="beginner">Complete beginner</option>
                <option value="some">Some experience</option>
                <option value="regular">Regular practitioner</option>
                <option value="experienced">Experienced</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="block text-forest-deep font-medium mb-2 text-sm">
              Your Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Tell me about your goals or ask any questions you have..."
              className="w-full px-4 py-3 bg-white border border-earth-warmth/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50 transition-all resize-none"
            />
          </div>

          <div className="mt-6 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleCheckboxChange}
                className="mt-1"
              />
              <span className="text-sage-calm text-sm">
                Send me occasional meditation insights and updates (optional)
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="privacy"
                checked={formData.privacy}
                onChange={handleCheckboxChange}
                required
                className="mt-1"
              />
              <span className="text-sage-calm text-sm">
                I agree to the privacy policy *
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-forest-deep text-white font-medium py-4 px-6 rounded-full hover:bg-sage-calm transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}
