"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function NoteSkeleton() {
    return (
        <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 skeleton-shimmer mb-3">
            {/* Icon placeholder */}
            <Skeleton className="h-12 w-12 rounded-lg bg-muted" />

            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 md:w-1/3 w-1/2 bg-muted" />
                <Skeleton className="h-3 w-1/5 bg-muted" />
            </div>
        </div>
    )
}
