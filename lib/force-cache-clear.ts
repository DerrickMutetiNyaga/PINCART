/**
 * Force Cache Clear Utility
 * Forces all users to reload as if it's their first visit
 */

// Version number - increment this to force cache clear for all users
export const CACHE_VERSION = '2.0.0'

// Cache busting parameters
export const getCacheBustingParams = () => ({
  v: CACHE_VERSION,
  t: Date.now(),
  cb: Math.random().toString(36).substr(2, 9)
})

// Force reload for cached users
export const forceCacheClear = () => {
  if (typeof window === 'undefined') return

  const currentVersion = localStorage.getItem('cache_version')
  const lastVisit = localStorage.getItem('last_visit')
  const now = Date.now()
  const oneDayAgo = now - (24 * 60 * 60 * 1000)

  // Force reload if:
  // 1. Version mismatch
  // 2. No last visit recorded
  // 3. Last visit was before cache version update
  if (!currentVersion || 
      currentVersion !== CACHE_VERSION || 
      !lastVisit || 
      parseInt(lastVisit) < oneDayAgo) {
    
    console.log('🔄 Forcing cache clear for user...')
    
    // Clear all possible caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name)
        })
      })
    }

    // Clear localStorage except for essential data
    const essentialKeys = ['cache_version', 'last_visit']
    Object.keys(localStorage).forEach(key => {
      if (!essentialKeys.includes(key)) {
        localStorage.removeItem(key)
      }
    })

    // Clear sessionStorage
    sessionStorage.clear()

    // Update version and visit time
    localStorage.setItem('cache_version', CACHE_VERSION)
    localStorage.setItem('last_visit', now.toString())

    // Force hard reload
    window.location.reload()
  } else {
    // Update last visit time
    localStorage.setItem('last_visit', now.toString())
  }
}

// Add cache-busting to all URLs
export const addCacheBustingToUrl = (url: string) => {
  const params = getCacheBustingParams()
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}v=${params.v}&t=${params.t}&cb=${params.cb}`
}

// Force reload for all users
export const forceReloadAllUsers = () => {
  if (typeof window === 'undefined') return

  // Clear all caches
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name)
      })
    })
  }

  // Clear all storage
  localStorage.clear()
  sessionStorage.clear()

  // Force hard reload
  window.location.reload()
}

// Check if user needs cache clear
export const needsCacheClear = (): boolean => {
  if (typeof window === 'undefined') return false

  const currentVersion = localStorage.getItem('cache_version')
  return !currentVersion || currentVersion !== CACHE_VERSION
}
