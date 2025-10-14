import { NextRequest, NextResponse } from 'next/server'
import { requireSuperAdmin } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Category from '@/models/Category'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const categories = await Category.find().sort({ sortOrder: 1, createdAt: -1 })
    
    // Transform _id to id for frontend compatibility
    const transformedCategories = categories.map(category => ({
      ...category.toObject(),
      id: category._id.toString()
    }))
    
    const response = NextResponse.json({ categories: transformedCategories })
    
    // Disable caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')
    
    return response
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is super admin
    const user = await requireSuperAdmin(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Access denied. Super admin privileges required.' },
        { status: 403 }
      )
    }

    await connectDB()
    
    const categoryData = await request.json()
    
    const category = await Category.create(categoryData)
    
    return NextResponse.json({ 
      success: true, 
      category,
      message: 'Category created successfully' 
    })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
