import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { PhoneNumber } from '@/lib/models'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json()

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Validate Kenyan phone number
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    if (cleanPhone.length !== 10 || (!cleanPhone.startsWith('07') && !cleanPhone.startsWith('01'))) {
      return NextResponse.json(
        { error: 'Please enter a valid Kenyan phone number' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const phoneNumbersCollection = db.collection<PhoneNumber>('phoneNumbers')

    // Check if phone number already exists
    const existingNumber = await phoneNumbersCollection.findOne({ phoneNumber: cleanPhone })
    if (existingNumber) {
      return NextResponse.json(
        { error: 'This phone number is already registered' },
        { status: 409 }
      )
    }

    // Get client IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Insert new phone number
    const newPhoneNumber: PhoneNumber = {
      phoneNumber: cleanPhone,
      createdAt: new Date(),
      ipAddress,
      userAgent
    }

    const result = await phoneNumbersCollection.insertOne(newPhoneNumber)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Phone number registered successfully',
        id: result.insertedId 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Error saving phone number:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const db = await getDatabase()
    const phoneNumbersCollection = db.collection<PhoneNumber>('phoneNumbers')
    
    const phoneNumbers = await phoneNumbersCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ phoneNumbers })

  } catch (error) {
    console.error('Error fetching phone numbers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
