"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-primary/5 to-transparent section-spacing">
        <div className="container-responsive">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="body-small font-medium text-primary">We're Here to Help</span>
            </div>
            <h1 className="heading-1 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
              Get in Touch
            </h1>
            <p className="body-large text-muted-foreground text-balance">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container-responsive section-spacing">
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: MessageCircle,
              title: "WhatsApp",
              description: "Chat with us instantly",
              contact: "+254 736 381 425",
              action: "Open WhatsApp",
              href: "https://wa.me/254736381425",
            },
            {
              icon: Mail,
              title: "Email",
              description: "Send us an email",
              contact: "pincartkenya@gmail.com",
              action: "Send Email",
              href: "mailto:pincartkenya@gmail.com",
            },
            {
              icon: Phone,
              title: "Phone",
              description: "Call us directly",
              contact: "+254 794 269 051",
              action: "Call Now",
              href: "tel:+254794269051",
            },
          ].map((method, index) => (
            <Card key={index} className="card-responsive text-center">
              <CardContent className="padding-responsive">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <method.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="heading-4 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {method.title}
                </h3>
                <p className="body-small mb-2 text-muted-foreground">{method.description}</p>
                <p className="body-medium mb-4 font-medium">{method.contact}</p>
                <Button variant="outline" className="button-responsive rounded-full bg-transparent" asChild>
                  <a href={method.href} target="_blank" rel="noopener noreferrer">
                    {method.action}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="card-responsive">
            <CardContent className="padding-responsive">
              <h2 className="heading-3 mb-6" style={{ fontFamily: "var(--font-fredoka)" }}>
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="body-medium">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="button-responsive rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="body-medium">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="button-responsive rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="body-medium">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="button-responsive rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="body-medium">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="button-responsive rounded-2xl"
                  />
                </div>

                <Button type="submit" size="lg" className="button-responsive-lg w-full rounded-full">
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="space-y-6">
            <Card className="card-responsive bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="padding-responsive">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="heading-4 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Location
                </h3>
                <p className="body-medium text-muted-foreground leading-relaxed">
                  Based in Nairobi, Kenya
                  <br />
                  Serving customers across Kenya
                </p>
              </CardContent>
            </Card>

            <Card className="card-responsive">
              <CardContent className="padding-responsive">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                  <Sparkles className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="heading-4 mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Business Hours
                </h3>
                <div className="space-y-2 body-medium text-muted-foreground">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-responsive bg-gradient-to-br from-accent/10 to-primary/10">
              <CardContent className="padding-responsive">
                <h3 className="heading-4 mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/how-it-works" className="body-medium text-muted-foreground hover:text-primary">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="body-medium text-muted-foreground hover:text-primary">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="body-medium text-muted-foreground hover:text-primary">
                      Shipping Information
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="body-medium text-muted-foreground hover:text-primary">
                      Returns & Refunds
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-gradient-to-b from-secondary/5 to-accent/5 section-spacing">
        <div className="container-responsive">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-2 mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
              Join Our WhatsApp Community
            </h2>
            <p className="body-large mb-8 text-muted-foreground text-balance">
              Get live updates on shipments, exclusive deals, and connect with other shoppers
            </p>
            <Button size="lg" className="button-responsive-lg rounded-full px-8" asChild>
              <a href="https://wa.me/254736381425" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join WhatsApp Group
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
                  <a href="https://wa.me/254736381425?text=Hi! I'd like to join the Pinkcart community for group shipping deals!" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    Join WhatsApp Group
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/254736381425?text=Hi! I'd like to join the Pinkcart community for group shipping deals!" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    Get Live Updates
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/254736381425?text=Hi! I'd like to join the Pinkcart community for group shipping deals!" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
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
