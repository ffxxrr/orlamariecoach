'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoHeroBackgroundProps {
  videoSrc: string
  posterSrc: string
  mobileFocalPoint?: string // e.g., 'center center', 'right center'
  className?: string
}

/**
 * Responsive hero background component:
 * - All devices: Video background with smart object-position for mobile
 * - Mobile uses mobileFocalPoint to handle landscape-to-portrait cropping
 * - Respects prefers-reduced-motion (shows poster with Ken Burns effect)
 */
export default function VideoHeroBackground({
  videoSrc,
  posterSrc,
  mobileFocalPoint = 'center center',
  className = '',
}: VideoHeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    motionQuery.addEventListener('change', handleMotionChange)

    // Track mobile for object-position adjustment
    const mobileQuery = window.matchMedia('(max-width: 767px)')
    setIsMobile(mobileQuery.matches)

    const handleMobileChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }
    mobileQuery.addEventListener('change', handleMobileChange)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      mobileQuery.removeEventListener('change', handleMobileChange)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (video && !prefersReducedMotion) {
      const handleCanPlay = () => setVideoLoaded(true)
      video.addEventListener('canplay', handleCanPlay)
      // Check if already ready
      if (video.readyState >= 3) {
        setVideoLoaded(true)
      }
      return () => video.removeEventListener('canplay', handleCanPlay)
    }
  }, [prefersReducedMotion])

  const showVideo = !prefersReducedMotion

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video Background - All devices */}
      {showVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            // Use mobile focal point on small screens to handle landscape video on portrait screen
            objectPosition: isMobile ? mobileFocalPoint : 'center center',
          }}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Poster fallback - before video loads or for reduced-motion */}
      {(!videoLoaded || prefersReducedMotion) && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            videoLoaded && showVideo ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Ken Burns animated poster for reduced-motion users */}
          <div
            className={`absolute inset-0 bg-cover ${
              prefersReducedMotion ? '' : 'animate-ken-burns'
            }`}
            style={{
              backgroundImage: `url(${posterSrc})`,
              backgroundPosition: isMobile ? mobileFocalPoint : 'center center',
            }}
          />

          {/* Breathing light overlay while loading */}
          {!prefersReducedMotion && !videoLoaded && (
            <>
              <div className="absolute inset-0 bg-gradient-radial from-earth-warmth/20 via-transparent to-transparent animate-breathe" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-earth-warmth/10 animate-light-drift" />
            </>
          )}
        </div>
      )}
    </div>
  )
}
