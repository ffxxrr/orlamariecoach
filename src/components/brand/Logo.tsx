import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'light' | 'dark'
  withText?: boolean
  className?: string
}

export default function Logo({
  size = 'md',
  variant = 'default',
  withText = true,
  className = '',
}: LogoProps) {
  // Size mapping
  const sizeMap = {
    sm: { logo: 24, container: 'w-6 h-6', text: 'text-base' },
    md: { logo: 40, container: 'w-10 h-10', text: 'text-xl' },
    lg: { logo: 56, container: 'w-14 h-14', text: 'text-2xl' },
    xl: { logo: 80, container: 'w-20 h-20', text: 'text-3xl' },
  }

  // Variant styling
  const variantMap = {
    default: {
      container: 'bg-white shadow-sm',
      text: 'text-forest-deep',
      hoverText: 'group-hover:text-sage-calm',
    },
    light: {
      container: 'bg-white/90 shadow-sm',
      text: 'text-forest-deep',
      hoverText: 'group-hover:text-sage-calm',
    },
    dark: {
      container: 'bg-white/90 shadow-sm',
      text: 'text-white',
      hoverText: 'group-hover:text-living-green',
    },
  }

  const { logo, container, text } = sizeMap[size]
  const { container: containerStyle, text: textStyle, hoverText } = variantMap[variant]

  return (
    <div className={`flex items-center space-x-3 group ${className}`}>
      <div className={`relative ${container} rounded-lg overflow-hidden ${containerStyle} flex items-center justify-center`}>
        <Image
          src="/images/brand/logo-square.png"
          alt="OrlaMarieCoach Logo"
          width={logo}
          height={logo}
          className="object-cover"
        />
      </div>
      
      {withText && (
        <span className={`font-crimson font-medium ${text} ${textStyle} ${hoverText} transition-colors`}>
          OrlaMarieCoach
        </span>
      )}
    </div>
  )
}
