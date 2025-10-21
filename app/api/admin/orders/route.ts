import { NextRequest, NextResponse } from 'next/server'
import { requireSuperAdmin } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import Product from '@/models/Product'
import User from '@/models/User'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('productId', 'name price image')
      .sort({ createdAt: -1 })
    
    // Transform _id to id for frontend compatibility
    const transformedOrders = orders.map(order => ({
      ...order.toObject(),
      id: order._id.toString()
    }))
    
    return NextResponse.json({ orders: transformedOrders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
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
    
    const orderData = await request.json()
    
    // Validate that user and product exist
    const userExists = await User.findById(orderData.userId)
    if (!userExists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 400 }
      )
    }

    const productExists = await Product.findById(orderData.productId)
    if (!productExists) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 400 }
      )
    }

    const order = await Order.create(orderData)
    
    // Populate the order with user and product details
    const populatedOrder = await Order.findById(order._id)
      .populate('userId', 'name email')
      .populate('productId', 'name price image')
    
    return NextResponse.json({ 
      success: true, 
      order: populatedOrder,
      message: 'Order created successfully' 
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
