import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth-context"
import { BottomNavigation } from "@/components/bottom-navigation"
import { PerformanceMonitor } from "@/components/performance-monitor"
import { ForceCacheClear } from "@/components/force-cache-clear"
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
  keywords: [
    // Core keywords
    "group shipping", "China to Kenya", "cute finds", "affordable shipping", "community shopping", "pinkcart",
    // China import keywords
    "import from China to Kenya", "China to Kenya shipping", "group buying China", "China import community",
    "shipping from China", "China wholesale Kenya", "group shipping service", "China to Kenya courier",
    "cheap shipping China Kenya", "import cute items China", "China shopping Kenya", "group shipping platform",
    "China import Kenya", "shipping China to Nairobi", "China goods Kenya", "import community Kenya",
    "China shopping group", "bulk shipping China Kenya", "China import Kenya", "shipping from China to Kenya",
    "China to Kenya import", "group import China", "China shipping Kenya", "import China products",
    "China to Kenya logistics", "shipping China goods", "China import service", "group buying from China",
    "China to Kenya delivery", "import China items", "China shipping service", "group shipping China",
    "China to Kenya freight", "shipping China products", "China import platform", "group import service",
    "China to Kenya transport", "import from China", "China shipping platform", "group buying platform",
    "China to Kenya cargo", "shipping service China", "China import Kenya", "group shipping service",
    "China to Kenya logistics", "import China goods", "China shipping Kenya", "group buying China",
    "China to Kenya shipping", "import from China Kenya", "China shipping service", "group import China",
    "China to Kenya delivery", "shipping China to Kenya", "China import Kenya", "group shipping China",
    "China to Kenya freight", "import China products", "China shipping Kenya", "group buying from China",
    "China to Kenya transport", "shipping from China", "China import platform", "group import service",
    "China to Kenya cargo", "shipping China goods", "China import Kenya", "group shipping platform",
    "China to Kenya logistics", "import China items", "China shipping Kenya", "group buying platform",
    "China to Kenya shipping", "import from China Kenya", "China shipping service", "group import China",
    "China to Kenya delivery", "shipping China to Kenya", "China import Kenya", "group shipping China",
    "China to Kenya freight", "import China products", "China shipping Kenya", "group buying from China",
    "China to Kenya transport", "shipping from China", "China import platform", "group import service",
    "China to Kenya cargo", "shipping China goods", "China import Kenya", "group shipping platform"
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
  other: {
    // Geographic targeting
    "geo.region": "KE",
    "geo.placename": "Nairobi",
    "geo.position": "-1.2921;36.8219",
    "ICBM": "-1.2921, 36.8219",
    "geo.country": "Kenya",
    "geo.region": "Nairobi",
    
    // Business information
    "business:contact_data:locality": "Nairobi",
    "business:contact_data:region": "Nairobi",
    "business:contact_data:country_name": "Kenya",
    
    // Product/service targeting
    "product:category": "Shipping and Logistics",
    "product:availability": "in stock",
    "product:condition": "new",
    "product:price:amount": "0",
    "product:price:currency": "KES",
    
    // Additional SEO meta tags
    "application-name": "Pinkcart",
    "apple-mobile-web-app-title": "Pinkcart",
    "msapplication-TileColor": "#f8b4d1",
    "msapplication-config": "/browserconfig.xml",
    
    // China import specific
    "import:origin_country": "China",
    "import:destination_country": "Kenya",
    "import:service_type": "Group Shipping",
    "import:shipping_method": "Sea Freight",
    "import:delivery_time": "3-4 weeks",
    "import:savings": "up to 60%",
    
    // Local business schema
    "business:hours": "Monday-Friday 9:00-18:00, Saturday 10:00-16:00",
    "business:payment_methods": "M-Pesa, Credit Card, PayPal",
    "business:services": "Group Shipping, China Import, Logistics",
    
    // Content targeting
    "content:language": "en",
    "content:country": "Kenya",
    "content:region": "East Africa",
    "content:category": "E-commerce, Shipping, Import",
    
    // Social media optimization
    "og:site_name": "Pinkcart",
    "og:type": "website",
    "og:locale": "en_KE",
    "og:locale:alternate": "en_US",
    
    // Twitter specific
    "twitter:site": "@pinkcart",
    "twitter:creator": "@pinkcart",
    "twitter:domain": "pinkcart.vercel.app",
    
    // Mobile optimization
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Pinkcart",
    
    // Performance and caching - DISABLED FOR FRESH DATA
    "cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    "pragma": "no-cache",
    "expires": "0",
    "surrogate-control": "no-store",
    
    // Security
    "referrer-policy": "origin-when-cross-origin",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "x-xss-protection": "1; mode=block",
    
    // China import specific keywords for search engines
    "keywords": "China to Kenya shipping, group shipping China, import from China Kenya, China shipping service, group buying China, China import community, shipping China to Kenya, China to Kenya import, group shipping service, China shipping Kenya, import China products, China to Kenya logistics, shipping from China, China import platform, group buying from China, China to Kenya delivery, import China items, China shipping platform, group import service, China to Kenya freight, shipping China goods, China import Kenya, group shipping platform, China to Kenya cargo, shipping service China, China import Kenya, group shipping service, China to Kenya logistics, import China goods, China shipping Kenya, group buying China, China to Kenya shipping, import from China Kenya, China shipping service, group import China, China to Kenya delivery, shipping China to Kenya, China import Kenya, group shipping China, China to Kenya freight, import China products, China shipping Kenya, group buying from China, China to Kenya transport, shipping from China, China import platform, group import service, China to Kenya cargo, shipping China goods, China import Kenya, group shipping platform, China to Kenya logistics, import China items, China shipping Kenya, group buying platform, China to Kenya shipping, import from China Kenya, China shipping service, group import China, China to Kenya delivery, shipping China to Kenya, China import Kenya, group shipping China, China to Kenya freight, import China products, China shipping Kenya, group buying from China, China to Kenya transport, shipping from China, China import platform, group import service, China to Kenya cargo, shipping China goods, China import Kenya, group shipping platform"
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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" />
        <link rel="dns-prefetch" href="https://chat.whatsapp.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#f8b4d1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pinkcart" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <meta name="cache-version" content="2.0.0" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
        <link rel="icon" href="/placeholder-logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/placeholder-logo.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BWM0F2S60Y"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BWM0F2S60Y');
          `
        }} />
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
        <ForceCacheClear />
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
