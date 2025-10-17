import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Pinkcart",
  description: "Get in touch with Pinkcart for questions about group shipping, orders, or general inquiries.",
  other: {
    "cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    "pragma": "no-cache",
    "expires": "0",
    "surrogate-control": "no-store",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
