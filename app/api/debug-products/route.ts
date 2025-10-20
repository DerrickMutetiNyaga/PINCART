import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectDB()
    
    const products = await Product.find().sort({ createdAt: -1 }).lean()
    
    return NextResponse.json({
      success: true,
      totalProducts: products.length,
      inStockTrue: products.filter(p => p.inStock === true).length,
      inStockFalse: products.filter(p => p.inStock === false).length,
      inStockUndefined: products.filter(p => p.inStock === undefined).length,
      products: products.map(product => ({
        id: product._id.toString(),
        name: product.name,
        inStock: product.inStock,
        category: product.category,
        price: product.price
      }))
    })
    
  } catch (error) {
    console.error('Debug API error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
