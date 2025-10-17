import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Customer from '@/models/Customer'

export async function GET() {
  try {
    await connectDB()
    
    // Get very recent customers (last 5 minutes) for real-time notifications
    const recentCustomers = await Customer.find({
      joinedAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
    })
    .sort({ joinedAt: -1 })
    .limit(10)
    .lean()

    const response = NextResponse.json({ 
      success: true, 
      notifications: recentCustomers.map(customer => ({
        id: customer._id.toString(),
        name: customer.name,
        productName: customer.productName,
        joinedAt: customer.joinedAt
      }))
    })
    
    // Disable caching to ensure fresh data on Vercel
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')
    
    return response
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}
