"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, Package, Sparkles, Users, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const categories = [
  { id: "all", name: "All Finds", icon: Sparkles },
  { id: "girly", name: "Girly Finds", icon: Heart },
  { id: "dorm", name: "Dorm/Kitchen Essentials", icon: Package },
  { id: "tech", name: "Tech & Accessories", icon: Sparkles },
]

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image?: string
  images?: string[]
  joinedCount: number
  category: string
  description?: string
  features?: string[]
  inStock: boolean
  shippingEstimate?: string
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [notifications, setNotifications] = useState<Array<{id: string, name: string, message: string}>>([])
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [recentNotifications, setRecentNotifications] = useState<Array<{id: string, name: string, productName: string, joinedAt: string}>>([])
  const [lastChecked, setLastChecked] = useState<Date>(new Date())

  // Famous Kenyan names
  const kenyanNames = [
    "Wanjiku", "Kamau", "Akinyi", "Mwangi", "Adhiambo", "Kipchoge", "Wanjala", "Akoth",
    "Ochieng", "Nyawira", "Kiprotich", "Wambui", "Omondi", "Akinyi", "Kipngetich", "Wanjiku",
    "Muthoni", "Kiprono", "Adhiambo", "Wanjala", "Akoth", "Ochieng", "Nyawira", "Kiprotich",
    "Wambui", "Omondi", "Akinyi", "Kipngetich", "Wanjiku", "Muthoni", "Kiprono", "Adhiambo"
  ]


  useEffect(() => {
    fetchProducts()
    fetchRecentNotifications()
  }, [])

  const fetchRecentNotifications = async () => {
    try {
      const response = await fetch('/api/notifications')
      if (response.ok) {
        const data = await response.json()
        const newNotifications = data.notifications || []
        
        // Check for new notifications since last check
        const newNotificationsSinceLastCheck = newNotifications.filter((notification: any) => {
          const notificationTime = new Date(notification.joinedAt)
          return notificationTime > lastChecked
        })
        
        // Show new notifications
        newNotificationsSinceLastCheck.forEach((notification: any) => {
          showRealTimeNotification(notification.name, notification.productName)
        })
        
        setRecentNotifications(newNotifications)
        setLastChecked(new Date())
      }
    } catch (error) {
      console.error('Error fetching recent notifications:', error)
    }
  }

  // Check for new notifications every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRecentNotifications()
    }, 3000) // Check every 3 seconds for real-time updates

    return () => clearInterval(interval)
  }, [lastChecked])

  const showRealTimeNotification = (name: string, productName: string) => {
    const id = Date.now().toString()
    
    const notification = {
      id,
      name: name,
      message: `just joined the shipment for ${productName}!`
    }

    setNotifications(prev => [...prev, notification])

    // Remove notification after 4 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 4000)
  }

  const handleJoinShipment = () => {
    setShowJoinForm(true)
  }

  const handleWhatsAppRedirect = async () => {
    if (!customerName.trim() || !selectedProduct) return

    try {
      // Save customer data to database
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: customerName.trim(),
          productId: selectedProduct.id,
          productName: selectedProduct.name
        })
      })

      if (response.ok) {
        // The real-time notification system will automatically show this to all users
        console.log('Customer saved successfully')
      }
    } catch (error) {
      console.error('Error saving customer:', error)
    }

    const phoneNumber = "254794269051" // WhatsApp number with country code
    const productName = selectedProduct.name
    const price = selectedProduct.price.toLocaleString()
    const originalPrice = selectedProduct.originalPrice ? selectedProduct.originalPrice.toLocaleString() : null
    
    let message = `Hi! I'm interested in joining the shipment for *${productName}*.\n\n`
    message += `💰 *Price:* KSh ${price}`
    if (originalPrice) {
      message += ` (was KSh ${originalPrice})`
    }
    message += `\n\n📦 *Product:* ${productName}\n`
    message += `👤 *My name:* ${customerName}\n\n`
    message += `Please let me know how to proceed with joining this shipment. Thank you! 🙏`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
    setShowJoinForm(false)
    setCustomerName("")
    setModalOpen(false)
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
    setModalOpen(true)
  }

  const nextImage = () => {
    if (selectedProduct?.images && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images!.length - 1 ? 0 : prev + 1
      )
    }
  }

  // Auto-scroll thumbnail into view
  useEffect(() => {
    if (selectedProduct?.images && selectedProduct.images.length > 1) {
      const thumbnailElement = document.querySelector(`[data-thumbnail-index="${currentImageIndex}"]`)
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        })
      }
    }
  }, [currentImageIndex, selectedProduct])

  const prevImage = () => {
    if (selectedProduct?.images && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images!.length - 1 : prev - 1
      )
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalOpen && selectedProduct?.images && selectedProduct.images.length > 1) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          prevImage()
        } else if (e.key === 'ArrowRight') {
          e.preventDefault()
          nextImage()
        } else if (e.key === 'Escape') {
          setModalOpen(false)
        }
      }
    }

    if (modalOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalOpen, selectedProduct, currentImageIndex])

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY
    
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      const deltaX = touch.clientX - startX
      const deltaY = touch.clientY - startY
      
      // Only handle horizontal swipes
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          prevImage()
        } else {
          nextImage()
        }
        document.removeEventListener('touchmove', handleTouchMove)
      }
    }
    
    document.addEventListener('touchmove', handleTouchMove)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Notification System */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-white/95 backdrop-blur-sm border border-pink-200 rounded-xl shadow-lg p-4 max-w-sm animate-in slide-in-from-right-5 duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {notification.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  <span className="text-pink-600 font-semibold">{notification.name}</span> {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">Just now</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent section-spacing">
        <div className="container-responsive">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="heading-1 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
              This Week's Finds
            </h1>
            <p className="body-large text-muted-foreground text-balance">
              Check out what we're shipping this week and join the group to save
            </p>
          </div>
        </div>
      </section>

      {/* Join Now Section */}
      <section className="border-b bg-gradient-to-r from-pink-50 to-purple-50 py-6 sm:py-8">
        <div className="container-responsive">
          <Card className="card-responsive bg-white/80 backdrop-blur-sm border-pink-200 shadow-lg">
            <CardContent className="padding-responsive">
              <div className="flex-responsive-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="heading-4 text-gray-900" style={{ fontFamily: "var(--font-fredoka)" }}>
                      Join Our Community!
                    </h3>
                    <p className="body-small text-gray-600">Save money through group shipping</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600" style={{ fontFamily: "var(--font-fredoka)" }}>
                      💰
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Lower Costs</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600" style={{ fontFamily: "var(--font-fredoka)" }}>
                      🚚
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Fast Shipping</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600" style={{ fontFamily: "var(--font-fredoka)" }}>
                      👥
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Community</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b py-6 sm:py-8">
        <div className="container-responsive">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="button-responsive rounded-full"
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container-responsive section-spacing">
        <div className="mb-6 flex-responsive-between">
          <div>
            <h2 className="heading-3" style={{ fontFamily: "var(--font-fredoka)" }}>
              {categories.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="body-small text-muted-foreground">{filteredProducts.length} finds available</p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted sm:h-20 sm:w-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
            <h3 className="heading-4 mb-2">Loading products...</h3>
            <p className="body-medium text-muted-foreground">Fetching the latest finds from our database</p>
          </div>
        ) : (
          <>
            <div className="grid-responsive-1 grid-gap-responsive">
              {filteredProducts.map((product) => (
                <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
                  <ProductCard {...product} disableNavigation={true} />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted sm:h-20 sm:w-20">
                  <Package className="h-8 w-8 text-muted-foreground sm:h-10 sm:w-10" />
                </div>
                <h3 className="heading-4 mb-2">Nothing here yet</h3>
                <p className="body-medium text-muted-foreground">Try selecting a different category</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* Community CTA */}
      <section className="border-t bg-gradient-to-b from-secondary/5 to-accent/5 section-spacing">
        <div className="container-responsive">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="body-small font-medium text-primary">Join Our Community</span>
            </div>
            <h2 className="heading-2 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
              More People, More Savings
            </h2>
            <p className="body-large mb-8 text-muted-foreground text-balance">
              The more people who join a shipment, the lower the shipping cost for everyone. Share with your friends!
            </p>
            <Button size="lg" className="button-responsive-lg rounded-full" asChild>
              <a href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" target="_blank" rel="noopener noreferrer">
                Share on WhatsApp
                <Sparkles className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container-responsive">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Heart className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
                </div>
                <span className="heading-4" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Pinkcart
                </span>
              </div>
              <p className="body-small text-muted-foreground">
                Making cute finds from China affordable through community group shipping.
              </p>
            </div>

            <div>
              <h4 className="heading-4 mb-4">Browse</h4>
              <ul className="spacing-responsive body-small text-muted-foreground">
                <li>
                  <button onClick={() => setSelectedCategory("girly")} className="hover:text-primary">
                    Girly Finds
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedCategory("dorm")} className="hover:text-primary">
                    Dorm Essentials
                  </button>
                </li>
                <li>
                  <button onClick={() => setSelectedCategory("tech")} className="hover:text-primary">
                    Tech & Accessories
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="heading-4 mb-4">Company</h4>
              <ul className="spacing-responsive body-small text-muted-foreground">
                <li>
                  <a href="/about" className="hover:text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/how-it-works" className="hover:text-primary">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-primary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="heading-4 mb-4">Support</h4>
              <ul className="spacing-responsive body-small text-muted-foreground">
                <li>
                  <a href="/faq" className="hover:text-primary">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="hover:text-primary">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="/returns" className="hover:text-primary">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center body-small text-muted-foreground">
            <p>&copy; 2025 Pinkcart. Made with love in Nairobi.</p>
          </div>
        </div>
      </footer>

      {/* Product Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
            <DialogTitle className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-6 pb-6">
              {/* Main Image Display */}
              <div 
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
                onTouchStart={handleTouchStart}
              >
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <Image
                    src={selectedProduct.images[currentImageIndex]}
                    alt={`${selectedProduct.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : selectedProduct.image ? (
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <Package className="h-16 w-16" />
                  </div>
                )}
                
                {/* Navigation Arrows - Always visible when multiple images */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {selectedProduct.images.length}
                  </div>
                )}

                {/* Touch/Swipe Indicators */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                    {selectedProduct.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700">All Images ({selectedProduct.images.length})</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Click to view</span>
                      <div className="flex gap-1">
                        <ChevronLeft className="h-3 w-3" />
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
                    {selectedProduct.images.map((image, index) => (
                      <button
                        key={index}
                        data-thumbnail-index={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                          index === currentImageIndex 
                            ? 'border-pink-500 ring-2 ring-pink-200 scale-105' 
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {index === currentImageIndex && (
                          <div className="absolute inset-0 bg-pink-500/20 flex items-center justify-center">
                            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {selectedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
                      {selectedProduct.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <span className="text-2xl font-bold text-pink-600" style={{ fontFamily: "var(--font-fredoka)" }}>
                    KSh {selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      KSh {selectedProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Description Section */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  {selectedProduct.description && selectedProduct.description.length > 3 ? (
                    <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                  ) : (
                    <div className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span>Product description will be added soon</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Features Section */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                  {selectedProduct.features && selectedProduct.features.length > 0 && selectedProduct.features.some(f => f.length > 3) ? (
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedProduct.features.filter(f => f.length > 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-pink-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span>Product features will be added soon</span>
                      </div>
                    </div>
                  )}
                </div>

                 <div className="flex gap-3">
                   <Button 
                     onClick={handleJoinShipment}
                     className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl"
                   >
                     Join Shipment
                   </Button>
                   <Button variant="outline" className="px-6">
                     <Heart className="h-4 w-4 mr-2" />
                     Save
                   </Button>
                 </div>

                {/* Scroll Indicator */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="ml-2">Scroll to see more</span>
                  </div>
                </div>
              </div>
            </div>
          )}
         </DialogContent>
       </Dialog>

       {/* Join Shipment Form Modal */}
       <Dialog open={showJoinForm} onOpenChange={setShowJoinForm}>
         <DialogContent className="max-w-md">
           <DialogHeader>
             <DialogTitle className="text-xl font-bold text-center" style={{ fontFamily: "var(--font-fredoka)" }}>
               Join Shipment
             </DialogTitle>
           </DialogHeader>
           
           <div className="space-y-6 py-4">
             {/* Product Info */}
             {selectedProduct && (
               <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200">
                 <div className="flex items-center gap-3">
                   {selectedProduct.images && selectedProduct.images.length > 0 ? (
                     <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                       <Image
                         src={selectedProduct.images[0]}
                         alt={selectedProduct.name}
                         width={64}
                         height={64}
                         className="w-full h-full object-cover"
                       />
                     </div>
                   ) : selectedProduct.image ? (
                     <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                       <Image
                         src={selectedProduct.image}
                         alt={selectedProduct.name}
                         width={64}
                         height={64}
                         className="w-full h-full object-cover"
                       />
                     </div>
                   ) : (
                     <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                       <Package className="h-8 w-8 text-gray-400" />
                     </div>
                   )}
                   
                   <div className="flex-1 min-w-0">
                     <h3 className="font-semibold text-gray-900 truncate" style={{ fontFamily: "var(--font-fredoka)" }}>
                       {selectedProduct.name}
                     </h3>
                     <div className="flex items-center gap-2 mt-1">
                       <span className="text-lg font-bold text-pink-600" style={{ fontFamily: "var(--font-fredoka)" }}>
                         KSh {selectedProduct.price.toLocaleString()}
                       </span>
                       {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                         <span className="text-sm text-gray-500 line-through">
                           KSh {selectedProduct.originalPrice.toLocaleString()}
                         </span>
                       )}
                     </div>
                   </div>
                 </div>
               </div>
             )}

             {/* Name Input */}
             <div className="space-y-2">
               <label htmlFor="customerName" className="text-sm font-medium text-gray-700">
                 Your Name *
               </label>
               <input
                 id="customerName"
                 type="text"
                 value={customerName}
                 onChange={(e) => setCustomerName(e.target.value)}
                 placeholder="Enter your full name"
                 className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-base"
                 style={{ fontFamily: "var(--font-fredoka)" }}
               />
             </div>

             {/* Info Text */}
             <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
               <div className="flex items-start gap-3">
                 <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                   <span className="text-blue-600 text-sm">💬</span>
                 </div>
                 <div>
                   <p className="text-sm text-blue-800 font-medium">What happens next?</p>
                   <p className="text-xs text-blue-600 mt-1">
                     We'll redirect you to WhatsApp where you can complete your order. 
                     Our team will guide you through the shipment process.
                   </p>
                 </div>
               </div>
             </div>

             {/* Action Buttons */}
             <div className="flex gap-3">
               <Button
                 variant="outline"
                 onClick={() => setShowJoinForm(false)}
                 className="flex-1 py-3 rounded-xl"
               >
                 Cancel
               </Button>
               <Button
                 onClick={handleWhatsAppRedirect}
                 disabled={!customerName.trim()}
                 className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Continue to WhatsApp
               </Button>
             </div>
           </div>
         </DialogContent>
       </Dialog>
     </div>
   )
 }
