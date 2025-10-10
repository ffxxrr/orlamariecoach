import React, { ElementType } from 'react'

type Props = {
  as?: keyof JSX.IntrinsicElements
  className?: string
  padded?: boolean
  children: React.ReactNode
}

export default function Section({ as = 'section', className = '', padded = true, children }: Props) {
  const Tag = (as as ElementType)
  return (
    <Tag className={`${padded ? 'py-12 md:py-16' : ''} ${className}`}>
      {children}
    </Tag>
  )
}
