import React from 'react'

export default function BotanicalAccents() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Using simple colored elements instead of SVG data URLs */}
      <div className="absolute top-[10%] right-[5%] w-[60px] h-[60px] rounded-full bg-living-green/20 animate-float-leaf" />
      <div className="absolute bottom-[15%] left-[8%] w-[45px] h-[45px] rounded-full bg-living-green/20 animate-float-leaf-reverse" />
      <div className="absolute top-[20%] left-[10%] w-[50px] h-[50px] rounded-full bg-earth-warmth/20 animate-float-flower" />
      <div className="absolute bottom-[25%] right-[12%] w-[40px] h-[40px] rounded-full bg-sage-calm/20 animate-float-flower-reverse" />
      <div className="absolute top-[35%] right-[2%] w-[20px] h-[120px] bg-sage-calm/10 animate-sway" />
    </div>
  )
}
