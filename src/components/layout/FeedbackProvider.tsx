'use client'

import { usePathname } from 'next/navigation'
import FeedbackWidget from '@/components/feedback/FeedbackWidget'

interface FeedbackProviderProps {
  children: React.ReactNode
}

export default function FeedbackProvider({ children }: FeedbackProviderProps) {
  const pathname = usePathname()
  
  // Don't show feedback widget on admin pages
  const isAdminPage = pathname.startsWith('/admin')
  
  // Check if we're in preview mode
  const isPreviewMode = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true' || 
                       process.env.NODE_ENV === 'development'
  
  // Get clean page name for feedback
  const pageName = pathname === '/' ? 'Homepage' : 
                  pathname.replace('/', '').split('/')[0]
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')

  return (
    <>
      {children}
      {!isAdminPage && (
        <FeedbackWidget 
          currentPage={pageName}
          isPreviewMode={isPreviewMode}
        />
      )}
    </>
  )
}