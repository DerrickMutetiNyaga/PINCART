const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const MONGODB_URI = 'mongodb+srv://pinkcartkenya:pinkcartkenya@cluster0.tqsotdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

async function addSecureAdmin() {
  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db('pinkcart')
    const adminsCollection = db.collection('admins')
    
    // Check if adminone already exists
    const existingAdmin = await adminsCollection.findOne({ username: 'adminone' })
    if (existingAdmin) {
      console.log('Admin user "adminone" already exists')
      return
    }
    
    // Generate a secure password
    const securePassword = 'PinkCart2025!@#Secure'
    const hashedPassword = await bcrypt.hash(securePassword, 12)
    
    // Create secure admin user
    const admin = {
      username: 'adminone',
      password: hashedPassword,
      email: 'adminone@pinkcart.com',
      createdAt: new Date(),
      lastLogin: null
    }
    
    const result = await adminsCollection.insertOne(admin)
    console.log('Secure admin user created successfully:', result.insertedId)
    console.log('Username: adminone')
    console.log('Password: PinkCart2025!@#Secure')
    console.log('')
    console.log('🔐 SECURITY NOTES:')
    console.log('- This password contains uppercase, lowercase, numbers, and special characters')
    console.log('- Password is hashed with bcrypt (12 rounds)')
    console.log('- Store these credentials securely')
    console.log('- Consider changing the password after first login')
    
  } catch (error) {
    console.error('Error creating secure admin:', error)
  } finally {
    await client.close()
  }
}

addSecureAdmin()
