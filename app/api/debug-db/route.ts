import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectDB()
    
    // Get basic product count and sample data
    const productCount = await Product.countDocuments()
    const sampleProducts = await Product.find().limit(3).lean()
    
    return NextResponse.json({
      success: true,
      database: 'Connected',
      productCount,
      sampleProducts: sampleProducts.map(product => ({
        id: product._id.toString(),
        name: product.name,
        hasImage: !!product.image,
        hasImages: product.images && product.images.length > 0,
        imagesCount: product.images ? product.images.length : 0,
        inStock: product.inStock
      })),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database debug error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
