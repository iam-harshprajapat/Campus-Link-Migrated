"use client"

import Link from "next/link"
import { ChevronRight } from 'lucide-react'

interface BreadcrumbSegment {
    label: string
    href: string
}

interface BreadcrumbProps {
    segments: BreadcrumbSegment[]
}

export default function NoteBreadcrumb({ segments }: BreadcrumbProps) {
    return (
        <nav className="border-t border-border px-6 py-3 bg-muted/20">
            <div className="flex items-center gap-2 text-sm">
                {segments.map((segment, index) => (
                    <div key={index} className="flex items-center gap-2">
                        {index > 0 && <ChevronRight size={16} className="text-muted-foreground" />}
                        {segment.href === "#" ? (
                            <span className="text-foreground font-medium">{segment.label}</span>
                        ) : (
                            <Link href={segment.href} className="text-primary hover:underline">
                                {segment.label}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    )
}
