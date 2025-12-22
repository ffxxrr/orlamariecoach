'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

type AnimationType = 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn'

interface ScrollRevealProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

const animationClasses: Record<AnimationType, string> = {
  fadeInUp: 'translate-y-8 opacity-0',
  fadeInDown: '-translate-y-8 opacity-0',
  fadeInLeft: '-translate-x-8 opacity-0',
  fadeInRight: 'translate-x-8 opacity-0',
  fadeIn: 'opacity-0',
  scaleIn: 'scale-95 opacity-0',
}

export default function ScrollReveal({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  className = '',
  threshold = 0.1,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold })

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        className={`transition-all ${isVisible ? 'translate-y-0 translate-x-0 scale-100 opacity-100' : animationClasses[animation]}`}
        style={{
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
