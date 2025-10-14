import { NextRequest, NextResponse } from 'next/server'
import { requireSuperAdmin } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Category from '@/models/Category'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { id } = params
    
    // Validate ID
    if (!id || id === 'undefined') {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      )
    }
    
    const category = await Category.findByIdAndUpdate(id, categoryData, { new: true })
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      category,
      message: 'Category updated successfully' 
    })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const { id } = params
    
    // Validate ID
    if (!id || id === 'undefined') {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      )
    }
    
    const category = await Category.findByIdAndDelete(id)
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Category deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
