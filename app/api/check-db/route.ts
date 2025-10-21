import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    console.log('🔍 CHECK DB: Starting database check...')
    
    await connectDB()
    console.log('🔍 CHECK DB: Database connected')
    
    // Get total count
    const totalCount = await Product.countDocuments()
    console.log(`🔍 CHECK DB: Total products: ${totalCount}`)
    
    // Get all products with details
    const allProducts = await Product.find()
      .sort({ createdAt: -1 })
      .select('name category inStock createdAt')
      .lean()
    
    console.log('🔍 CHECK DB: All products:', allProducts)
    
    // Get latest 5 products
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()
    
    console.log('🔍 CHECK DB: Latest 5 products:', latestProducts.map(p => ({
      name: p.name,
      category: p.category,
      createdAt: p.createdAt
    })))
    
    return NextResponse.json({
      success: true,
      totalCount,
      allProducts: allProducts.map(p => ({
        id: p._id.toString(),
        name: p.name,
        category: p.category,
        inStock: p.inStock,
        createdAt: p.createdAt
      })),
      latestProducts: latestProducts.map(p => ({
        id: p._id.toString(),
        name: p.name,
        category: p.category,
        inStock: p.inStock,
        createdAt: p.createdAt
      }))
    })
  } catch (error) {
    console.error('❌ CHECK DB Error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
