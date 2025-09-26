const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')

const MONGODB_URI = 'mongodb+srv://pinkcartkenya:pinkcartkenya@cluster0.tqsotdc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

async function seedAdmin() {
  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db('pinkcart')
    const adminsCollection = db.collection('admins')
    
    // Check if admin already exists
    const existingAdmin = await adminsCollection.findOne({ username: 'admin' })
    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash('pinkcart2025', 12)
    
    // Create admin user
    const admin = {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@pinkcart.com',
      createdAt: new Date(),
      lastLogin: null
    }
    
    const result = await adminsCollection.insertOne(admin)
    console.log('Admin user created successfully:', result.insertedId)
    console.log('Username: admin')
    console.log('Password: pinkcart2025')
    
  } catch (error) {
    console.error('Error seeding admin:', error)
  } finally {
    await client.close()
  }
}

seedAdmin()
