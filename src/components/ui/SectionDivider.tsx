interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'dots' | 'line'
  flip?: boolean
  className?: string
}

export default function SectionDivider({
  variant = 'wave',
  flip = false,
  className = '',
}: SectionDividerProps) {
  const dividers = {
    wave: (
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`w-full h-12 md:h-16 lg:h-20 ${flip ? 'rotate-180' : ''}`}
      >
        <path
          d="M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 L1200,120 L0,120 Z"
          className="fill-current"
        />
      </svg>
    ),
    curve: (
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`w-full h-12 md:h-16 lg:h-20 ${flip ? 'rotate-180' : ''}`}
      >
        <path
          d="M0,120 Q600,0 1200,120 L1200,120 L0,120 Z"
          className="fill-current"
        />
      </svg>
    ),
    dots: (
      <div className={`flex justify-center items-center gap-3 py-8 ${flip ? 'rotate-180' : ''}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-living-green/40" />
        <span className="w-2 h-2 rounded-full bg-living-green/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-living-green" />
        <span className="w-2 h-2 rounded-full bg-living-green/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-living-green/40" />
      </div>
    ),
    line: (
      <div className="flex justify-center items-center py-8">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-living-green/50 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-living-green/30 mx-4" />
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-living-green/50 to-transparent" />
      </div>
    ),
  }

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      {dividers[variant]}
    </div>
  )
}
