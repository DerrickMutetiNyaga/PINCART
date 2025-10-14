import mongoose, { Document, Schema } from 'mongoose'

export interface ICustomer extends Document {
  name: string
  productId: string
  productName: string
  joinedAt: Date
}

const CustomerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Index for efficient queries
CustomerSchema.index({ productId: 1, joinedAt: -1 })

export default mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema)
