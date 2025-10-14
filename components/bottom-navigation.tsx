"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBag, Info, MessageCircle, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    name: "Shop",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    name: "How It Works",
    href: "/how-it-works",
    icon: Info,
  },
  {
    name: "WhatsApp",
    href: "https://chat.whatsapp.com/CtFf4VilvRzDeUeRRdTasC?mode=wwt",
    icon: MessageCircle,
    external: true,
    isSpecial: true, // Always highlighted
    isWhatsApp: true, // Special WhatsApp styling
  },
  {
    name: "About",
    href: "/about",
    icon: Heart,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: MessageCircle,
  },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href))
          
          // Special item (Join Community) is always highlighted
          const isHighlighted = isActive || item.isSpecial
          
          const LinkComponent = item.external ? 'a' : Link
          const linkProps = item.external 
            ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
            : { href: item.href }
          
          return (
            <LinkComponent
              key={item.name}
              {...linkProps}
              className={cn(
                "group flex flex-col items-center justify-center relative transition-all duration-200",
                isHighlighted ? "scale-110" : "scale-100"
              )}
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110",
                  isHighlighted
                    ? item.isWhatsApp
                      ? "bg-green-500 shadow-lg shadow-green-500/30 group-hover:bg-green-600 group-hover:shadow-green-600/40"
                      : item.isSpecial 
                        ? "bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 group-hover:from-emerald-400 group-hover:to-teal-400 group-hover:shadow-emerald-400/40"
                        : "bg-primary shadow-lg shadow-primary/30 group-hover:bg-emerald-400 group-hover:shadow-emerald-400/40"
                    : "bg-transparent group-hover:bg-emerald-100 group-hover:shadow-emerald-200/20"
                )}
              >
                <item.icon
                  className={cn(
                    "w-6 h-6 transition-colors duration-200 group-hover:text-white",
                    isHighlighted ? "text-primary-foreground" : "text-gray-600"
                  )}
                />
              </div>
              
              {/* Text Label */}
              <span
                className={cn(
                  "text-xs font-medium mt-1 transition-all duration-200 text-center group-hover:text-emerald-600",
                  isHighlighted
                    ? item.isWhatsApp
                      ? "text-green-600 group-hover:text-green-700"
                      : "text-primary"
                    : "text-gray-600"
                )}
              >
                {item.name}
              </span>
              
              {/* Active indicator glow */}
              {isHighlighted && (
                <div className={cn(
                  "absolute inset-0 rounded-full blur-md -z-10",
                  item.isWhatsApp 
                    ? "bg-green-500/20" 
                    : "bg-primary/20"
                )} />
              )}
            </LinkComponent>
          )
        })}
      </div>
    </nav>
  )
}
