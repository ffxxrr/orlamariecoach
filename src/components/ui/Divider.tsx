import React from 'react'

type Props = {
  className?: string
}

export default function Divider({ className = '' }: Props) {
  return (
    <div className={`h-px w-full bg-light-border ${className}`} />
  )
}

