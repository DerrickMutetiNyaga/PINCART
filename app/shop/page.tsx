"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Package, Sparkles, Users } from "lucide-react"

const categories = [
  { id: "all", name: "All Finds", icon: Sparkles },
  { id: "girly", name: "Girly Finds", icon: Heart },
  { id: "dorm", name: "Dorm/Kitchen Essentials", icon: Package },
  { id: "tech", name: "Tech & Accessories", icon: Sparkles },
]

const products = [
  {
    id: "1",
    name: "Cute Pink Desk Organizer Set",
    price: 1200,
    originalPrice: 2500,
    image: "/pink-desk-organizer.jpg",
    joinedCount: 34,
    category: "dorm",
  },
  {
    id: "2",
    name: "Aesthetic LED Mirror with Hearts",
    price: 2800,
    originalPrice: 4500,
    image: "/led-mirror-hearts.jpg",
    joinedCount: 28,
    category: "girly",
  },
  {
    id: "3",
    name: "Kawaii Phone Accessories Bundle",
    price: 800,
    originalPrice: 1500,
    image: "/kawaii-phone-accessories.jpg",
    joinedCount: 45,
    category: "tech",
  },
  {
    id: "4",
    name: "Pastel Rainbow Stationery Set",
    price: 950,
    originalPrice: 1800,
    image: "/pastel-stationery.jpg",
    joinedCount: 22,
    category: "dorm",
  },
  {
    id: "5",
    name: "Fluffy Cloud Night Light",
    price: 1500,
    originalPrice: 2800,
    image: "/cloud-night-light.jpg",
    joinedCount: 31,
    category: "girly",
  },
  {
    id: "6",
    name: "Wireless Earbuds - Pink Edition",
    price: 2200,
    originalPrice: 3500,
    image: "/pink-earbuds.jpg",
    joinedCount: 38,
    category: "tech",
  },
  {
    id: "7",
    name: "Cute Kitchen Timer & Scale Set",
    price: 1800,
    originalPrice: 3200,
    image: "/kitchen-timer-scale.jpg",
    joinedCount: 19,
    category: "dorm",
  },
  {
    id: "8",
    name: "Aesthetic Jewelry Organizer Box",
    price: 1400,
    originalPrice: 2600,
    image: "/jewelry-organizer.jpg",
    joinedCount: 27,
    category: "girly",
  },
  {
    id: "9",
    name: "Portable Mini Projector - Pink",
    price: 3500,
    originalPrice: 5500,
    image: "/mini-projector.jpg",
    joinedCount: 15,
    category: "tech",
  },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen">
      <Header />

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

      {/* Active Shipment Info */}
      <section className="border-b bg-muted/30 py-6 sm:py-8">
        <div className="container-responsive">
          <Card className="card-responsive">
            <CardContent className="padding-responsive">
              <div className="flex-responsive-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="heading-4" style={{ fontFamily: "var(--font-fredoka)" }}>
                      Current Shipment Progress
                    </h3>
                    <p className="body-small text-muted-foreground">34 out of 50 slots filled</p>
                  </div>
                </div>
                <div className="w-full sm:w-64">
                  <div className="mb-2 h-3 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: "68%" }}
                    />
                  </div>
                  <p className="text-center body-small text-muted-foreground">68% full - Join now!</p>
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

        <div className="grid-responsive-1 grid-gap-responsive">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
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
            <Button size="lg" className="button-responsive-lg rounded-full">
              Share on WhatsApp
              <Sparkles className="ml-2 h-5 w-5" />
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
    </div>
  )
}
