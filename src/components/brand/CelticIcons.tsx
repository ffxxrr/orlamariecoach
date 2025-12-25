/**
 * CelticIcons - Hand-crafted icon set for OrlaMarieCoach
 *
 * Design principles (from orla-marie-design skill):
 * - Thin elegant strokes (1.5px) with rounded caps/joins
 * - Organic curves - "felt, not forced" Celtic influence
 * - Warm, grounded aesthetic matching brand palette
 * - Subtle imperfection for hand-crafted feel
 */

import { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string
}

const defaultProps = {
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none',
  stroke: 'currentColor',
}

/**
 * Flowing arrow for CTAs - organic curve with Celtic spiral tip
 * Echoes the triskelion motif in a subtle, functional way
 */
export function ArrowFlow({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      {/* Flowing line with gentle curve */}
      <path d="M3 12c4-0.5 8 0.5 12 0" />
      {/* Spiral tip - triskelion echo, unfurling motion */}
      <path d="M15 12c2 0 4 0 5.5-1.5c1-1 1-2 0.5-2.5c-0.5-0.5-1.5-0.3-2 0.5c-0.5 1 0 2 1 2.5c1.5 0.8 2.5 0 3-1" />
    </svg>
  )
}

/**
 * Seed/acorn bullet point - grounded, organic, growth symbolism
 */
export function SeedBullet({ size = 8, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      {/* Teardrop/seed shape - pointed top, rounded bottom */}
      <path d="M4 1C4 1 2 3.5 2 5C2 6.1 2.9 7 4 7C5.1 7 6 6.1 6 5C6 3.5 4 1 4 1Z" />
    </svg>
  )
}

/**
 * Single spiral - 1/3 of triskelion, Celtic heritage in minimal form
 */
export function SpiralBullet({ size = 10, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      {...defaultProps}
      strokeWidth={1.2}
      {...props}
    >
      {/* Single Celtic spiral, unwinding from center */}
      <path d="M5 5C5 5 5.5 5 5.5 4.5C5.5 4 5 3.5 4.5 3.5C3.5 3.5 3 4.5 3 5C3 6 4 7 5 7C6.5 7 7.5 5.5 7.5 4.5C7.5 3 6 1.5 4.5 1.5" />
    </svg>
  )
}

/**
 * Email - envelope with gently curved flap
 */
export function EmailIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      {/* Envelope body with softened corners */}
      <path d="M4 6C3 6 3 7 3 7V17C3 18 4 18 4 18H20C21 18 21 17 21 17V7C21 6 20 6 20 6H4Z" />
      {/* Curved envelope flap - organic fold line */}
      <path d="M3 7C3 7 8 12 12 12C16 12 21 7 21 7" />
    </svg>
  )
}

/**
 * Phone - handset with organic curves
 */
export function PhoneIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      {/* Classic handset with flowing curves */}
      <path d="M5 4C4 4 3 5 3 6C3 7 3.5 10 5 13C6.5 16 9 18.5 11 20C12 20.7 13.5 21 15 21C16 21 17 21 18 20L20 18C20.5 17.5 20.5 16.5 20 16L17 13C16.5 12.5 15.5 12.5 15 13L14 14C14 14 12 13 10 11C8 9 7 7 7 7L8 6C8.5 5.5 8.5 4.5 8 4L5 4Z" />
    </svg>
  )
}

/**
 * Location - standing stone silhouette instead of generic pin
 */
export function LocationIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      {/* Standing stone / dolmen shape - grounded, ancient */}
      <path d="M12 3C12 3 8 4 7 8C6 12 6 16 7 20C7.5 21 8 21 9 21H15C16 21 16.5 21 17 20C18 16 18 12 17 8C16 4 12 3 12 3Z" />
      {/* Subtle texture line */}
      <path d="M10 10C10.5 12 10.5 14 10 16" strokeWidth={1} opacity={0.5} />
    </svg>
  )
}

/**
 * Clock - organic with hand-drawn feel
 */
export function ClockIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      {/* Slightly imperfect circle for organic feel */}
      <circle cx="12" cy="12" r="9" />
      {/* Clock hands with gentle curves */}
      <path d="M12 6V12" />
      <path d="M12 12C12 12 15 13 16 14" />
    </svg>
  )
}

/**
 * Calendar - softened with organic corners
 */
