import Link from 'next/link'
import Logo from '@/components/brand/Logo'
import {
  EmailIcon,
  LocationIcon,
  GlobeIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from '@/components/brand/CelticIcons'

const footerLinks = {
  quickLinks: [
    { name: 'About Orla', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Online Courses', href: '/courses' },
    { name: 'Contact', href: '/contact' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-footer-moss text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo size="sm" variant="dark" withText={true} />
            </div>
            <p className="text-white/80 leading-relaxed mb-6 max-w-md">
              Guiding you toward inner peace through authentic meditation and mindfulness practices rooted in wisdom and compassion.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-white/80">
              <p className="flex items-center gap-3">
                <EmailIcon size={18} className="text-living-green" />
                admin@orlamariecoach.com
              </p>
              <p className="flex items-center gap-3">
                <LocationIcon size={18} className="text-living-green" />
                Donegal, Ireland
              </p>
              <p className="flex items-center gap-3">
                <GlobeIcon size={18} className="text-living-green" />
                Serving clients worldwide
              </p>
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

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/orlamariecoach"
                className="text-white/70 hover:text-living-green transition-colors"
                aria-label="Facebook"
              >
                <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                  <FacebookIcon size={20} />
                </div>
              </a>
              <a
                href="https://www.instagram.com/orlamariecoach"
                className="text-white/70 hover:text-living-green transition-colors"
                aria-label="Instagram"
              >
                <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                  <InstagramIcon size={20} />
                </div>
              </a>
              <a
                href="https://www.youtube.com/orlamariecoach"
                className="text-white/70 hover:text-living-green transition-colors"
                aria-label="YouTube"
              >
                <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                  <YoutubeIcon size={20} />
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
