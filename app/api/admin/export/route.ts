import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { PhoneNumber } from '@/lib/models'
import * as XLSX from 'xlsx'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin-token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET!)
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Fetch phone numbers from database
    const db = await getDatabase()
    const phoneNumbersCollection = db.collection<PhoneNumber>('phoneNumbers')
    
    const phoneNumbers = await phoneNumbersCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    // Prepare data for Excel
    const excelData = phoneNumbers.map((phone, index) => ({
      'S/N': index + 1,
      'Phone Number': phone.phoneNumber,
      'Registration Date': new Date(phone.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }))

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(excelData)

    // Set column widths
    const columnWidths = [
      { wch: 5 },   // S/N
      { wch: 15 },  // Phone Number
      { wch: 25 }   // Registration Date
    ]
    worksheet['!cols'] = columnWidths

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Phone Numbers')

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, { 
      type: 'buffer', 
      bookType: 'xlsx' 
    })

    // Generate filename with current date
    const currentDate = new Date().toISOString().split('T')[0]
    const filename = `pink-cart-phone-numbers-${currentDate}.xlsx`

    // Return Excel file as response
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': excelBuffer.length.toString()
      }
    })

  } catch (error) {
    console.error('Error exporting phone numbers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
