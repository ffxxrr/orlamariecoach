import React from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}

export default function Button({ variant = 'primary', size = 'md', className, ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-breath/40'
  const sizes: Record<Size, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  }
  const variants: Record<Variant, string> = {
    primary: 'bg-gradient-to-r from-forest-deep to-sage-calm text-white hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-white text-forest-deep border border-light-border hover:shadow-sm',
    ghost: 'bg-transparent text-forest-deep hover:bg-forest-deep/10',
  }

  return (
    <button className={clsx(base, sizes[size], variants[variant], className)} {...props} />
  )
}

