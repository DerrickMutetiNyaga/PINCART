"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Heart, Minus, Package, Plus, Share2, Sparkles, TrendingUp, Truck, Users, ZoomIn, Play, X } from "lucide-react"

const productData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Cute Pink Desk Organizer Set",
    price: 1200,
    originalPrice: 2500,
    images: [
      "/pink-desk-organizer.jpg",
      "/pink-desk-organizer-front-view.jpg",
      "/pink-desk-organizer-side-view.jpg",
      "/pink-desk-organizer-compartments-detail.jpg",
      "/pink-desk-organizer-in-use-on-desk.jpg",
    ],
    video: "/desk-organizer-product-video-thumbnail.jpg",
    hasVideo: true,
    joinedCount: 34,
    category: "Dorm Essentials",
    description:
      "Transform your workspace into a cute and organized haven with this adorable pink desk organizer set. Includes multiple compartments for pens, sticky notes, and small accessories. Made from durable plastic with a matte finish.",
    features: [
      "5-piece organizer set",
      "Durable plastic construction",
      "Matte pink finish",
      "Multiple compartments",
      "Easy to clean",
      "Stackable design",
    ],
    shippingTime: "3-4 weeks after order closes",
    dimensions: "25cm x 15cm x 10cm",
    weight: "450g",
    material: "High-quality ABS plastic",
    quality: "Premium grade with smooth finish and sturdy construction",
  },
  "2": {
    id: "2",
    name: "Aesthetic LED Mirror with Hearts",
    price: 2800,
    originalPrice: 4500,
    images: [
      "/led-mirror-hearts.jpg",
      "/led-mirror-with-hearts-lit-up.jpg",
      "/led-mirror-brightness-settings.jpg",
      "/led-mirror-back-view-with-usb-port.jpg",
      "/led-mirror-on-vanity-table.jpg",
    ],
    video: "/led-mirror-demo-video-thumbnail.jpg",
    hasVideo: true,
    joinedCount: 28,
    category: "Girly Finds",
    description:
      "Light up your beauty routine with this stunning LED mirror featuring adorable heart-shaped lights. Perfect for makeup application, skincare routines, or just adding a dreamy glow to your room. USB-powered with adjustable brightness.",
    features: [
      "Adjustable LED brightness",
      "Heart-shaped light design",
      "USB-powered",
      "360° rotation",
      "Touch sensor controls",
      "High-definition reflection",
    ],
    shippingTime: "3-4 weeks after order closes",
    dimensions: "30cm x 25cm x 5cm",
    weight: "800g",
    material: "Glass mirror with ABS plastic frame",
    quality: "HD reflection with energy-efficient LED lights",
  },
  "3": {
    id: "3",
    name: "Kawaii Phone Accessories Bundle",
    price: 800,
    originalPrice: 1500,
    images: [
      "/kawaii-phone-accessories.jpg",
      "/kawaii-phone-case-pink.jpg",
      "/kawaii-pop-socket-designs.jpg",
      "/phone-accessories-bundle-contents.jpg",
      "/phone-with-kawaii-accessories.jpg",
    ],
    hasVideo: false,
    joinedCount: 45,
    category: "Tech & Accessories",
    description:
      "Complete kawaii phone accessory bundle including a cute phone case, pop socket, screen protector, and charging cable organizer. Mix and match to create your perfect aesthetic setup.",
    features: [
      "Silicone phone case",
      "Collapsible pop socket",
      "Tempered glass screen protector",
      "Cable organizer clips",
      "Compatible with most phones",
      "Scratch-resistant materials",
    ],
    shippingTime: "3-4 weeks after order closes",
    dimensions: "Varies by item",
    weight: "150g",
    material: "Silicone, tempered glass, plastic",
    quality: "Durable materials with cute designs that last",
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const product = productData[id] || productData["1"]
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  const handleImageClick = () => {
    setIsZoomOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container-responsive py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 body-small text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary">
            Browse
          </Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            {/* Main Image Viewer */}
            <div className="image-container border-2 bg-muted">
              {isVideoPlaying && product.hasVideo ? (
                <div className="relative h-full w-full bg-black">
                  <video
                    className="h-full w-full object-contain"
                    controls
                    autoPlay
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src={product.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 touch-target rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => setIsVideoPlaying(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <>
                  <Image
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="image-responsive cursor-zoom-in"
                    onClick={handleImageClick}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4 touch-target rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-16 top-4 touch-target rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={handleImageClick}
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                  <Badge className="absolute left-4 top-4 rounded-full bg-secondary text-secondary-foreground text-xs sm:text-sm">
                    {product.category}
                  </Badge>
                </>
              )}
            </div>

            {/* Thumbnails with Video Option */}
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index)
                    setIsVideoPlaying(false)
                  }}
                  className={`image-container border-2 transition-all hover:border-primary ${
                    selectedImage === index && !isVideoPlaying
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="image-responsive"
                  />
                </button>
              ))}
              {product.hasVideo && (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className={`image-container border-2 transition-all hover:border-primary ${
                    isVideoPlaying ? "border-primary ring-2 ring-primary/20" : "border-border"
                  }`}
                >
                  <Image src={product.video || "/placeholder.svg"} alt="Product video" fill className="image-responsive" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary sm:h-10 sm:w-10">
                      <Play className="h-4 w-4 fill-primary-foreground text-primary-foreground sm:h-5 sm:w-5" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1
                className="heading-2 mb-3 text-balance"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {product.name}
              </h1>

              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-3">
                <span className="text-3xl font-bold text-primary sm:text-4xl" style={{ fontFamily: "var(--font-fredoka)" }}>
                  KSh {(product.price * quantity).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through sm:text-xl">
                    KSh {(product.originalPrice * quantity).toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-full text-xs sm:text-sm">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
                <Badge variant="outline" className="rounded-full text-xs sm:text-sm">
                  <Users className="mr-1 h-3 w-3" />
                  {product.joinedCount} joined
                </Badge>
              </div>
            </div>

            <Separator />

            <Card className="card-responsive bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
              <CardContent className="padding-responsive">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h4 className="heading-4 mb-2 text-primary">Buyer Tips</h4>
                    <p className="body-small leading-relaxed text-muted-foreground">
                      Delivery takes 3-4 weeks. Join this week's batch now and split shipping costs with the community -
                      the more friends who join, the less we all pay!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity Selector */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span className="heading-4">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="touch-target rounded-full bg-transparent"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="touch-target rounded-full bg-transparent"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="button-responsive-lg flex-1 rounded-full" style={{ fontFamily: "var(--font-fredoka)" }}>
                <Truck className="mr-2 h-5 w-5" />
                Join This Shipment
              </Button>
              <Button size="lg" variant="outline" className="button-responsive-lg rounded-full bg-transparent">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="rounded-2xl bg-muted/50 p-4">
              <div className="flex items-center gap-2 body-small text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>
                  <strong className="text-foreground">{product.joinedCount} friends</strong> have joined this shipment
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-8">
          {/* Description */}
          <Card className="rounded-3xl border-2">
            <CardContent className="p-8">
              <h2 className="mb-4 text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                Product Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="rounded-3xl border-2">
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                Key Features
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Dimensions & Quality Details */}
          <Card className="rounded-3xl border-2">
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                Specifications & Quality
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-primary">Dimensions</h4>
                  <p className="text-muted-foreground">{product.dimensions}</p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-primary">Weight</h4>
                  <p className="text-muted-foreground">{product.weight}</p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-primary">Material</h4>
                  <p className="text-muted-foreground">{product.material}</p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-primary">Quality</h4>
                  <p className="text-muted-foreground">{product.quality}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <Card className="rounded-3xl border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8">
              <h2 className="mb-6 text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                Shipping Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">Estimated Delivery</h4>
                    <p className="text-sm text-muted-foreground">{product.shippingTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10">
                    <Package className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold">Group Shipping</h4>
                    <p className="text-sm text-muted-foreground">
                      We split shipping costs among everyone in the shipment. More friends = lower costs for all of us!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="grid grid-cols-5 gap-2 p-4">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === index ? "border-primary ring-2 ring-primary/20" : "border-border"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="mt-16 border-t py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Heart className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Pinkcart
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making cute finds from China affordable through community group shipping.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Browse</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/shop?category=girly" className="hover:text-primary">
                    Girly Finds
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=dorm" className="hover:text-primary">
                    Dorm Essentials
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=tech" className="hover:text-primary">
                    Tech & Accessories
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-primary">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/faq" className="hover:text-primary">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-primary">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-primary">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Pinkcart. Made with love in Nairobi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
