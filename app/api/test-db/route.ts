import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    console.log('🧪 TEST API: Starting database test...')
    
    await connectDB()
    console.log('🧪 TEST API: Database connected')
    
    const totalProducts = await Product.countDocuments()
    console.log(`🧪 TEST API: Total products in database: ${totalProducts}`)
    
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .select('name createdAt')
      .lean()
    
    console.log('🧪 TEST API: Latest 3 products:', latestProducts)
    
    return NextResponse.json({
      success: true,
      totalProducts,
      latestProducts,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ TEST API Error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
