"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Upload, Save, LogOut, Package, Users, ShoppingCart, DollarSign, Plus, Tag, Edit, Trash2, RefreshCw } from 'lucide-react'

interface Product {
  _id?: string
  id?: string
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
}

interface Category {
  _id?: string
  id?: string
  name: string
  description?: string
  image?: string
  cloudinaryId?: string
  isActive: boolean
  sortOrder: number
}

interface Order {
  _id?: string
  id?: string
  userId: string
  productId: string
  quantity: number
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  user?: {
    name: string
    email: string
  }
  product?: {
    name: string
    price: number
    image: string
  }
}

interface User {
  id: string
  name: string
  email: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [newProduct, setNewProduct] = useState<Product>({
    name: '',
    price: 0,
    originalPrice: 0,
    category: '',
    description: '',
    features: [],
    inStock: true,
    joinedCount: 0,
    shippingEstimate: ''
  })
  const [productImages, setProductImages] = useState<string[]>([])
  const [productCloudinaryIds, setProductCloudinaryIds] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState<Category>({
    name: '',
    description: '',
    isActive: true,
    sortOrder: 0
  })
  const [newOrder, setNewOrder] = useState<Order>({
    userId: '',
    productId: '',
    quantity: 1,
    status: 'PENDING'
  })
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)

  useEffect(() => {
    checkAuth()
    loadProducts()
    loadCategories()
    loadOrders()
    loadUsers()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/me')
      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
      }
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const loadOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    }
  }

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  const handleImageUpload = async (file: File) => {
    if (productImages.length >= 4) {
      setMessage('Maximum 4 images allowed')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)

      // Use Cloudinary only
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setProductImages(prev => [...prev, data.image.url])
        setProductCloudinaryIds(prev => [...prev, data.image.public_id])
        setMessage('Image uploaded successfully to Cloudinary!')
      } else {
        const errorData = await response.json()
        setMessage(`Upload failed: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setMessage(`Upload error: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index))
    setProductCloudinaryIds(prev => prev.filter((_, i) => i !== index))
  }

  const handleSaveProduct = async () => {
    try {
      const productId = editingProduct?.id
      const url = editingProduct ? `/api/admin/products/${productId}` : '/api/admin/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      const productData = {
        ...newProduct,
        images: productImages,
        cloudinaryIds: productCloudinaryIds
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      if (response.ok) {
        setMessage(editingProduct ? 'Product updated successfully!' : 'Product saved successfully!')
        setNewProduct({
          name: '',
          price: 0,
          originalPrice: 0,
          category: '',
          description: '',
          features: [],
          inStock: true,
          joinedCount: 0,
          shippingEstimate: ''
        })
        setProductImages([])
        setProductCloudinaryIds([])
        setEditingProduct(null)
        setProductModalOpen(false)
        loadProducts()
      } else {
        setMessage('Failed to save product')
      }
    } catch (error) {
      setMessage('Error saving product')
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setNewProduct({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      category: product.category,
      description: product.description || '',
      features: product.features || [],
      inStock: product.inStock,
      joinedCount: product.joinedCount,
      shippingEstimate: product.shippingEstimate || '',
      image: product.image,
      cloudinaryId: product.cloudinaryId
    })
    // Load existing images if any
    setProductImages(product.images || [])
    setProductCloudinaryIds(product.cloudinaryIds || [])
    setProductModalOpen(true)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessage('Product deleted successfully!')
        loadProducts()
      } else {
        setMessage('Failed to delete product')
      }
    } catch (error) {
      setMessage('Error deleting product')
    }
  }

  const handleSaveCategory = async () => {
    try {
      const categoryId = editingCategory?.id
      const url = editingCategory ? `/api/admin/categories/${categoryId}` : '/api/admin/categories'
      const method = editingCategory ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategory)
      })

      if (response.ok) {
        setMessage(editingCategory ? 'Category updated successfully!' : 'Category saved successfully!')
        setNewCategory({
          name: '',
          description: '',
          isActive: true,
          sortOrder: 0
        })
        setEditingCategory(null)
        setCategoryModalOpen(false)
        loadCategories()
      } else {
        setMessage('Failed to save category')
      }
    } catch (error) {
      setMessage('Error saving category')
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description || '',
      isActive: category.isActive,
      sortOrder: category.sortOrder,
      image: category.image,
      cloudinaryId: category.cloudinaryId
    })
    setCategoryModalOpen(true)
  }

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessage('Category deleted successfully!')
        loadCategories()
      } else {
        setMessage('Failed to delete category')
      }
    } catch (error) {
      setMessage('Error deleting category')
    }
  }

  const handleSaveOrder = async () => {
    try {
      const orderId = editingOrder?.id
      const url = editingOrder ? `/api/admin/orders/${orderId}` : '/api/admin/orders'
      const method = editingOrder ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
      })

      if (response.ok) {
        setMessage(editingOrder ? 'Order updated successfully!' : 'Order created successfully!')
        setNewOrder({
          userId: '',
          productId: '',
          quantity: 1,
          status: 'PENDING'
        })
        setEditingOrder(null)
        setOrderModalOpen(false)
        loadOrders()
      } else {
        setMessage('Failed to save order')
      }
    } catch (error) {
      setMessage('Error saving order')
    }
  }

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order)
    setNewOrder({
      userId: order.userId,
      productId: order.productId,
      quantity: order.quantity,
      status: order.status
    })
    setOrderModalOpen(true)
  }

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return
    
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessage('Order deleted successfully!')
        loadOrders()
      } else {
        setMessage('Failed to delete order')
      }
    } catch (error) {
      setMessage('Error deleting order')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const resetEditingStates = () => {
    setEditingProduct(null)
    setEditingCategory(null)
    setEditingOrder(null)
  }

  const handleRefresh = async () => {
    setMessage('Refreshing data...')
    await Promise.all([
      loadProducts(),
      loadCategories(),
      loadOrders(),
      loadUsers()
    ])
    setMessage('Data refreshed successfully!')
    setTimeout(() => setMessage(''), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Pinkcart Admin
                </h1>
                <p className="text-gray-600">Manage your cute finds & community</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={handleRefresh} variant="outline" className="bg-white/50 hover:bg-white border-pink-200">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button onClick={handleLogout} variant="outline" className="bg-white/50 hover:bg-white border-pink-200">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <Alert className="mb-6 border-l-4 border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50">
            <AlertDescription className="text-pink-700 font-medium">
              {message}
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-pink-700">Total Products</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100">
                <Package className="h-4 w-4 text-pink-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-pink-600" style={{ fontFamily: "var(--font-fredoka)" }}>
                {products.length}
              </div>
              <p className="text-xs text-pink-500 mt-1">Cute finds available</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Categories</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                <Tag className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600" style={{ fontFamily: "var(--font-fredoka)" }}>
                {categories.length}
              </div>
              <p className="text-xs text-purple-500 mt-1">Product categories</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Orders</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <ShoppingCart className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: "var(--font-fredoka)" }}>
                {orders.length}
              </div>
              <p className="text-xs text-blue-500 mt-1">Community orders</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Users</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Users className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600" style={{ fontFamily: "var(--font-fredoka)" }}>
                {users.length}
              </div>
              <p className="text-xs text-green-500 mt-1">Community members</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different management sections */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm border border-pink-200">
            <TabsTrigger value="products" className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700">
              <Package className="mr-2 h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              <Tag className="mr-2 h-4 w-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Products ({products.length})</CardTitle>
                <Dialog open={productModalOpen} onOpenChange={(open) => {
                  setProductModalOpen(open)
                  if (!open) resetEditingStates()
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                      <DialogDescription>
                        {editingProduct ? 'Update the product information below.' : 'Fill in the details to create a new product.'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter product name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.name}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="price">Price (KSh)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                            placeholder="Enter price"
                          />
                        </div>
                        <div>
                          <Label htmlFor="originalPrice">Original Price (KSh)</Label>
                          <Input
                            id="originalPrice"
                            type="number"
                            value={newProduct.originalPrice}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                            placeholder="Enter original price"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Enter product description"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="features">Features (one per line)</Label>
                        <Textarea
                          id="features"
                          value={newProduct.features.join('\n')}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, features: e.target.value.split('\n').filter(f => f.trim()) }))}
                          placeholder="Enter features, one per line"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="images" className="text-base font-semibold text-gray-700 mb-4 block">
                          Product Images (Max 4)
                        </Label>
                        
                        {/* Image Upload Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {/* Upload Slots */}
                          {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="relative">
                              {productImages[index] ? (
                                // Image Preview
                                <div className="group relative aspect-square rounded-xl overflow-hidden border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300">
                                  <img 
                                    src={productImages[index]} 
                                    alt={`Product ${index + 1}`} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg z-10"
                                  >
                                    ×
                                  </button>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
                                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    Image {index + 1}
                                  </div>
                                </div>
                              ) : (
                                // Upload Slot
                                <div className="aspect-square border-2 border-dashed border-pink-300 rounded-xl hover:border-pink-400 hover:bg-pink-50/50 transition-all duration-300 bg-gradient-to-br from-pink-50/30 to-purple-50/30 flex items-center justify-center">
                                  <input
                                    id={`image-${index}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) handleImageUpload(file)
                                    }}
                                    disabled={uploading}
                                    className="hidden"
                                  />
                                  <label htmlFor={`image-${index}`} className="cursor-pointer flex flex-col items-center justify-center h-full w-full p-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 mb-3">
                                      <Upload className="h-6 w-6 text-pink-600" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 mb-1">
                                      {uploading ? 'Uploading...' : 'Click to upload'}
                                    </p>
                                    <p className="text-xs text-gray-500 text-center">
                                      PNG, JPG, GIF<br />up to 5MB
                                    </p>
                                    {uploading && (
                                      <div className="mt-2 flex items-center text-pink-600">
                                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-pink-600 mr-1"></div>
                                        <span className="text-xs">Uploading...</span>
                                      </div>
                                    )}
                                  </label>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Upload Progress & Status */}
                        {productImages.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">
                                Uploaded Images
                              </span>
                              <span className="text-sm text-pink-600 font-medium">
                                {productImages.length}/4
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(productImages.length / 4) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Upload Status Messages */}
                        {productImages.length >= 4 && (
                          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                            <div className="flex items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 mr-3">
                                <Package className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-green-800">
                                  All 4 image slots filled
                                </p>
                                <p className="text-xs text-green-600">
                                  Remove an image to upload a new one
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {productImages.length === 0 && (
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
                            <div className="flex items-center">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 mr-3">
                                <Upload className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-blue-800">
                                  No images uploaded yet
                                </p>
                                <p className="text-xs text-blue-600">
                                  Click on any slot above to upload your first image
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <Button 
                        onClick={handleSaveProduct} 
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={uploading}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {uploading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Save Product')}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="group bg-white rounded-xl border border-pink-200 hover:border-pink-300 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {product.image && (
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                            {product.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {product.joinedCount} joined
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-bold text-pink-600" style={{ fontFamily: "var(--font-fredoka)" }}>
                              KSh {product.price.toLocaleString()}
                            </p>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <p className="text-sm text-gray-500 line-through">
                                KSh {product.originalPrice.toLocaleString()}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditProduct(product)}
                              className="bg-pink-50 hover:bg-pink-100 border-pink-200 text-pink-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProduct(product.id!)}
                              className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Categories ({categories.length})</CardTitle>
                <Dialog open={categoryModalOpen} onOpenChange={(open) => {
                  setCategoryModalOpen(open)
                  if (!open) resetEditingStates()
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                      <DialogDescription>
                        {editingCategory ? 'Update the category information below.' : 'Create a new product category.'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="categoryName">Category Name</Label>
                          <Input
                            id="categoryName"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter category name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sortOrder">Sort Order</Label>
                          <Input
                            id="sortOrder"
                            type="number"
                            value={newCategory.sortOrder}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, sortOrder: Number(e.target.value) }))}
                            placeholder="Enter sort order"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="categoryDescription">Description</Label>
                        <Textarea
                          id="categoryDescription"
                          value={newCategory.description}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Enter category description"
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={newCategory.isActive}
                          onChange={(e) => setNewCategory(prev => ({ ...prev, isActive: e.target.checked }))}
                          className="rounded"
                        />
                        <Label htmlFor="isActive">Active Category</Label>
                      </div>

                      <Button onClick={handleSaveCategory} className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        {editingCategory ? 'Update Category' : 'Save Category'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                        <p className="text-sm text-gray-500">Sort Order: {category.sortOrder}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteCategory(category.id!)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Orders ({orders.length})</CardTitle>
                <Dialog open={orderModalOpen} onOpenChange={(open) => {
                  setOrderModalOpen(open)
                  if (!open) resetEditingStates()
                }}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Order
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{editingOrder ? 'Edit Order' : 'Create New Order'}</DialogTitle>
                      <DialogDescription>
                        {editingOrder ? 'Update the order information below.' : 'Create a new order for a customer.'}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="orderUser">User</Label>
                          <Select value={newOrder.userId} onValueChange={(value) => setNewOrder(prev => ({ ...prev, userId: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select user" />
                            </SelectTrigger>
                            <SelectContent>
                              {users.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.name} ({user.email})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="orderProduct">Product</Label>
                          <Select value={newOrder.productId} onValueChange={(value) => setNewOrder(prev => ({ ...prev, productId: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              {products.map((product) => (
                                <SelectItem key={product.id} value={product.id!}>
                                  {product.name} (KSh {product.price})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input
                            id="quantity"
                            type="number"
                            value={newOrder.quantity}
                            onChange={(e) => setNewOrder(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                            placeholder="Enter quantity"
                            min="1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="orderStatus">Status</Label>
                          <Select value={newOrder.status} onValueChange={(value: any) => setNewOrder(prev => ({ ...prev, status: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PENDING">Pending</SelectItem>
                              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                              <SelectItem value="SHIPPED">Shipped</SelectItem>
                              <SelectItem value="DELIVERED">Delivered</SelectItem>
                              <SelectItem value="CANCELLED">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button onClick={handleSaveOrder} className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        {editingOrder ? 'Update Order' : 'Create Order'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        {order.product?.image && (
                          <img src={order.product.image} alt={order.product.name} className="w-12 h-12 object-cover rounded" />
                        )}
                        <div>
                          <h3 className="font-medium">{order.product?.name}</h3>
                          <p className="text-sm text-gray-600">Customer: {order.user?.name}</p>
                          <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'CONFIRMED' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditOrder(order)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteOrder(order.id!)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Users ({users.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        User
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
