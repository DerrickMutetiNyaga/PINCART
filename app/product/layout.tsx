import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product Details - Pinkcart",
  description: "View product details and join group shipments to save on shipping costs.",
  other: {
    "cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    "pragma": "no-cache",
    "expires": "0",
    "surrogate-control": "no-store",
  },
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
