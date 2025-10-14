import mongoose, { Document, Schema } from 'mongoose'

export interface IProduct extends Document {
  name: string
  price: number
  originalPrice?: number
  image?: string
  cloudinaryId?: string
  images?: string[]
  cloudinaryIds?: string[]
  category: string
  description?: string
  features: string[]
  inStock: boolean
  joinedCount: number
  shippingEstimate?: string
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  image: {
    type: String,
    trim: true
  },
  cloudinaryId: {
    type: String,
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  cloudinaryIds: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  joinedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  shippingEstimate: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
})

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
