import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-[#1E3A2F] overflow-hidden">
      {/* Roots gradient overlay - suggests depth, earth, grounding */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 50% at 50% 100%, rgba(86, 20, 15, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 20% 90%, rgba(110, 90, 47, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 80% 40% at 80% 95%, rgba(110, 90, 47, 0.25) 0%, transparent 50%),
            linear-gradient(to bottom, rgba(30, 58, 47, 0.8) 0%, rgba(20, 40, 32, 1) 100%)
          `,
        }}
      />

      {/* Subtle organic root-like lines */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none">
        <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <path d="M0 100 Q50 80 100 90 T200 85 T300 92 T400 88 L400 100 Z" fill="rgba(201, 164, 117, 0.3)" />
          <path d="M0 100 Q80 70 150 85 T280 75 T400 82 L400 100 Z" fill="rgba(201, 164, 117, 0.2)" />
        </svg>
      </div>

      {/* Top edge transition - blend from page */}
      <div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-b from-transparent via-[#1E3A2F]/50 to-[#1E3A2F] pointer-events-none" />

      <div className="relative px-6 py-16 text-center">
        {/* Small decorative Celtic knot */}
        <div className="mb-8">
          <svg className="w-8 h-8 mx-auto text-earth-warmth/40" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="16" cy="16" r="10" />
            <circle cx="16" cy="16" r="6" />
            <path d="M16 6 Q20 11 16 16 Q12 11 16 6" />
            <path d="M26 16 Q21 20 16 16 Q21 12 26 16" />
            <path d="M16 26 Q12 21 16 16 Q20 21 16 26" />
            <path d="M6 16 Q11 12 16 16 Q11 20 6 16" />
          </svg>
        </div>

        {/* Personal closing message */}
        <p className="font-crimson italic text-lg text-earth-warmth/90 mb-6">
          Wishing you stillness on your journey.
        </p>

        {/* Email */}
        <a
          href="mailto:hello@orlamariecoach.com"
          className="inline-block text-pure-light/90 hover:text-earth-warmth transition-colors duration-300 mb-8"
        >
          hello@orlamariecoach.com
        </a>

        {/* Social icons */}
        <div className="flex justify-center gap-6 mb-10">
          <a
            href="https://www.instagram.com/orlamariecoach"
            className="text-earth-warmth/60 hover:text-earth-warmth transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/orlamariecoach"
            className="text-earth-warmth/60 hover:text-earth-warmth transition-colors duration-300"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/orlamariecoach"
            className="text-earth-warmth/60 hover:text-earth-warmth transition-colors duration-300"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        {/* Subtle divider */}
        <div className="w-16 h-px bg-earth-warmth/20 mx-auto mb-6" />

        {/* Copyright and legal */}
        <div className="text-xs text-pure-light/40 space-x-3">
          <span>© 2025 Orla Marie</span>
          <span>·</span>
          <Link href="/privacy" className="hover:text-pure-light/70 transition-colors">
            Privacy
          </Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-pure-light/70 transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
