import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  quickLinks: [
    { name: 'About Orla', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Online Courses', href: '/courses' },
    { name: 'Resources', href: '/resources' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-deep-text text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-8 h-8 rounded-md overflow-hidden">
                <Image
                  src="/images/brand/logo-square.png"
                  alt="OrlaMarieCoach Logo"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <h3 className="font-crimson text-xl font-medium text-living-green">
                OrlaMarieCoach
              </h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-6 max-w-md">
              Guiding you toward inner peace through authentic meditation and mindfulness practices rooted in wisdom and compassion.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-white/80">
              <p>📧 admin@orlamariecoach.com</p>
              <p>📍 Sligo, Ireland</p>
              <p>🌍 Serving clients worldwide</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-crimson text-lg font-medium text-living-green mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-white/80 hover:text-living-green transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-crimson text-lg font-medium text-living-green mb-6">
              Get Started
            </h3>
            <ul className="space-y-3 mb-6">
              <li>
                <Link 
                  href="/book-session"
                  className="text-white/80 hover:text-living-green transition-colors duration-300"
                >
                  Book a Free Consultation
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-white/80 hover:text-living-green transition-colors duration-300"
                >
                  Contact Orla
                </Link>
              </li>
            </ul>

            {/* Social Links Placeholder */}
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-living-green transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  📘
                </div>
              </a>
              <a href="#" className="text-white/60 hover:text-living-green transition-colors">
                <span className="sr-only">Instagram</span>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  📷
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
            <p>
              © 2025 OrlaMarieCoach. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {footerLinks.legal.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  className="hover:text-living-green transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
