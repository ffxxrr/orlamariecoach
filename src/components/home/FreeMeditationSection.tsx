'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import AudioPlayer from '@/components/audio/AudioPlayer'

export default function FreeMeditationSection() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    
    // Simulate API call to subscribe the user
    setTimeout(() => {
      setIsSubscribing(false)
      setIsSubscribed(true)
      setEmail('')
      
      // Trigger the download after successful subscription
      const link = document.createElement('a');
      link.href = '/media/audio/meditations/irish-countryside-meditation.mp3';
      link.setAttribute('download', 'irish-countryside-meditation.mp3');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Analytics tracking would go here
      console.log('Download triggered after subscription');
    }, 1500)
  }
  
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pure-light to-light-border relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-living-green/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage-calm/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-crimson text-3xl md:text-4xl text-forest-deep mb-4 leading-tight fade-in-up">
              Experience a Free Guided Meditation
            </h2>
            
            <p className="text-medium-text mb-6 fade-in-up">
              Take a moment for yourself with this complimentary guided session. 
              Perfect for beginners and experienced practitioners alike.
            </p>
            
            <div className="mb-8">
              <AudioPlayer 
                audioSrc={{
                  mp3: "/media/audio/meditations/irish-countryside-meditation.mp3",
                  ogg: "/media/audio/meditations/irish-countryside-meditation.ogg",
                  mp4: "/media/audio/meditations/irish-countryside-meditation.mp4"
                }}
                title="Irish Countryside Meditation (5 min)"
                onDownloadClick={() => setShowEmailForm(true)}
              />
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              {showEmailForm || isSubscribed ? (
                <>
                  <h3 className="text-xl text-forest-deep mb-3 font-medium">
                    {isSubscribed ? 'Thank You!' : 'Download Your Free Meditation'}
                  </h3>
                  
                  {isSubscribed ? (
                    <div className="text-center py-4">
                      <div className="text-forest-deep mb-2 text-xl">🌱 Thank You!</div>
                      <p className="text-medium-text mb-4">
                        Your meditation is being downloaded.
                        <br />Check your email for more free mindfulness resources.
                      </p>
                      <a
                        href="/media/audio/meditations/irish-countryside-meditation.mp3"
                        download
                        className="inline-block"
                        onClick={() => {
                          // Trigger download programmatically if it didn't start automatically
                          setTimeout(() => {
                            const link = document.createElement('a');
                            link.href = '/media/audio/meditations/irish-countryside-meditation.mp3';
                            link.setAttribute('download', 'irish-countryside-meditation.mp3');
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }, 1000);
                        }}
                      >
                        <Button variant="secondary">Download Again</Button>
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <p className="text-medium-text mb-4">
                        Enter your email to download this meditation and receive weekly
                        mindfulness inspiration, techniques, and exclusive content.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email address"
                          required
                          className="flex-1 px-4 py-3 rounded-full border border-light-border focus:outline-none focus:ring-2 focus:ring-forest-deep/20"
                        />
                        <button
                          type="submit"
                          disabled={isSubscribing}
                          className=""
                        >
                          <Button>{isSubscribing ? 'Processing...' : 'Download Now'}</Button>
                        </button>
                      </div>
                      
                      <p className="text-xs text-medium-text mt-3">
                        We respect your privacy and will never share your information.
                        Unsubscribe anytime with one click.
                      </p>
                    </form>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-xl text-forest-deep mb-3 font-medium">
                    Get More Free Meditations
                  </h3>
                  <p className="text-medium-text mb-4">
                    Enjoy the free meditation above? Click the download button to save it for offline use,
                    or join our mindfulness community for weekly inspiration.
                  </p>
                  <button 
                    onClick={() => setShowEmailForm(true)}
                    className="w-full sm:w-auto"
                  >
                    <Button variant="secondary" className="w-full sm:w-auto">Join Our Community</Button>
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/orla/optimized/about/7R500125.webp"
                alt="Orla Marie in a peaceful meditation setting"
                width={500}
                height={500}
                className="object-cover w-full h-full rounded-2xl"
                priority
              />
            </div>
            
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md max-w-xs">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🍃</div>
                <div>
                  <p className="text-sm text-medium-text italic">
                    "The OM Method creates harmony between your inner world and daily life, 
                    making meditation not just a practice, but a way of being."
                  </p>
                  <p className="text-forest-deep font-medium text-sm mt-2">
                    — Orla Marie
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
