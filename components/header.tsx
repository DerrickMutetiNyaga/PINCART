"use client"

import Link from "next/link"
import { Heart, ShoppingCart, User, LogOut, Menu, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Header() {
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-responsive">
        {/* Desktop Header */}
        <div className="hidden md:flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <Heart className="h-5 w-5 fill-white text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
              Pinkcart
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/how-it-works" className="body-small font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="/about" className="body-small font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="body-small font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          <a 
            href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="body-small font-medium transition-colors hover:text-primary text-primary"
          >
            Join Community
          </a>
          </nav>

          <Button 
            asChild 
            className="rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6"
          >
            <a href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              Join WhatsApp
            </a>
          </Button>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                <Heart className="h-4 w-4 fill-white text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
                Pinkcart
              </span>
            </Link>

            <Button 
              asChild 
              size="sm"
              className="rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-4"
            >
              <a href="https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1 h-4 w-4" />
                Join
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
