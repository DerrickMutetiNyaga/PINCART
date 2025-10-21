import { NextRequest, NextResponse } from 'next/server'
import { requireSuperAdmin } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

// GET all products for admin
export async function GET(request: NextRequest) {
  try {
    console.log('👑 ADMIN API: Starting database connection...')
    await connectDB()
    console.log('👑 ADMIN API: Database connected successfully')
    
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean()
    
    console.log(`👑 ADMIN API: Found ${products.length} products in database`)
    console.log(`👑 ADMIN API: Product names:`, products.map(p => p.name))
    console.log(`👑 ADMIN API: Latest product created:`, products[0]?.createdAt)
    
    // Transform for admin interface
    const transformedProducts = products.map(product => ({
      ...product,
      id: product._id.toString(),
      image: product.images && product.images.length > 0 ? product.images[0] : product.image
    }))
    
    console.log(`👑 ADMIN API: Returning ${transformedProducts.length} products to admin`)
    
    return NextResponse.json({ products: transformedProducts })
  } catch (error) {
    console.error('❌ ADMIN API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const user = await requireSuperAdmin(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Access denied. Super admin privileges required.' },
        { status: 403 }
      )
    }

    await connectDB()
    
    const productData = await request.json()
    
    console.log('🆕 Creating new product:', productData.name)
    console.log('🆕 Product data:', JSON.stringify(productData, null, 2))
    
    // Create the product
    const product = await Product.create(productData)
    
    console.log('✅ Product created successfully:', product._id)
    console.log('✅ Product details:', {
      id: product._id,
      name: product.name,
      category: product.category,
      createdAt: product.createdAt
    })
    
    // Verify the product was saved by fetching it back
    const savedProduct = await Product.findById(product._id)
    console.log('✅ Verification - Product exists in DB:', !!savedProduct)
    
    return NextResponse.json({ 
      success: true, 
      product,
      message: 'Product created successfully' 
    })
  } catch (error) {
    console.error('❌ Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// PUT update existing product
export async function PUT(request: NextRequest) {
  try {
    const user = await requireSuperAdmin(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Access denied. Super admin privileges required.' },
        { status: 403 }
      )
    }

    await connectDB()
    
    const { id, ...productData } = await request.json()
    
    const product = await Product.findByIdAndUpdate(
      id,
      productData,
      { new: true, runValidators: true }
    )
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      product,
      message: 'Product updated successfully' 
    })
  } catch (error) {
    console.error('❌ Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE product
export async function DELETE(request: NextRequest) {
  try {
    const user = await requireSuperAdmin(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Access denied. Super admin privileges required.' },
        { status: 403 }
      )
    }

    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }
    
    const product = await Product.findByIdAndDelete(id)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Product deleted successfully' 
    })
  } catch (error) {
    console.error('❌ Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
