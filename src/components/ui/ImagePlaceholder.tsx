export default function ImagePlaceholder({ 
  text, 
  className = "", 
  aspectRatio = "aspect-[4/3]", 
  icon = null 
}) {
  return (
    <div className={`relative ${aspectRatio} bg-gradient-to-br from-sage-calm/30 to-living-green/30 rounded-lg overflow-hidden flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 bg-forest-deep/20 flex flex-col items-center justify-center p-4 text-center">
        {icon && <div className="text-4xl mb-3">{icon}</div>}
        <span className="text-white font-medium text-lg">{text}</span>
      </div>
    </div>
  )
}
