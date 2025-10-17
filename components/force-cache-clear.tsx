"use client"

import { useEffect } from 'react'
import { forceCacheClear, needsCacheClear } from '@/lib/force-cache-clear'

export function ForceCacheClear() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Check if user needs cache clear
    if (needsCacheClear()) {
      console.log('🔄 User needs cache clear - forcing reload...')
      forceCacheClear()
    }
  }, [])

  // This component doesn't render anything
  return null
}
