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

  // Ensure component is mounted before using portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-7xl max-h-[90vh] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div>
            <p className="text-white/60 text-sm uppercase tracking-[0.2em]">
              {subtitle}
            </p>
            <h2
              id="modal-title"
              className="font-crimson text-2xl md:text-3xl text-white"
            >
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
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

        {/* Image Container - landscape aspect ratio for journey maps */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-pure-light/5">
          <Image
            src={imageSrc}
            alt={`${title} - Course Journey Map`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 90vw"
            priority
          />
        </div>

        {/* Footer hint */}
        <p className="text-white/40 text-sm text-center mt-4">
          Press <kbd className="px-2 py-1 bg-white/10 rounded text-white/60">Esc</kbd> or click outside to close
        </p>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
