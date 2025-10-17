import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop - Pinkcart",
  description: "Browse our latest cute finds and join group shipments to save on shipping costs.",
  other: {
    "cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    "pragma": "no-cache",
    "expires": "0",
    "surrogate-control": "no-store",
  },
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
