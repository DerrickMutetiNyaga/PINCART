// Mock data for products and orders

export interface Product {
  id: string
  name: string
  price: number
  priceKsh: string
  image: string
  category: string
  description: string
  features: string[]
  inStock: boolean
  joinedCount: number
  shippingEstimate: string
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "LED Vanity Mirror with Hearts",
    price: 2450,
    priceKsh: "KSh 2,450",
    image: "/led-mirror-hearts.jpg",
    category: "Beauty & Personal Care",
    description: "Cute LED mirror with heart-shaped lights, perfect for your vanity setup",
    features: ["Adjustable brightness", "USB powered", "Touch control", "360° rotation"],
    inStock: true,
    joinedCount: 23,
    shippingEstimate: "Ships in 3-5 days",
  },
  {
    id: "2",
    name: "Pink Desk Organizer Set",
    price: 890,
    priceKsh: "KSh 890",
    image: "/pink-desk-organizer.jpg",
    category: "Home & Office",
    description: "Adorable pink desk organizer to keep your workspace tidy and cute",
    features: ["Multiple compartments", "Durable plastic", "Easy to clean", "Stackable design"],
    inStock: true,
    joinedCount: 45,
    shippingEstimate: "Ships in 2-4 days",
  },
  {
    id: "3",
    name: "Kawaii Phone Accessories",
    price: 650,
    priceKsh: "KSh 650",
    image: "/kawaii-phone-accessories.jpg",
    category: "Tech & Gadgets",
    description: "Super cute phone accessories including pop socket and charm",
    features: ["Universal fit", "Strong adhesive", "Reusable", "Cute designs"],
    inStock: true,
    joinedCount: 67,
    shippingEstimate: "Ships in 1-3 days",
  },
]
