import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/lib/auth-context"
import { BottomNavigation } from "@/components/bottom-navigation"
import "./globals.css"

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Pinkcart - Let's Ship Together",
  description: "Cute Finds, Lower Shipping, Community Vibes",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${fredoka.variable} pb-20 md:pb-0`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </AuthProvider>
        <BottomNavigation />
        <Analytics />
      </body>
    </html>
  )
}
