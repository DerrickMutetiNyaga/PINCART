import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const testData = {
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        VERCEL_ENV: process.env.VERCEL_ENV,
        MONGODB_URI: {
          exists: !!process.env.MONGODB_URI,
          length: process.env.MONGODB_URI?.length || 0,
          startsWith: process.env.MONGODB_URI?.substring(0, 20) || 'NOT_SET'
        },
        CLOUDINARY_CLOUD_NAME: {
          exists: !!process.env.CLOUDINARY_CLOUD_NAME,
          value: process.env.CLOUDINARY_CLOUD_NAME || 'NOT_SET'
        }
      },
      message: 'Vercel deployment test successful'
    }

    console.log('🧪 VERCEL TEST:', testData)

    return NextResponse.json({
      success: true,
      ...testData
    })
  } catch (error) {
    console.error('❌ Vercel test error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Vercel test failed',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
