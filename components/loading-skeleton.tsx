import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ShopPageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="border-b bg-gradient-to-b from-primary/5 to-transparent section-spacing">
        <div className="container-responsive">
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
        </div>
      </div>

      {/* Category filter skeleton */}
      <section className="border-b py-6 sm:py-8">
        <div className="container-responsive">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24 rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Products grid skeleton */}
      <section className="container-responsive section-spacing">
        <div className="mb-6 flex-responsive-between">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        <div className="grid-responsive-1 grid-gap-responsive">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  )
}