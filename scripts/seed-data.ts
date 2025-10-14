import 'dotenv/config'
import connectDB from '../lib/mongodb'
import Category from '../models/Category'
import Product from '../models/Product'

const categories = [
  {
    name: 'Girly Finds',
    description: 'Cute and aesthetic items for the girly girl',
    isActive: true,
    sortOrder: 1
  },
  {
    name: 'Dorm/Kitchen Essentials',
    description: 'Essential items for dorm life and kitchen organization',
    isActive: true,
    sortOrder: 2
  },
  {
    name: 'Tech & Accessories',
    description: 'Technology gadgets and phone accessories',
    isActive: true,
    sortOrder: 3
  },
  {
    name: 'Beauty & Personal Care',
    description: 'Beauty products and personal care items',
    isActive: true,
    sortOrder: 4
  }
]

const products = [
  {
    name: 'Cute Pink Desk Organizer Set',
    price: 1200,
    originalPrice: 2500,
    image: '/pink-desk-organizer.jpg',
    cloudinaryId: 'pinkcart/products/desk-organizer',
    category: 'Dorm/Kitchen Essentials',
    description: 'Adorable pink desk organizer to keep your workspace tidy and cute',
    features: ['Multiple compartments', 'Durable plastic', 'Easy to clean', 'Stackable design'],
    inStock: true,
    joinedCount: 34,
    shippingEstimate: 'Ships in 2-4 days'
  },
  {
    name: 'Aesthetic LED Mirror with Hearts',
    price: 2800,
    originalPrice: 4500,
    image: '/led-mirror-hearts.jpg',
    cloudinaryId: 'pinkcart/products/led-mirror',
    category: 'Beauty & Personal Care',
    description: 'Cute LED mirror with heart-shaped lights, perfect for your vanity setup',
    features: ['Adjustable brightness', 'USB powered', 'Touch control', '360° rotation'],
    inStock: true,
    joinedCount: 28,
    shippingEstimate: 'Ships in 3-5 days'
  },
  {
    name: 'Kawaii Phone Accessories Bundle',
    price: 800,
    originalPrice: 1500,
    image: '/kawaii-phone-accessories.jpg',
    cloudinaryId: 'pinkcart/products/phone-accessories',
    category: 'Tech & Accessories',
    description: 'Super cute phone accessories including pop socket and charm',
    features: ['Universal fit', 'Strong adhesive', 'Reusable', 'Cute designs'],
    inStock: true,
    joinedCount: 45,
    shippingEstimate: 'Ships in 1-3 days'
  },
  {
    name: 'Pastel Rainbow Stationery Set',
    price: 950,
    originalPrice: 1800,
    image: '/pastel-stationery.jpg',
    cloudinaryId: 'pinkcart/products/stationery',
    category: 'Dorm/Kitchen Essentials',
    description: 'Beautiful pastel stationery set for your study needs',
    features: ['High quality paper', 'Smooth writing', 'Pastel colors', 'Complete set'],
    inStock: true,
    joinedCount: 22,
    shippingEstimate: 'Ships in 2-4 days'
  },
  {
    name: 'Fluffy Cloud Night Light',
    price: 1500,
    originalPrice: 2800,
    image: '/cloud-night-light.jpg',
    cloudinaryId: 'pinkcart/products/night-light',
    category: 'Girly Finds',
    description: 'Adorable cloud-shaped night light for your bedroom',
    features: ['Soft LED light', 'USB rechargeable', 'Touch control', 'Portable'],
    inStock: true,
    joinedCount: 31,
    shippingEstimate: 'Ships in 3-5 days'
  },
  {
    name: 'Wireless Earbuds - Pink Edition',
    price: 2200,
    originalPrice: 3500,
    image: '/pink-earbuds.jpg',
    cloudinaryId: 'pinkcart/products/earbuds',
    category: 'Tech & Accessories',
    description: 'Cute pink wireless earbuds with great sound quality',
    features: ['Bluetooth 5.0', 'Noise cancellation', 'Long battery life', 'Comfortable fit'],
    inStock: true,
    joinedCount: 38,
    shippingEstimate: 'Ships in 2-4 days'
  },
  {
    name: 'Cute Kitchen Timer & Scale Set',
    price: 1800,
    originalPrice: 3200,
    image: '/kitchen-timer-scale.jpg',
    cloudinaryId: 'pinkcart/products/kitchen-timer',
    category: 'Dorm/Kitchen Essentials',
    description: 'Adorable kitchen timer and digital scale set',
    features: ['Digital display', 'Precise measurements', 'Easy to clean', 'Compact design'],
    inStock: true,
    joinedCount: 19,
    shippingEstimate: 'Ships in 2-4 days'
  },
  {
    name: 'Aesthetic Jewelry Organizer Box',
    price: 1400,
    originalPrice: 2600,
    image: '/jewelry-organizer.jpg',
    cloudinaryId: 'pinkcart/products/jewelry-organizer',
    category: 'Girly Finds',
    description: 'Beautiful jewelry organizer to keep your accessories organized',
    features: ['Multiple compartments', 'Soft lining', 'Compact size', 'Elegant design'],
    inStock: true,
    joinedCount: 27,
    shippingEstimate: 'Ships in 3-5 days'
  },
  {
    name: 'Portable Mini Projector - Pink',
    price: 3500,
    originalPrice: 5500,
    image: '/mini-projector.jpg',
    cloudinaryId: 'pinkcart/products/projector',
    category: 'Tech & Accessories',
    description: 'Cute pink mini projector for movies and presentations',
    features: ['HD quality', 'Wireless connection', 'Portable', 'Long battery life'],
    inStock: true,
    joinedCount: 15,
    shippingEstimate: 'Ships in 3-5 days'
  },
  {
    name: 'LED Vanity Mirror with Hearts',
    price: 2450,
    originalPrice: 4000,
    image: '/led-mirror-with-hearts-lit-up.jpg',
    cloudinaryId: 'pinkcart/products/vanity-mirror',
    category: 'Beauty & Personal Care',
    description: 'Professional LED vanity mirror with heart-shaped lights',
    features: ['Adjustable brightness', 'USB powered', 'Touch control', '360° rotation'],
    inStock: true,
    joinedCount: 23,
    shippingEstimate: 'Ships in 3-5 days'
  }
]

async function seedData() {
  try {
    console.log('Connecting to database...')
    await connectDB()
    
    console.log('Seeding categories...')
    // Clear existing categories
    await Category.deleteMany({})
    
    // Insert new categories
    const createdCategories = await Category.insertMany(categories)
    console.log(`✅ Created ${createdCategories.length} categories`)
    
    console.log('Seeding products...')
    // Clear existing products
    await Product.deleteMany({})
    
    // Insert new products
    const createdProducts = await Product.insertMany(products)
    console.log(`✅ Created ${createdProducts.length} products`)
    
    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`- Categories: ${createdCategories.length}`)
    console.log(`- Products: ${createdProducts.length}`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedData()
