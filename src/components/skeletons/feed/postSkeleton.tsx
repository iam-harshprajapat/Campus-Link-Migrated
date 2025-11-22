"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function PostSkeleton() {
  return (
    <div className="border-b border-border pb-6 mb-6 -mx-4 px-4 py-4 rounded-lg skeleton-shimmer">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3 bg-muted" />
          <Skeleton className="h-3 w-1/4 bg-muted" />
        </div>
      </div>

      {/* Image */}
      <Skeleton className="h-[300px] w-full rounded-xl mb-4 bg-muted" />

      {/* Caption */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full bg-muted" />
        <Skeleton className="h-3 w-2/3 bg-muted" />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="h-3 w-20 bg-muted" />
        <Skeleton className="h-3 w-28 bg-muted" />
      </div>
    </div>
  )
}
