"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function FileSkeleton() {
    return (
        <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 skeleton-shimmer mb-3">
            {/* File icon */}
            <Skeleton className="h-10 w-10 rounded-lg bg-muted" />

            {/* Text */}
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 bg-muted" />
                <Skeleton className="h-3 w-1/2 bg-muted" />
            </div>

            {/* Download button */}
            <Skeleton className="h-8 w-8 rounded-md bg-muted" />
        </div>
    )
}
