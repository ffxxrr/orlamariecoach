import React from 'react'

interface FaviconProps {
  className?: string
  size?: number
}

export default function CelticTriskelion({ 
  className = '', 
  size = 24 
}: FaviconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Gradient Circle */}
      <defs>
        <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#c8e6cb" />
          <stop offset="100%" stopColor="#79b98a" />
        </radialGradient>
      </defs>
      
      {/* Background Circle */}
      <circle cx="50" cy="50" r="48" fill="url(#bgGradient)" />
      
      {/* Celtic Triskelion Symbol */}
      <g fill="#324238">
        {/* First Spiral */}
        <path d="M50,50 C53,40 60,35 68,38 C76,41 78,52 72,58 C66,64 55,62 52,54 C51,52 50,50 50,50 Z" />
        <path d="M68,38 C70,32 68,25 62,22 C56,19 49,22 46,28 C43,34 46,41 52,44 C52,44 62,38 68,38 Z" />
        
        {/* Second Spiral */}
        <path d="M50,50 C40,53 35,60 38,68 C41,76 52,78 58,72 C64,66 62,55 54,52 C52,51 50,50 50,50 Z" />
        <path d="M38,68 C32,70 25,68 22,62 C19,56 22,49 28,46 C34,43 41,46 44,52 C44,52 38,62 38,68 Z" />
        
        {/* Third Spiral */}
        <path d="M50,50 C47,40 40,35 32,38 C24,41 22,52 28,58 C34,64 45,62 48,54 C49,52 50,50 50,50 Z" />
        <path d="M32,38 C30,32 32,25 38,22 C44,19 51,22 54,28 C57,34 54,41 48,44 C48,44 38,38 32,38 Z" />
      </g>
    </svg>
  )
}
