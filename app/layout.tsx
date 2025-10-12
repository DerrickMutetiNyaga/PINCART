import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth-context"
import { BottomNavigation } from "@/components/bottom-navigation"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { StructuredData } from "@/components/structured-data"
import "./globals.css"

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Pinkcart - Group Shipping from China to Kenya | Import Cute Finds & Save 60%",
  description: "Import cute finds from China to Kenya with group shipping. Save up to 60% on shipping costs, join our community, and get access to exclusive deals. Best way to ship from China to Kenya affordably.",
  keywords: [
    "group shipping China Kenya",
    "import from China to Kenya",
    "China to Kenya shipping",
    "group buying China",
    "affordable shipping China Kenya",
    "cute finds China",
    "China import community",
    "shipping from China",
    "China wholesale Kenya",
    "group shipping service",
    "China to Kenya courier",
    "cheap shipping China Kenya",
    "import cute items China",
    "China shopping Kenya",
    "group shipping platform",
    "China import Kenya",
    "shipping China to Nairobi",
    "China goods Kenya",
    "import community Kenya",
    "China shopping group"
  ],
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
    title: "Pinkcart - Group Shipping from China to Kenya | Save 60% on Shipping",
    description: "Import cute finds from China to Kenya with group shipping. Save up to 60% on shipping costs, join our community, and get access to exclusive deals. Best way to ship from China to Kenya affordably.",
    url: "https://pinkcart.vercel.app",
    siteName: "Pinkcart - China to Kenya Group Shipping",
    images: [
      {
        url: "/placeholder-logo.png",
        width: 1200,
        height: 630,
        alt: "Pinkcart - Group Shipping from China to Kenya - Save 60% on Shipping Costs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinkcart - Group Shipping from China to Kenya | Save 60%",
    description: "Import cute finds from China to Kenya with group shipping. Save up to 60% on shipping costs, join our community, and get access to exclusive deals.",
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
  other: {
    "geo.region": "KE",
    "geo.placename": "Nairobi",
    "geo.position": "-1.2921;36.8219",
    "ICBM": "-1.2921, 36.8219",
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
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" as="style" onLoad="this.onload=null;this.rel='stylesheet'" />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" /></noscript>
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
        <StructuredData />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            body { font-family: system-ui, -apple-system, sans-serif; }
            .font-fredoka { font-family: 'Fredoka', system-ui, -apple-system, sans-serif; }
            /* Prevent layout shift */
            img { height: auto; max-width: 100%; }
            /* Loading state */
            .loading { opacity: 0.7; }
          `
        }} />
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
