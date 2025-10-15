import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    console.log('Health check started...')
    console.log('Environment variables check:')
    console.log('- MONGODB_URI exists:', !!process.env.MONGODB_URI)
    console.log('- NEXTAUTH_SECRET exists:', !!process.env.NEXTAUTH_SECRET)
    console.log('- NODE_ENV:', process.env.NODE_ENV)
    
    // Test database connection
    await connectDB()
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET
      }
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET
      }
    }, { status: 500 })
  }
}
