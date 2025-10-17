import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Package, Sparkles, TrendingUp, Users, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pinkcart - Let's Ship Together",
  description: "Cute Finds, Lower Shipping, Community Vibes. Join our group shipping community and save up to 60% on shipping costs from China to Kenya.",
  other: {
    "cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    "pragma": "no-cache",
    "expires": "0",
    "surrogate-control": "no-store",
  },
}

export default function HomePage() {

  const trendingProducts = [
    {
      id: "1",
      name: "Cute Pink Desk Organizer Set",
      price: 1200,
      originalPrice: 2500,
      image: "/pink-desk-organizer.jpg",
      joinedCount: 34,
      category: "Dorm Essentials",
    },
    {
      id: "2",
      name: "Aesthetic LED Mirror with Hearts",
      price: 2800,
      originalPrice: 4500,
      image: "/led-mirror-hearts.jpg",
      joinedCount: 28,
      category: "Girly Finds",
    },
    {
      id: "3",
      name: "Kawaii Phone Accessories Bundle",
      price: 800,
      originalPrice: 1500,
      image: "/kawaii-phone-accessories.jpg",
      joinedCount: 45,
      category: "Tech & Accessories",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <section className="container-responsive section-spacing">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join Our WhatsApp Group</span>
          </div>

          <h1
            className="heading-1 mb-6 text-balance"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Let&apos;s Ship Together
          </h1>

          <p className="body-large mb-8 text-muted-foreground text-balance">
            Cute Finds, Lower Shipping, Community Vibes
          </p>

          <p className="body-medium mb-8 text-muted-foreground text-balance">
            Together, we&apos;re making international shipping affordable for everyone.
          </p>

          <div className="flex-responsive-center mb-8 gap-4">
            <Button size="lg" className="button-responsive-lg rounded-full px-6 sm:px-8" asChild>
              <a href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join WhatsApp Group
              </a>
            </Button>
            <Button size="lg" variant="outline" className="button-responsive-lg rounded-full px-6 sm:px-8 bg-transparent" asChild>
              <Link href="/how-it-works">How It Works</Link>
            </Button>
          </div>

        </div>
      </section>

      <section className="border-y bg-muted/30 py-8 sm:py-12">
        <div className="container-responsive">
          <div className="flex-responsive-center gap-6 sm:gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="heading-4 text-primary" style={{ fontFamily: "var(--font-fredoka)" }}>
                  120+
                </div>
                <div className="body-small text-muted-foreground">Friends Joined Last Shipment</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                <Package className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="heading-4 text-secondary" style={{ fontFamily: "var(--font-fredoka)" }}>
                  50+
                </div>
                <div className="body-small text-muted-foreground">Cute Finds Available</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="heading-4 text-accent" style={{ fontFamily: "var(--font-fredoka)" }}>
                  60%
                </div>
                <div className="body-small text-muted-foreground">Average Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-responsive section-spacing">
        <div className="mb-8 text-center">
          <h2 className="heading-2 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
            Join Our Community
          </h2>
          <p className="body-medium text-muted-foreground">Connect with fellow shoppers and get exclusive deals</p>
        </div>

        <div className="grid-responsive-3 grid-gap-responsive">
          {[
            {
              icon: MessageCircle,
              title: "Live Updates",
              description: "Get real-time notifications about new shipments, deals, and community activities.",
              color: "bg-primary/10 text-primary",
            },
            {
              icon: Users,
              title: "Community Support",
              description: "Connect with other shoppers, share finds, and get help from the community.",
              color: "bg-secondary/10 text-secondary",
            },
            {
              icon: Sparkles,
              title: "Exclusive Deals",
              description: "Access special discounts and early access to new products before they go public.",
              color: "bg-accent/10 text-accent",
            },
          ].map((feature, index) => (
            <Card key={index} className="card-responsive text-center">
              <CardContent className="padding-responsive">
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="heading-3 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {feature.title}
                </h3>
                <p className="body-medium text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button size="lg" className="button-responsive-lg rounded-full" asChild>
            <a href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Join WhatsApp Group Now
            </a>
          </Button>
        </div>
      </section>

      <section className="bg-gradient-to-b from-primary/5 to-secondary/5 section-spacing">
        <div className="container-responsive">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
              How It Works
            </h2>
            <p className="body-medium text-muted-foreground">Three simple steps to save on shipping</p>
          </div>

          <div className="grid-responsive-3 grid-gap-responsive">
            {[
              {
                icon: Heart,
                title: "Pick Your Favorites",
                description: "Browse our curated collection of cute finds from China and add items to your cart.",
                step: "01",
              },
              {
                icon: Users,
                title: "Join the Group",
                description: "Pay for your items and join others in the group shipment to split shipping costs.",
                step: "02",
              },
              {
                icon: Package,
                title: "Receive Your Order",
                description: "Get your items delivered in 3-4 weeks after the shipment closes. Track every step!",
                step: "03",
              },
            ].map((step, index) => (
              <Card key={index} className="card-responsive relative overflow-hidden">
                <CardContent className="padding-responsive">
                  <div
                    className="absolute right-4 top-4 text-4xl sm:text-5xl md:text-6xl font-bold text-primary/10"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {step.step}
                  </div>
                  <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="heading-3 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {step.title}
                  </h3>
                  <p className="body-medium text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="button-responsive-lg rounded-full" asChild>
              <Link href="/how-it-works">
                Learn More
                <Sparkles className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 py-16">
        <div className="container-responsive">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="body-small font-medium text-primary">Join Our Community</span>
            </div>
            <h2 className="heading-2 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
              Ready to Start Saving?
            </h2>
            <p className="body-large mb-8 text-muted-foreground text-balance">
              Join our WhatsApp group and get access to exclusive group shipping deals, live updates, and connect with fellow shoppers!
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="button-responsive-lg rounded-full px-8" asChild>
                <a href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Join WhatsApp Group
                </a>
              </Button>
              <Button size="lg" variant="outline" className="button-responsive-lg rounded-full bg-transparent px-8" asChild>
                <Link href="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
              <h4 className="heading-4 mb-4">Community</h4>
              <ul className="spacing-responsive body-small text-muted-foreground">
                <li>
                  <a href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    Join WhatsApp Group
                  </a>
                </li>
                <li>
                  <a href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    Get Live Updates
                  </a>
                </li>
                <li>
                  <a href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    Share Finds
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="heading-4 mb-4">Company</h4>
              <ul className="spacing-responsive body-small text-muted-foreground">
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
              <h4 className="heading-4 mb-4">Support</h4>
              <ul className="spacing-responsive body-small text-muted-foreground">
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

          <div className="mt-8 border-t pt-8 text-center body-small text-muted-foreground">
            <p>&copy; 2025 Pinkcart. Made with love in Nairobi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
