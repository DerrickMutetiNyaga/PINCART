import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectDB()
    
    const totalProducts = await Product.countDocuments()
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .select('name category inStock createdAt')
      .lean()
    
    console.log(`🔍 DEBUG: Total products in database: ${totalProducts}`)
    console.log(`🔍 DEBUG: Products:`, products.map(p => ({ name: p.name, category: p.category, inStock: p.inStock })))
    
    return NextResponse.json({
      success: true,
      totalProducts,
      products: products.map(product => ({
        id: product._id.toString(),
        name: product.name,
        category: product.category,
        inStock: product.inStock,
        createdAt: product.createdAt
      }))
    })
  } catch (error) {
    console.error('❌ Debug API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to debug products' },
      { status: 500 }
    )
  }
}