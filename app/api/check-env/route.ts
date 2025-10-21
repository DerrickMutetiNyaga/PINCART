import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      MONGODB_URI: {
        exists: !!process.env.MONGODB_URI,
        length: process.env.MONGODB_URI?.length || 0,
        startsWith: process.env.MONGODB_URI?.substring(0, 10) || 'NOT_SET'
      },
      CLOUDINARY_CLOUD_NAME: {
        exists: !!process.env.CLOUDINARY_CLOUD_NAME,
        value: process.env.CLOUDINARY_CLOUD_NAME || 'NOT_SET'
      },
      JWT_SECRET: {
        exists: !!process.env.JWT_SECRET,
        length: process.env.JWT_SECRET?.length || 0
      },
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT_SET',
      NEXTAUTH_SECRET: {
        exists: !!process.env.NEXTAUTH_SECRET,
        length: process.env.NEXTAUTH_SECRET?.length || 0
      }
    }

    console.log('🔍 Environment Check:', envCheck)

    return NextResponse.json({
      success: true,
      environment: envCheck,
      timestamp: new Date().toISOString(),
      deployment: process.env.VERCEL ? 'Vercel' : 'Local'
    })
  } catch (error) {
    console.error('❌ Environment check error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Environment check failed',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
