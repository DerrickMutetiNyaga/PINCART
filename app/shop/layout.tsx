import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop - Pinkcart",
  description: "Browse our latest cute finds and join group shipments to save on shipping costs.",
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
