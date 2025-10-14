import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Customer from '@/models/Customer'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { name, productId, productName } = await request.json()
    
    if (!name || !productId || !productName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const customer = new Customer({
      name,
      productId,
      productName
    })

    await customer.save()

    return NextResponse.json({ 
      success: true, 
      customer: {
        id: customer._id,
        name: customer.name,
        productId: customer.productId,
        productName: customer.productName,
        joinedAt: customer.joinedAt
      }
    })
  } catch (error) {
    console.error('Error saving customer:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save customer' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    
    // Get recent customers (last 24 hours) for notifications
    const recentCustomers = await Customer.find({
      joinedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    })
    .sort({ joinedAt: -1 })
    .limit(50)
    .lean()

    return NextResponse.json({ 
      success: true, 
      customers: recentCustomers.map(customer => ({
        id: customer._id.toString(),
        name: customer.name,
        productId: customer.productId,
        productName: customer.productName,
        joinedAt: customer.joinedAt
      }))
    })
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}
