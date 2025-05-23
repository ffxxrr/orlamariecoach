'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/brand/Logo'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`sticky top-0 z-[1000] transition-all duration-300 ${
        isScrolled 
          ? 'bg-pure-light/98 backdrop-blur-[10px] shadow-sm' 
          : 'bg-pure-light/95 backdrop-blur-[10px]'
      } border-b border-light-border`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <Logo size="md" variant="default" withText={true} />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          <li>
            <Link 
              href="/" 
              className="nav-link font-medium text-deep-text hover:text-forest-deep px-3 py-2 rounded-lg hover:bg-forest-deep/10 transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className="nav-link font-medium text-deep-text hover:text-forest-deep px-3 py-2 rounded-lg hover:bg-forest-deep/10 transition-all duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              href="/services" 
              className="nav-link font-medium text-deep-text hover:text-forest-deep px-3 py-2 rounded-lg hover:bg-forest-deep/10 transition-all duration-300"
            >
              Services
            </Link>
          </li>
          <li>
            <Link 
              href="/courses" 
              className="nav-link font-medium text-deep-text hover:text-forest-deep px-3 py-2 rounded-lg hover:bg-forest-deep/10 transition-all duration-300"
            >
              Courses
            </Link>
          </li>
          <li>
            <Link 
              href="/resources" 
              className="nav-link font-medium text-deep-text hover:text-forest-deep px-3 py-2 rounded-lg hover:bg-forest-deep/10 transition-all duration-300"
            >
              Resources
            </Link>
          </li>
          <li>
            <Link 
              href="/contact" 
              className="nav-link font-medium text-deep-text hover:text-forest-deep px-3 py-2 rounded-lg hover:bg-forest-deep/10 transition-all duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* CTA Button */}
        <Link 
          href="/book-session" 
          className="hidden lg:inline-block bg-gradient-to-r from-forest-deep to-sage-calm text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          Book Session
        </Link>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2 rounded-lg hover:bg-forest-deep/10 transition-colors">
          <svg className="w-6 h-6 text-deep-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
