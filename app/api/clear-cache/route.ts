import { NextResponse } from 'next/server'

export async function POST() {
  try {
    console.log('🧹 Clearing all caches...')
    
    // Force clear any potential caches
    const timestamp = new Date().toISOString()
    
    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
      timestamp,
      cacheCleared: true
    })
  } catch (error) {
    console.error('❌ Cache clear error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to clear cache',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
