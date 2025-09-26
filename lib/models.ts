import { ObjectId } from 'mongodb'

export interface PhoneNumber {
  _id?: ObjectId
  phoneNumber: string
  createdAt: Date
  ipAddress?: string
  userAgent?: string
}

export interface Admin {
  _id?: ObjectId
  username: string
  password: string
  email: string
  createdAt: Date
  lastLogin?: Date
}

export interface AdminSession {
  adminId: string
  token: string
  expiresAt: Date
}