export function CalendarIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      {/* Calendar body with soft corners */}
      <path d="M5 5C4 5 3 6 3 7V19C3 20 4 21 5 21H19C20 21 21 20 21 19V7C21 6 20 5 19 5H5Z" />
      {/* Header line */}
      <path d="M3 10H21" />
      {/* Hanging tabs */}
      <path d="M8 3V7" />
      <path d="M16 3V7" />
    </svg>
  )
}

/**
 * Globe/World - for "serving globally"
 */
export function GlobeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      {/* Main circle */}
      <circle cx="12" cy="12" r="9" />
      {/* Longitude curve */}
      <path d="M12 3C8 3 6 7 6 12C6 17 8 21 12 21C16 21 18 17 18 12C18 7 16 3 12 3" />
      {/* Latitude curves */}
      <path d="M3.5 9C3.5 9 7 10 12 10C17 10 20.5 9 20.5 9" />
      <path d="M3.5 15C3.5 15 7 14 12 14C17 14 20.5 15 20.5 15" />
    </svg>
  )
}

/**
 * Heart - for testimonials or warmth
 */
export function HeartIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      {/* Organic heart shape */}
      <path d="M12 6C12 6 10 3 7 3C4 3 2 6 2 9C2 15 12 21 12 21C12 21 22 15 22 9C22 6 20 3 17 3C14 3 12 6 12 6Z" />
    </svg>
  )
}

/**
 * Quote mark - for testimonials, elegant serif style
 */
export function QuoteIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      {/* Elegant curved quotation marks */}
      <path d="M10 8C10 5 8 4 5 4C5 4 4 8 4 11C4 14 6 16 9 16C9 16 11 16 11 13C11 10 9 10 9 10C9 10 10 10 10 8Z" />
      <path d="M21 8C21 5 19 4 16 4C16 4 15 8 15 11C15 14 17 16 20 16C20 16 22 16 22 13C22 10 20 10 20 10C20 10 21 10 21 8Z" />
    </svg>
  )
}

/**
 * Leaf - organic, nature connection
 */
export function LeafIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      {/* Single flowing leaf */}
      <path d="M12 3C12 3 6 6 4 12C2 18 6 21 12 21C12 21 12 15 12 12C12 9 12 3 12 3Z" />
      <path d="M12 21C12 21 18 18 20 12C22 6 18 3 12 3" />
      {/* Stem/vein */}
      <path d="M12 21V10" />
    </svg>
  )
}

/**
 * Check/tick - organic curved check mark
 */
export function CheckIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      strokeWidth={2}
      {...props}
    >
      {/* Flowing check mark */}
      <path d="M4 12C4 12 8 16 10 18C12 14 16 8 20 4" />
    </svg>
  )
}

/**
 * Play button - for audio/video
 */
export function PlayIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      {/* Soft-cornered play triangle */}
      <path d="M8 5C7 4.5 6 5 6 6V18C6 19 7 19.5 8 19L19 12.5C20 12 20 11 19 10.5L8 5Z" />
    </svg>
  )
}

/**
 * Pause button - for audio/video
 */
export function PauseIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      strokeWidth={2.5}
      {...props}
    >
      <path d="M8 5V19" />
      <path d="M16 5V19" />
    </svg>
  )
}

// Social icons with consistent organic style

export function FacebookIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      <path d="M18 2H15C13.5 2 12 3.5 12 5V8H9V12H12V22H16V12H19L20 8H16V5.5C16 5 16.5 4.5 17 4.5H20V2H18Z" />
    </svg>
  )
}

export function InstagramIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      {/* Rounded square */}
      <rect x="3" y="3" width="18" height="18" rx="5" />
      {/* Inner circle */}
      <circle cx="12" cy="12" r="4" />
      {/* Flash dot */}
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function YoutubeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...defaultProps}
      {...props}
    >
      {/* Rounded rectangle */}
      <path d="M3 8C3 5 5 4 8 4H16C19 4 21 5 21 8V16C21 19 19 20 16 20H8C5 20 3 19 3 16V8Z" />
      {/* Play triangle */}
      <path d="M10 8L16 12L10 16V8Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

// Export all icons as a collection for easy access
export const CelticIcons = {
  ArrowFlow,
  SeedBullet,
  SpiralBullet,
  EmailIcon,
  PhoneIcon,
  LocationIcon,
  ClockIcon,
  CalendarIcon,
  GlobeIcon,
  HeartIcon,
  QuoteIcon,
  LeafIcon,
  CheckIcon,
  PlayIcon,
  PauseIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
}

export default CelticIcons
