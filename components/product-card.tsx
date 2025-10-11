"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  joinedCount: number
  category: string
}

export function ProductCard({ id, name, price, originalPrice, image, joinedCount, category }: ProductCardProps) {
  const router = useRouter()

  const handleJoinShipment = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/product/${id}`)
  }

  return (
    <Card className="group overflow-hidden rounded-2xl border-2 transition-all hover:shadow-lg sm:rounded-3xl">
      <Link href={`/product/${id}`}>
        <div className="image-container bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="image-responsive group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 touch-target rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Badge className="absolute left-2 top-2 rounded-full bg-secondary text-secondary-foreground text-xs sm:text-sm">
            {category}
          </Badge>
        </div>
      </Link>
      <CardContent className="p-4 sm:p-6">
        <Link href={`/product/${id}`}>
          <h3 className="heading-4 mb-2 line-clamp-2 text-balance">{name}</h3>
        </Link>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
          <span className="text-xl font-bold text-primary sm:text-2xl" style={{ fontFamily: "var(--font-fredoka)" }}>
            KSh {price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="body-small text-muted-foreground line-through">KSh {originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-1 body-small text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{joinedCount} people joined this order</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 sm:p-6">
        <Button className="button-responsive w-full rounded-full" onClick={handleJoinShipment}>
          Join Shipment
        </Button>
      </CardFooter>
    </Card>
  )
}
