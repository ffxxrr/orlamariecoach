/**
 * CelticDivider - Decorative Celtic circle divider for section transitions
 *
 * A reusable component featuring concentric circles with Celtic-inspired
 * petal/leaf motifs. Designed to sit between sections, overlapping edges.
 *
 * Usage:
 *   <CelticDivider position="top" />    - Places at -top-12
 *   <CelticDivider position="bottom" /> - Places at -bottom-12
 */

interface CelticDividerProps {
  /** Position relative to parent section */
  position: 'top' | 'bottom'
  /** Size in Tailwind units (default: 24 = 6rem = 96px) */
  size?: 'sm' | 'md' | 'lg'
  /** Color class - uses currentColor (default: text-living-green/40) */
  className?: string
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
}

const positionClasses = {
  top: '-top-12',
  bottom: '-bottom-12',
}

export default function CelticDivider({
  position,
  size = 'md',
  className = 'text-living-green/60',
}: CelticDividerProps) {
  return (
    <div
      className={`absolute ${positionClasses[position]} left-1/2 -translate-x-1/2 ${sizeClasses[size]} z-20 pointer-events-none`}
    >
      <svg viewBox="0 0 200 200" className={`w-full h-full ${className}`}>
        {/* Concentric circles */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="2" />

        {/* Four Celtic petal/leaf shapes pointing to cardinal directions */}
        <path d="M100 30 Q140 65 100 100 Q60 65 100 30" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M170 100 Q135 140 100 100 Q135 60 170 100" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M100 170 Q60 135 100 100 Q140 135 100 170" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M30 100 Q65 60 100 100 Q65 140 30 100" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  )
}
