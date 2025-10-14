import 'dotenv/config'
import connectDB from '../lib/mongodb'
import User from '../models/User'
import Product from '../models/Product'
import Order from '../models/Order'

const users = [
  {
    email: 'sarah.johnson@email.com',
    name: 'Sarah Johnson',
    password: 'password123',
    role: 'USER'
  },
  {
    email: 'emma.wilson@email.com',
    name: 'Emma Wilson',
    password: 'password123',
    role: 'USER'
  },
  {
    email: 'lily.chen@email.com',
    name: 'Lily Chen',
    password: 'password123',
    role: 'USER'
  },
  {
    email: 'mia.rodriguez@email.com',
    name: 'Mia Rodriguez',
    password: 'password123',
    role: 'USER'
  },
  {
    email: 'sophie.kim@email.com',
    name: 'Sophie Kim',
    password: 'password123',
    role: 'USER'
  }
]

async function seedUsersAndOrders() {
  try {
    console.log('Connecting to database...')
    await connectDB()
    
    console.log('Seeding users...')
    // Clear existing users (except super admin)
    await User.deleteMany({ role: 'USER' })
    
    // Insert new users
    const createdUsers = await User.insertMany(users)
    console.log(`✅ Created ${createdUsers.length} users`)
    
    console.log('Getting products for orders...')
    const products = await Product.find()
    
    if (products.length === 0) {
      console.log('❌ No products found. Please run seed-data first.')
      process.exit(1)
    }
    
    console.log('Creating sample orders...')
    // Clear existing orders
    await Order.deleteMany({})
    
    // Create sample orders
    const orders = [
      {
        userId: createdUsers[0]._id,
        productId: products[0]._id,
        quantity: 2,
        status: 'DELIVERED'
      },
      {
        userId: createdUsers[1]._id,
        productId: products[1]._id,
        quantity: 1,
        status: 'SHIPPED'
      },
      {
        userId: createdUsers[2]._id,
        productId: products[2]._id,
        quantity: 3,
        status: 'CONFIRMED'
      },
      {
        userId: createdUsers[3]._id,
        productId: products[3]._id,
        quantity: 1,
        status: 'PENDING'
      },
      {
        userId: createdUsers[4]._id,
        productId: products[4]._id,
        quantity: 2,
        status: 'DELIVERED'
      },
      {
        userId: createdUsers[0]._id,
        productId: products[5]._id,
        quantity: 1,
        status: 'CANCELLED'
      },
      {
        userId: createdUsers[1]._id,
        productId: products[6]._id,
        quantity: 1,
        status: 'SHIPPED'
      },
      {
        userId: createdUsers[2]._id,
        productId: products[7]._id,
        quantity: 2,
        status: 'CONFIRMED'
      }
    ]
    
    const createdOrders = await Order.insertMany(orders)
    console.log(`✅ Created ${createdOrders.length} orders`)
    
    console.log('🎉 Users and orders seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`- Users: ${createdUsers.length}`)
    console.log(`- Orders: ${createdOrders.length}`)
    console.log('\n👥 Sample Users:')
    createdUsers.forEach(user => {
      console.log(`  - ${user.name} (${user.email})`)
    })
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding users and orders:', error)
    process.exit(1)
  }
}

seedUsersAndOrders()
