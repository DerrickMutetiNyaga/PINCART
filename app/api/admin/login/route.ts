import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    console.log('Admin login attempt started')
    
    const { email, password } = await request.json()

    if (!email || !password) {
      console.log('Missing email or password')
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    console.log('Attempting authentication for:', email)
    const result = await authenticateUser(email, password)

    if (!result.user) {
      console.log('Authentication failed:', result.error)
      return NextResponse.json(
        { error: result.error || 'Authentication failed' },
        { status: 401 }
      )
    }

    // Check if user is admin or super admin
    if (result.user.role !== 'ADMIN' && result.user.role !== 'SUPER_ADMIN') {
      console.log('Access denied - insufficient privileges for user:', result.user.role)
      return NextResponse.json(
        { error: 'Access denied. Admin privileges required.' },
        { status: 403 }
      )
    }

    console.log('Login successful for user:', result.user.email)
    const response = NextResponse.json({
      user: result.user,
      message: 'Login successful'
    })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
