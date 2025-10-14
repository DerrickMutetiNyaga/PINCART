import mongoose, { Document, Schema } from 'mongoose'

export interface ICategory extends Document {
  name: string
  description?: string
  image?: string
  cloudinaryId?: string
  isActive: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  cloudinaryId: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)
