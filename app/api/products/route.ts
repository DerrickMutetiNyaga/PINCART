import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET() {
  try {
    await connectDB()
    
    const products = await Product.find({ inStock: true })
      .sort({ createdAt: -1 })
      .lean()
    
    return NextResponse.json({
      success: true,
      products: products.map(product => ({
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
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
