'use client'

import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'

interface CourseJourneyModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  title: string
  subtitle: string
}

export default function CourseJourneyModal({
  isOpen,
  onClose,
  imageSrc,
  title,
  subtitle,
}: CourseJourneyModalProps) {
  const [mounted, setMounted] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  // Ensure component is mounted before using portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  // Animate out before closing
  const handleClose = useCallback(() => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      setIsAnimatingOut(false)
      onClose()
    }, 400)
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  if (!mounted || !isOpen) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop with fade */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${
          isAnimatingOut ? 'opacity-0' : 'opacity-95'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Fullscreen Content */}
      <div
        className={`relative w-full h-full flex flex-col transition-all duration-500 ease-out ${
          isAnimatingOut
            ? 'opacity-0 scale-95 translate-y-8'
            : 'opacity-100 scale-100 translate-y-0'
        }`}
        style={{
          animationDelay: '100ms',
        }}
      >
        {/* Header - overlays top with gradient */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-6 pb-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex items-start justify-between">
            <div>
              <p className="text-white/50 text-xs md:text-sm uppercase tracking-[0.25em] mb-1">
                {subtitle}
              </p>
              <h2
                id="modal-title"
                className="font-crimson text-2xl md:text-4xl text-white"
              >
                {title}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-3 text-white/60 hover:text-white transition-all rounded-full hover:bg-white/10 hover:scale-110"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image Container - fullscreen with Ken Burns */}
        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="relative w-full h-full max-h-[85vh] overflow-hidden rounded-lg">
            <Image
              src={imageSrc}
              alt={`${title} - Course Journey Map`}
              fill
              className="object-contain animate-ken-burns-slow"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Footer hint - overlays bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent pb-6 pt-12">
          <p className="text-white/30 text-sm text-center">
            Press <kbd className="px-2 py-1 bg-white/10 rounded text-white/50 mx-1">Esc</kbd> or click backdrop to close
          </p>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
