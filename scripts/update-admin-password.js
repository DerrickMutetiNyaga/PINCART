const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pinkcart'

async function updateAdminPassword() {
  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db('pinkcart')
    const adminsCollection = db.collection('admins')
    
    // Find the existing admin user
    const existingAdmin = await adminsCollection.findOne({ username: 'admin' })
    if (!existingAdmin) {
      console.log('Admin user "admin" not found')
      return
    }
    
    // Generate a more secure password
    const securePassword = 'Admin2025!@#PinkCart'
    const hashedPassword = await bcrypt.hash(securePassword, 12)
    
    // Update the admin password
    const result = await adminsCollection.updateOne(
      { username: 'admin' },
      { $set: { password: hashedPassword } }
    )
    
    if (result.modifiedCount > 0) {
      console.log('Admin password updated successfully')
      console.log('Username: admin')
      console.log('New Password: Admin2025!@#PinkCart')
      console.log('')
      console.log('🔐 SECURITY NOTES:')
      console.log('- This password contains uppercase, lowercase, numbers, and special characters')
      console.log('- Password is hashed with bcrypt (12 rounds)')
      console.log('- Store these credentials securely')
    } else {
      console.log('Failed to update admin password')
    }
    
  } catch (error) {
    console.error('Error updating admin password:', error)
  } finally {
    await client.close()
  }
}

updateAdminPassword()
