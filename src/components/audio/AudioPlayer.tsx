'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Download, Volume2 } from 'lucide-react'

interface AudioPlayerProps {
  audioSrc: string
  title: string
  downloadable?: boolean
  className?: string
}

export default function AudioPlayer({ 
  audioSrc, 
  title, 
  downloadable = true,
  className = '' 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    
    if (!audio) return
    
    const setAudioData = () => {
      setDuration(audio.duration)
      setIsLoaded(true)
    }
    
    const setAudioTime = () => setCurrentTime(audio.currentTime)
    
    // Events
    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)
    audio.addEventListener('ended', () => setIsPlaying(false))
    
    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [audioRef])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const jumpToPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current
    const audio = audioRef.current
    
    if (!progressBar || !audio) return
    
    const position = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth
    
    if (position >= 0 && position <= 1) {
      audio.currentTime = position * duration
    }
  }

  // Format time in mm:ss
  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={`rounded-lg shadow-sm bg-white/60 backdrop-blur-sm p-4 ${className}`}>
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      <div className="flex items-center gap-3 mb-3">
        <button 
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-forest-deep text-white hover:bg-sage-calm transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
        </button>
        
        <div className="flex-1">
          <div className="flex justify-between text-xs text-medium-text mb-1">
            <span className="font-medium flex items-center gap-1">
              <Volume2 size={14} /> {title}
            </span>
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
          
          {/* Progress bar */}
          <div 
            ref={progressBarRef}
            className="h-2 bg-light-border rounded-full overflow-hidden cursor-pointer" 
            onClick={jumpToPosition}
          >
            <div 
              className="h-full bg-gradient-to-r from-forest-deep to-sage-calm transition-all duration-100"
              style={{ width: `${isLoaded ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
        </div>
        
        {downloadable && (
          <a 
            href={audioSrc} 
            download
            className="text-forest-deep hover:text-sage-calm transition-colors"
            aria-label="Download meditation"
          >
            <Download size={20} />
          </a>
        )}
      </div>
    </div>
  )
}
