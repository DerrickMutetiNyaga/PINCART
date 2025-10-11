"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Heart, Package, Sparkles, Utensils, PartyPopper, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">✨</div>
          <p className="text-muted-foreground">Getting your cart ready...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const categories = [
    {
      title: "For Your Bathroom Glow",
      icon: Sparkles,
      emoji: "✨",
      products: [
        { name: "LED Vanity Mirror", price: "KSh 2,450", image: "/led-mirror-hearts.jpg" },
        { name: "Rose Quartz Face Roller", price: "KSh 890", image: "/pink-desk-organizer.jpg" },
      ],
    },
    {
      title: "For Your Kitchen",
      icon: Utensils,
      emoji: "🍴",
      products: [
        { name: "Digital Kitchen Scale", price: "KSh 1,200", image: "/kitchen-timer-scale.jpg" },
        { name: "Pastel Measuring Cups", price: "KSh 650", image: "/pastel-stationery.jpg" },
      ],
    },
    {
      title: "Birthday Essentials",
      icon: PartyPopper,
      emoji: "🎉",
      products: [
        { name: "LED Number Balloons", price: "KSh 450", image: "/cloud-night-light.jpg" },
        { name: "Party Decoration Set", price: "KSh 1,800", image: "/kawaii-phone-accessories.jpg" },
      ],
    },
  ]

  const activeOrders = [
    {
      id: "ORD-2024-001",
      items: 3,
      total: "KSh 4,560",
      status: "processing",
      statusText: "Processing",
      progress: 25,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      id: "ORD-2024-002",
      items: 2,
      total: "KSh 2,890",
      status: "in-china",
      statusText: "In China",
      progress: 50,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "ORD-2024-003",
      items: 5,
      total: "KSh 6,200",
      status: "shipped",
      statusText: "Shipped",
      progress: 75,
      icon: Truck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/10">
      {/* Decorative elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="sparkle absolute left-[5%] top-[15%] text-4xl opacity-10">⭐</div>
        <div className="sparkle absolute right-[8%] top-[25%] text-3xl opacity-10" style={{ animationDelay: "1s" }}>
          💖
        </div>
        <div className="sparkle absolute left-[15%] bottom-[20%] text-3xl opacity-10" style={{ animationDelay: "2s" }}>
          ✨
        </div>
      </div>

      <div className="container-responsive relative py-8">
        {/* Welcome Section */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-6 text-center sm:rounded-3xl sm:p-8">
          <h1 className="heading-1 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
            Hey {user.name}! <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="body-large text-muted-foreground">Welcome to your PinkCart space</p>
        </div>

        {/* Active Orders */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
              Your Shipments on the Way
            </h2>
            <Button asChild variant="outline" className="rounded-full bg-transparent">
              <Link href="/orders">See All</Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeOrders.map((order) => {
              const StatusIcon = order.icon
              return (
                <Card key={order.id} className="overflow-hidden border-2 transition-all hover:shadow-lg">
                  <CardHeader className={`${order.bgColor} pb-4`}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <Badge variant="secondary" className="rounded-full">
                        <StatusIcon className={`mr-1 h-3 w-3 ${order.color}`} />
                        {order.statusText}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="mb-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{order.items} items</span>
                        <span className="font-semibold">{order.total}</span>
                      </div>
                      <Progress value={order.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">{order.progress}% complete</p>
                    </div>
                    <Button asChild className="btn-gradient w-full rounded-full text-white" size="sm">
                      <Link href={`/orders/${order.id}`}>Track Shipment</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Personalized Categories */}
        <section>
          <h2 className="mb-6 text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
            Curated Just For You
          </h2>

          <div className="space-y-8">
            {categories.map((category, idx) => {
              const CategoryIcon = category.icon
              return (
                <div key={idx} className="rounded-3xl bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                      <CategoryIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                      {category.title} {category.emoji}
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {category.products.map((product, productIdx) => (
                      <Card
                        key={productIdx}
                        className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-md"
                      >
                        <div className="aspect-square overflow-hidden bg-muted">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="mb-2 font-semibold">{product.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">{product.price}</span>
                            <Button size="sm" className="rounded-full">
                              <Heart className="mr-1 h-3 w-3" />
                              Save
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button asChild variant="outline" className="mt-4 w-full rounded-full bg-transparent" size="lg">
                    <Link href={`/shop?category=${category.title.toLowerCase().replace(/\s+/g, "-")}`}>
                      See More {category.emoji}
                    </Link>
                  </Button>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
