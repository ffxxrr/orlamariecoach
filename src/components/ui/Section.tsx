import React, { ElementType } from 'react'

type PaddingSize = 'none' | 'standard' | 'breathing' | 'prominent'

const paddingClasses: Record<PaddingSize, string> = {
  none: '',
  standard: 'py-16 md:py-24',
  breathing: 'py-24 md:py-32',
  prominent: 'py-32 md:py-40',
}

type Props = {
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  padding?: PaddingSize
  padded?: boolean // deprecated, use padding instead
  children: React.ReactNode
}

export default function Section({
  as = 'section',
  className = '',
  padding,
  padded = true,
  children
}: Props) {
  const Tag = (as as ElementType)

  // If padding prop is explicitly set, use it; otherwise fall back to padded boolean
  const paddingClass = padding
    ? paddingClasses[padding]
    : (padded ? paddingClasses.standard : '')

  return (
    <Tag className={`${paddingClass} ${className}`}>
      {children}
    </Tag>
  )
}
