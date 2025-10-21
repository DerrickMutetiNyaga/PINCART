import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Category from '@/models/Category'

export async function GET() {
  try {
    await connectDB()
    
    const categories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean()
    
    return NextResponse.json({
      success: true,
      categories: categories.map(category => ({
        id: category._id.toString(),
        name: category.name,
        description: category.description,
        image: category.image,
        isActive: category.isActive,
        sortOrder: category.sortOrder
      }))
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
