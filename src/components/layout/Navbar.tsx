'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/courses', label: 'Courses' },
    { href: '/contact', label: 'Contact' }
  ]

  // Determine navbar style based on scroll and page
  const isTransparent = isHomepage && !isScrolled && !isMobileMenuOpen

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000]">
        <nav
          className={`transition-all duration-500 ease-out ${
            isTransparent
              ? 'bg-transparent'
              : 'bg-pure-light/95 backdrop-blur-xl shadow-sm'
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-12 h-20">
            {/* Logo - Text based for elegance */}
            <Link
              href="/"
              className="flex-shrink-0 z-10 group"
            >
              <span className={`font-crimson text-2xl tracking-wide transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-forest-deep'
              }`}>
                Orla Marie
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative px-5 py-2 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                      isTransparent
                        ? pathname === link.href
                          ? 'text-white'
                          : 'text-white/80 hover:text-white'
                        : pathname === link.href
                          ? 'text-forest-deep'
                          : 'text-sage-calm hover:text-forest-deep'
                    }`}
                  >
                    {link.label}
                    {/* Active indicator - subtle line */}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-300 ${
                      pathname === link.href
                        ? 'w-6 bg-current'
                        : 'w-0'
                    }`} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button - Pill shape */}
            <Link
              href="/book-session"
              className={`hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                isTransparent
                  ? 'bg-white/20 text-white border border-white/40 hover:bg-white hover:text-forest-deep'
                  : 'bg-forest-deep text-white hover:bg-sage-calm hover:shadow-md'
              }`}
            >
              Begin
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 z-[1010] transition-colors duration-300 ${
                isMobileMenuOpen
                  ? 'text-forest-deep'
                  : isTransparent
                    ? 'text-white'
                    : 'text-forest-deep'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} />
                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 scale-0' : ''
                }`} />
                <span className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Full Screen Mobile Menu */}
      <div
        className={`fixed inset-0 z-[999] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-pure-light" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-8">
          <nav className="w-full max-w-sm">
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={`transform transition-all duration-500 ${
                    isMobileMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms' }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-center font-crimson text-4xl py-4 transition-colors duration-300 ${
                      pathname === link.href
                        ? 'text-forest-deep'
                        : 'text-sage-calm hover:text-forest-deep'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile CTA */}
            <div
              className={`mt-12 transform transition-all duration-500 ${
                isMobileMenuOpen
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? '400ms' : '0ms' }}
            >
              <Link
                href="/book-session"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full bg-forest-deep text-white text-center py-4 rounded-full font-medium uppercase tracking-wider hover:bg-sage-calm transition-colors duration-300"
              >
                Begin Your Journey
              </Link>
            </div>
          </nav>

          {/* Decorative element */}
          <div
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 ${
              isMobileMenuOpen ? 'opacity-30' : 'opacity-0'
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? '500ms' : '0ms' }}
          >
            <svg className="w-12 h-12 text-living-green" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 5C50 5 30 25 30 45C30 58 38 70 50 70C62 70 70 58 70 45C70 25 50 5 50 5ZM50 15C50 15 60 30 60 45C60 53 56 60 50 60C44 60 40 53 40 45C40 30 50 15 50 15Z"/>
              <path d="M50 70C50 70 35 80 25 80C15 80 10 73 15 65C20 57 35 55 50 70C65 55 80 57 85 65C90 73 85 80 75 80C65 80 50 70 50 70Z"/>
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
