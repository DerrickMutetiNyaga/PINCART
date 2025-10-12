import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth-context"
import { BottomNavigation } from "@/components/bottom-navigation"
import { PerformanceMonitor } from "@/components/performance-monitor"
import "./globals.css"

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Pinkcart - Let's Ship Together",
  description: "Cute Finds, Lower Shipping, Community Vibes. Join our group shipping community and save up to 60% on shipping costs from China to Kenya.",
  keywords: ["group shipping", "China to Kenya", "cute finds", "affordable shipping", "community shopping", "pinkcart"],
  authors: [{ name: "Pinkcart Team" }],
  creator: "Pinkcart",
  publisher: "Pinkcart",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pinkcart.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pinkcart - Let's Ship Together",
    description: "Cute Finds, Lower Shipping, Community Vibes. Join our group shipping community and save up to 60% on shipping costs from China to Kenya.",
    url: "https://pinkcart.vercel.app",
    siteName: "Pinkcart",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 1200,
        height: 630,
        alt: "Pinkcart - Group Shipping Community",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinkcart - Let's Ship Together",
    description: "Cute Finds, Lower Shipping, Community Vibes. Join our group shipping community and save up to 60% on shipping costs from China to Kenya.",
    images: ["/placeholder-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://chat.whatsapp.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#f8b4d1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pinkcart" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
        <link rel="icon" href="/placeholder-logo.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${fredoka.variable} pb-20 md:pb-0`}>
        <AuthProvider>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>{children}</Suspense>
        </AuthProvider>
        <BottomNavigation />
        <PerformanceMonitor />
        <Analytics />
      </body>
    </html>
  )
}
