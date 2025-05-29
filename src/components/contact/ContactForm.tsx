'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: '',
    experience: '',
    challenges: '',
    message: '',
    newsletter: false,
    privacy: false
  })

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
    
    // Form submission logic would go here
    console.log('Form submitted:', formData)
    
    // For now, just show an alert
    alert('Thank you for your message! I will respond within 24 hours.')
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      inquiryType: '',
      experience: '',
      challenges: '',
      message: '',
      newsletter: false,
      privacy: false
    })
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pure-light to-light-border" id="contact-form">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-4">
            Send Me Your Questions
          </h2>
          
          <p className="text-medium-text max-w-2xl mx-auto">
            I read and personally respond to every message. The more you tell me about your 
            situation and goals, the better guidance I can provide.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-living-green/10 relative overflow-hidden">
          {/* Decorative element */}
          <div 
            className="absolute top-5 right-5 w-8 h-8 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M30 20 Q50 10 70 20 Q80 40 70 60 Q50 70 30 60 Q20 40 30 20' fill='%237fb069' opacity='0.75'/%3E%3Ccircle cx='45' cy='35' r='2' fill='%235a9bb5' opacity='0.5'/%3E%3Ccircle cx='55' cy='45' r='1.5' fill='%23d4a574' opacity='0.5'/%3E%3C/svg%3E")`
            }}
          />
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="firstName" className="block text-forest-deep font-medium mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-living-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName" className="block text-forest-deep font-medium mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-living-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50"
                />
              </div>
            </div>
            
            <div className="form-group mt-6">
              <label htmlFor="email" className="block text-forest-deep font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-living-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50"
              />
            </div>
            
            <div className="form-group mt-6">
              <label htmlFor="inquiryType" className="block text-forest-deep font-medium mb-2">
                What area can I help you with?
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-living-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50"
              >
                <option value="">Please select...</option>
                <option value="getting-started">Getting started with meditation</option>
                <option value="course-recommendations">Course recommendations</option>
                <option value="deepening-practice">Deepening my existing practice</option>
                <option value="workplace-stress">Workplace stress management</option>
                <option value="technique-specific">Specific meditation techniques</option>
                <option value="celtic-spirituality">Celtic spirituality integration</option>
                <option value="session-inquiry">Individual session information</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group mt-6">
              <label htmlFor="experience" className="block text-forest-deep font-medium mb-2">
                Your current meditation experience
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-living-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50"
              >
                <option value="">Please select...</option>
                <option value="complete-beginner">Complete beginner - never tried meditation</option>
                <option value="tried-some">Tried a few times but struggled to stick with it</option>
                <option value="occasional">Practice occasionally (few times a month)</option>
                <option value="regular">Regular practice (few times a week)</option>
                <option value="daily">Daily practitioner</option>
                <option value="experienced">Experienced (multiple years of practice)</option>
                <option value="teacher">I teach meditation or mindfulness</option>
              </select>
            </div>
            
            <div className="form-group mt-6">
              <label htmlFor="challenges" className="block text-forest-deep font-medium mb-2">
                What challenges or goals would you like help with?
              </label>
              <textarea
                id="challenges"
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                rows={3}
                placeholder="For example: 'I struggle with a racing mind during meditation' or 'I want to build a consistent daily practice' or 'I'm interested in the Celtic spiritual aspects'..."
                className="w-full px-4 py-3 border border-living-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50"
              />
            </div>
            
            <div className="form-group mt-6">
              <label htmlFor="message" className="block text-forest-deep font-medium mb-2">
                Your Questions or Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Tell me about your situation, what you're hoping to achieve, or any specific questions you have about meditation or my approach..."
                className="w-full px-4 py-3 border border-living-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-living-green/30 focus:border-living-green/50"
              />
            </div>
            
            <div className="flex items-start gap-3 mt-6">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleCheckboxChange}
                className="mt-1"
              />
              <label htmlFor="newsletter" className="text-medium-text text-sm">
                I'd like to receive occasional meditation insights and course updates (optional)
              </label>
            </div>
            
            <div className="flex items-start gap-3 mt-4">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                checked={formData.privacy}
                onChange={handleCheckboxChange}
                required
                className="mt-1"
              />
              <label htmlFor="privacy" className="text-medium-text text-sm">
                I understand my information will be used solely to respond to my inquiry and agree to the privacy policy *
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full mt-8 bg-gradient-to-br from-forest-deep to-sage-calm text-white font-medium py-3 px-6 rounded-lg 
                         hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Send My Questions
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
