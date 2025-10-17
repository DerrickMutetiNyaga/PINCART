/**
 * Cache Busting Utility
 * Ensures all requests bypass cache for fresh data
 */

export const getCacheBustingHeaders = () => ({
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
  'Surrogate-Control': 'no-store',
})

export const getCacheBustingFetchOptions = () => ({
  cache: 'no-store' as RequestCache,
  headers: getCacheBustingHeaders(),
})

export const addCacheBustingToUrl = (url: string) => {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}t=${Date.now()}&_cb=${Math.random().toString(36).substr(2, 9)}`
}

export const createCacheBustingFetch = (url: string, options: RequestInit = {}) => {
  const cacheBustedUrl = addCacheBustingToUrl(url)
  const cacheBustingOptions = {
    ...options,
    ...getCacheBustingFetchOptions(),
    headers: {
      ...getCacheBustingHeaders(),
      ...options.headers,
    },
  }
  
  return fetch(cacheBustedUrl, cacheBustingOptions)
}

// Utility for Next.js API routes
export const addCacheBustingHeaders = (response: Response) => {
  const headers = getCacheBustingHeaders()
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}
