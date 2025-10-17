/**
 * Chunk Loading Error Handler
 * Handles missing JavaScript chunks and provides fallback mechanisms
 */

interface ChunkError {
  message: string
  chunkId?: string
  url?: string
}

class ChunkLoader {
  private retryCount = 0
  private maxRetries = 3
  private retryDelay = 1000

  constructor() {
    this.setupGlobalErrorHandler()
  }

  private setupGlobalErrorHandler() {
    // Handle chunk loading errors
    window.addEventListener('error', (event) => {
      if (this.isChunkError(event)) {
        this.handleChunkError(event)
      }
    })

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      if (this.isChunkError(event.reason)) {
        this.handleChunkError(event.reason)
      }
    })
  }

  private isChunkError(error: any): boolean {
    const message = error?.message || error?.toString() || ''
    return (
      message.includes('ChunkLoadError') ||
      message.includes('Loading chunk') ||
      message.includes('Loading CSS chunk') ||
      message.includes('Failed to fetch')
    )
  }

  private handleChunkError(error: any) {
    console.warn('Chunk loading error detected:', error)
    
    if (this.retryCount < this.maxRetries) {
      this.retryCount++
      console.log(`Retrying chunk load (attempt ${this.retryCount}/${this.maxRetries})`)
      
      setTimeout(() => {
        this.retryChunkLoad()
      }, this.retryDelay * this.retryCount)
    } else {
      console.error('Max retries reached, forcing page reload')
      this.forceReload()
    }
  }

  private retryChunkLoad() {
    // Clear module cache and retry
    if (typeof window !== 'undefined' && (window as any).__webpack_require__) {
      try {
        // Clear the failed chunk from cache
        const webpackRequire = (window as any).__webpack_require__
        if (webpackRequire.cache) {
          // Clear specific chunk from cache
          Object.keys(webpackRequire.cache).forEach(key => {
            if (key.includes('chunks/app/shop/page-')) {
              delete webpackRequire.cache[key]
            }
          })
        }
      } catch (e) {
        console.warn('Could not clear webpack cache:', e)
      }
    }
  }

  private forceReload() {
    // Force a hard reload to get fresh chunks
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  public reset() {
    this.retryCount = 0
  }
}

// Create global instance
export const chunkLoader = new ChunkLoader()

// Export utility functions
export const handleChunkError = (error: ChunkError) => {
  chunkLoader['handleChunkError'](error)
}

export const resetChunkLoader = () => {
  chunkLoader.reset()
}
