import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Package, Sparkles, Target, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Pinkcart",
  description: "Learn about Pinkcart's mission to make cute finds from China affordable through community group shipping.",
  other: {
    "cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    "pragma": "no-cache",
    "expires": "0",
    "surrogate-control": "no-store",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent section-spacing">
        <div className="container-responsive">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Story</span>
            </div>
            <h1 className="heading-1 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
              About Pinkcart
            </h1>
            <p className="body-large text-muted-foreground text-balance">
              Making cute finds from China affordable for everyone through the power of community
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="container-responsive section-spacing">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden rounded-3xl border-2">
            <CardContent className="p-0">
              <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
                <div className="relative aspect-square sm:aspect-[4/3] md:aspect-auto md:h-full">
                  <Image src="/founder-elvy.jpg" alt="Elvy, Founder of Pinkcart" fill className="object-cover" />
                </div>
                <div className="padding-responsive">
                  <h3 className="heading-3 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Hi, I'm Elvy!
                  </h3>
                  <div className="space-y-4 body-medium text-muted-foreground leading-relaxed">
                    <p>
                      I started Pinkcart because I was tired of paying crazy expensive shipping fees for cute items from
                      China. As a student in Nairobi, I loved browsing online stores but the shipping costs were often
                      more than the products themselves!
                    </p>
                    <p>
                      One day, I had an idea: what if we could ship together? I reached out to friends who also wanted
                      to order, and we combined our purchases into one shipment. The savings were incredible - we each
                      paid a fraction of what we would have paid individually.
                    </p>
                    <p>
                      That's how Pinkcart was born. Now, we're a growing community of shoppers who love cute finds and
                      smart savings. Every shipment brings us together, and I'm so grateful to be part of this journey
                      with you.
                    </p>
                    <p className="font-semibold text-foreground">
                      Let's continue shipping together and making cute finds accessible for everyone!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="border-y bg-gradient-to-b from-secondary/5 to-accent/5 section-spacing">
        <div className="container-responsive">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className="heading-2 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
              Our Mission & Values
            </h2>
            <p className="body-medium text-muted-foreground">What drives us every day</p>
          </div>

          <div className="grid-responsive-3 grid-gap-responsive">
            {[
              {
                icon: Target,
                title: "Accessibility",
                description:
                  "Making cute, quality products from China accessible and affordable for everyone through community group buying.",
              },
              {
                icon: Users,
                title: "Community First",
                description:
                  "Building a supportive community where shoppers connect, share finds, and help each other save money.",
              },
              {
                icon: Sparkles,
                title: "Quality & Trust",
                description:
                  "Curating only the best products and maintaining transparency throughout the entire shopping and shipping process.",
              },
            ].map((value, index) => (
              <Card key={index} className="card-responsive text-center">
                <CardContent className="padding-responsive">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="heading-4 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {value.title}
                  </h3>
                  <p className="body-medium text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-responsive section-spacing">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden rounded-3xl border-2 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
            <CardContent className="padding-responsive">
              <div className="mb-6 sm:mb-8 text-center">
                <h2 className="heading-2 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Why Join Pinkcart?
                </h2>
                <p className="body-medium text-muted-foreground">Be part of something exciting from day one</p>
              </div>

              <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
                {[
                  { 
                    value: "Coming Soon", 
                    label: "First Shipment Launch", 
                    description: "Be among the first to experience group shipping savings"
                  },
                  { 
                    value: "60%+", 
                    label: "Expected Savings", 
                    description: "Save up to 60% on shipping costs compared to individual orders"
                  },
                  { 
                    value: "Growing", 
                    label: "Community Building", 
                    description: "Join our growing community of smart shoppers"
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-2 text-3xl sm:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-fredoka)" }}>
                      {stat.value}
                    </div>
                    <div className="body-medium font-semibold text-foreground mb-2">{stat.label}</div>
                    <div className="body-small text-muted-foreground leading-relaxed">{stat.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-b from-primary/5 to-secondary/5 section-spacing">
        <div className="container-responsive">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
              Join Our Community
            </h2>
            <p className="body-large mb-8 text-muted-foreground text-balance">
              Be part of a growing community that's making cute finds affordable for everyone
            </p>
            <div className="flex-responsive-center gap-4">
              <Button size="lg" className="button-responsive-lg rounded-full px-6 sm:px-8" asChild>
                <a href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" target="_blank" rel="noopener noreferrer">
                  Start Shopping
                  <Package className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="button-responsive-lg rounded-full bg-transparent px-6 sm:px-8" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
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
              <h4 className="heading-4 mb-4">Shop</h4>
              <ul className="spacing-responsive body-small text-muted-foreground">
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
