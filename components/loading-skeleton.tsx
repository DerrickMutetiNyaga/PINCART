export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="card-responsive animate-pulse">
      <div className="aspect-square bg-muted rounded-2xl mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-3 bg-muted rounded w-1/2"></div>
        <div className="h-6 bg-muted rounded w-1/3"></div>
      </div>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="text-center animate-pulse">
          <div className="h-12 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
        </div>
      ))}
    </div>
  )
}
