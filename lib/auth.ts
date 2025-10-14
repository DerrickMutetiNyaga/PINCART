import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import connectDB from './mongodb'
import User from '@/models/User'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'fallback-secret'

export interface UserData {
  id: string
  email: string
  name?: string
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
}

export interface AuthResult {
  user: UserData | null
  token?: string
  error?: string
}

export function generateToken(user: UserData): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): UserData | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    }
  } catch {
    return null
  }
}

export async function authenticateUser(email: string, password: string): Promise<AuthResult> {
  try {
    await connectDB()
    
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return { user: null, error: 'Invalid credentials' }
    }

    const isValidPassword = await user.comparePassword(password)
    if (!isValidPassword) {
      return { user: null, error: 'Invalid credentials' }
    }

    const userData: UserData = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role as 'USER' | 'ADMIN' | 'SUPER_ADMIN'
    }

    const token = generateToken(userData)

    return { user: userData, token }
  } catch (error) {
    console.error('Authentication error:', error)
    return { user: null, error: 'Authentication failed' }
  }
}

export async function getCurrentUser(request: NextRequest): Promise<UserData | null> {
  try {
    const token = request.cookies.get('auth-token')?.value
    if (!token) return null

    const user = verifyToken(token)
    return user
  } catch {
    return null
  }
}

export async function requireSuperAdmin(request: NextRequest): Promise<UserData | null> {
  const user = await getCurrentUser(request)
  if (!user || user.role !== 'SUPER_ADMIN') {
    return null
  }
  return user
}

export async function createSuperAdmin(): Promise<void> {
  try {
    await connectDB()
    
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@pinkcart.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'SuperSecureAdmin123!'

    // Check if super admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail })

    if (existingAdmin) {
      console.log('Super admin already exists')
      return
    }

    // Create super admin
    await User.create({
      email: adminEmail,
      name: 'Super Admin',
      password: adminPassword, // Will be hashed by the pre-save middleware
      role: 'SUPER_ADMIN'
    })

    console.log('Super admin created successfully')
  } catch (error) {
    console.error('Error creating super admin:', error)
  }
}
