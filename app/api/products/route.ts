import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    console.log('🛍️ PUBLIC API: Starting database connection...')
    console.log('🛍️ PUBLIC API: MONGODB_URI exists:', !!process.env.MONGODB_URI)
    console.log('🛍️ PUBLIC API: Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      MONGODB_URI_LENGTH: process.env.MONGODB_URI?.length || 0
    })
    
    // Force no caching
    const headers = new Headers()
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0')
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')
    headers.set('Surrogate-Control', 'no-store')
    headers.set('Last-Modified', 'Thu, 01 Jan 1970 00:00:00 GMT')
    headers.set('ETag', '"0"')
    headers.set('Vary', '*')
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined!')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Database configuration missing',
          details: 'MONGODB_URI environment variable is not set',
          environment: {
            NODE_ENV: process.env.NODE_ENV,
            VERCEL: process.env.VERCEL,
            MONGODB_URI_EXISTS: !!process.env.MONGODB_URI
          }
        },
        { status: 500 }
      )
    }
    
    await connectDB()
    console.log('🛍️ PUBLIC API: Database connected successfully')
    
    // Get all products from database
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean()
    
    console.log(`🛍️ PUBLIC API: Found ${products.length} products in database`)
    console.log(`🛍️ PUBLIC API: Product names:`, products.map(p => p.name))
    console.log(`🛍️ PUBLIC API: Latest product created:`, products[0]?.createdAt)
    
    // Transform products for client
    const transformedProducts = products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images && product.images.length > 0 ? product.images[0] : product.image,
      images: product.images || [],
      joinedCount: product.joinedCount || 0,
      category: product.category,
      description: product.description,
      features: product.features || [],
      inStock: product.inStock,
      shippingEstimate: product.shippingEstimate
    }))
    
    console.log(`🛍️ PUBLIC API: Returning ${transformedProducts.length} products to client`)
    
    return NextResponse.json({
      success: true,
      products: transformedProducts,
      timestamp: new Date().toISOString(),
      count: transformedProducts.length
    }, { headers })
  } catch (error) {
    console.error('❌ PUBLIC API Error:', error)
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products',
        details: error.message,
        environment: {
          NODE_ENV: process.env.NODE_ENV,
          VERCEL: process.env.VERCEL,
          MONGODB_URI_EXISTS: !!process.env.MONGODB_URI
        }
      },
      { status: 500 }
    )
  }
}
