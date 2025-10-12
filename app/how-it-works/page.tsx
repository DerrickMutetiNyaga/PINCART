import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, Package, ShoppingCart, Sparkles, TrendingDown, Truck, Users, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const faqs = [
    {
      question: "Why is it cheaper?",
      answer:
        "By combining multiple orders into one shipment, we split the shipping costs among all buyers. Instead of paying full shipping for a single item, you only pay a fraction of the total shipping cost. The more people who join, the lower the cost for everyone!",
    },
    {
      question: "How long does shipping take?",
      answer:
        "After the order closes, it typically takes 3-4 weeks for your items to arrive. This includes processing time in China, international shipping, customs clearance in Kenya, and final delivery to you. We provide tracking updates throughout the journey.",
    },
    {
      question: "What happens if the shipment is delayed?",
      answer:
        "While delays are rare, they can happen due to customs or logistics issues. We'll keep you updated via WhatsApp and email throughout the process. If there's a significant delay, we'll provide regular updates and work to resolve any issues as quickly as possible.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "If an item arrives damaged or significantly different from the description, we offer a full refund or replacement. You must report issues within 7 days of delivery with photos. Refunds for change of mind are not available once the shipment has closed, as we've already placed the order.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order is shipped, you'll receive a tracking number. You can also check your order status in your account dashboard, which shows whether your order is processing, in China, on the way, cleared in Kenya, or out for delivery.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept M-Pesa. Payment is required when you join a shipment to secure your spot. All payments are processed securely through our payment partners.",
    },
    {
      question: "How do I know if a product is good quality?",
      answer:
        "We carefully curate all products and work with trusted suppliers. Many items include customer reviews and photos from previous shipments. We also test popular items ourselves before adding them to the store.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "You can cancel your order before the shipment closes for a full refund. Once the shipment closes and we've placed the order with our suppliers, cancellations are no longer possible as the items have been purchased.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent section-spacing">
        <div className="container-responsive">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="body-small font-medium text-primary">Simple & Transparent</span>
            </div>
            <h1 className="heading-1 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
              How Pinkcart Works
            </h1>
            <p className="body-large text-muted-foreground text-balance">
              Group buying made simple. Save money by shipping together with our community.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="container-responsive section-spacing">
        <div className="mb-12 text-center">
          <h2 className="heading-2 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
            Three Simple Steps
          </h2>
          <p className="body-medium text-muted-foreground">From browsing to delivery, here's how it works</p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-accent lg:block" />

          <div className="space-y-12">
            {[
              {
                step: "01",
                icon: ShoppingCart,
                title: "Browse & Pick Your Favorites",
                description:
                  "Explore our curated collection of cute finds from China. Each product shows how many people have already joined the order and the savings you'll get from group shipping. Add items to your cart and proceed to checkout.",
                details: [
                  "Browse by category: Girly Finds, Dorm Essentials, Tech & Accessories",
                  "See real-time updates on how many people joined each order",
                  "Check the countdown timer to see when the shipment closes",
                  "Read product descriptions and customer reviews",
                ],
                color: "primary",
              },
              {
                step: "02",
                icon: Users,
                title: "Pay & Join the Group Shipment",
                description:
                  "Complete your payment to secure your spot in the group shipment. Your items are reserved, and you'll be added to our WhatsApp group for live updates. The more people who join, the lower the shipping cost for everyone!",
                details: [
                  "Pay securely via M-Pesa",
                  "Get instant confirmation and order number",
                  "Join our WhatsApp group for updates",
                  "Track the shipment progress in real-time",
                ],
                color: "secondary",
              },
              {
                step: "03",
                icon: Package,
                title: "Receive Your Order",
                description:
                  "After the shipment closes, we place the bulk order and ship everything together. You'll receive tracking updates as your items travel from China to Kenya. Delivery typically takes 3-4 weeks from when the order closes.",
                details: [
                  "Get tracking number once shipped from China",
                  "Receive updates at each stage: processing, in transit, customs, delivery",
                  "Choose pickup point or home delivery",
                  "Unbox your cute finds and share on social media!",
                ],
                color: "accent",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <Card
                  className={`mx-auto max-w-4xl overflow-hidden card-responsive ${
                    index % 2 === 0 ? "lg:mr-auto lg:ml-0" : "lg:ml-auto lg:mr-0"
                  }`}
                >
                  <CardContent className="padding-responsive">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                      <div className="flex-shrink-0">
                        <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-${step.color}/10`}>
                          <step.icon className={`h-10 w-10 text-${step.color}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div
                          className="mb-2 text-5xl font-bold text-primary/30"
                          style={{ fontFamily: "var(--font-fredoka)" }}
                        >
                          {step.step}
                        </div>
                        <h3 className="heading-3 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
                          {step.title}
                        </h3>
                        <p className="body-medium mb-6 text-muted-foreground leading-relaxed">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="body-small text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y bg-gradient-to-b from-secondary/5 to-accent/5 section-spacing">
        <div className="container-responsive">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
              Why Choose Pinkcart?
            </h2>
            <p className="body-medium text-muted-foreground">More than just savings</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: TrendingDown,
                title: "Save Up to 60%",
                description: "Split shipping costs with the community and save significantly on every order.",
              },
              {
                icon: Users,
                title: "Community Vibes",
                description: "Join our WhatsApp group, share finds, and connect with other shoppers.",
              },
              {
                icon: Sparkles,
                title: "Curated Selection",
                description: "We handpick cute, quality items so you don't have to search through thousands.",
              },
              {
                icon: Truck,
                title: "Reliable Shipping",
                description: "Track your order every step of the way from China to your doorstep.",
              },
              {
                icon: Heart,
                title: "Customer Support",
                description: "We're here to help via WhatsApp, email, or phone throughout your journey.",
              },
              {
                icon: Package,
                title: "Quality Guaranteed",
                description: "Full refund or replacement if items arrive damaged or not as described.",
              },
            ].map((benefit, index) => (
              <Card key={index} className="rounded-2xl border-2 sm:rounded-3xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="heading-4 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {benefit.title}
                  </h3>
                  <p className="body-small text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-responsive section-spacing">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
              Frequently Asked Questions
            </h2>
            <p className="body-medium text-muted-foreground">Everything you need to know about Pinkcart</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-responsive data-[state=open]:bg-muted/30"
              >
                <AccordionTrigger className="text-left heading-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="body-medium text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-b from-primary/5 to-secondary/5 section-spacing">
        <div className="container-responsive">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
              Ready to Start Saving?
            </h2>
            <p className="body-large mb-8 text-muted-foreground text-balance">
              Join our community and discover cute finds at unbeatable prices
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="button-responsive-lg rounded-full px-8" asChild>
                <a href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Join Community
                </a>
              </Button>
              <Button size="lg" variant="outline" className="button-responsive-lg rounded-full bg-transparent px-8" asChild>
                <Link href="/contact">Contact Us</Link>
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
                <span className="heading-3" style={{ fontFamily: "var(--font-fredoka)" }}>
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

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Pinkcart. Made with love in Nairobi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
