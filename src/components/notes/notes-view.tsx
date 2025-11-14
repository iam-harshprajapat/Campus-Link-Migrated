"use client"

import Link from "next/link"
import { BookOpen, RefreshCw } from 'lucide-react'
import { getCourses } from "@/lib/data/notes-data"
import { Button } from "@/components/ui/button"

export default function NotesView() {
    const courses = getCourses()

    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <div className="flex flex-1 flex-col md:animation-none animate-slide-in"
        >
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <BookOpen size={24} className="text-primary" />
                        <h1 className="text-2xl font-bold text-foreground">Notes</h1>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleRefresh} className="hover:bg-secondary">
                        <RefreshCw size={20} />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {courses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <BookOpen size={48} className="mb-4 text-muted-foreground" />
                        <p className="text-lg font-semibold text-foreground">No Files Found</p>
                        <p className="text-sm text-muted-foreground">No notes available yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground mb-4">SELECT A COURSE</p>
                        {courses.map((course) => (
                            <Link
                                key={course}
                                href={`/notes/${encodeURIComponent(course)}`}
                                className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:bg-secondary hover:border-primary cursor-pointer"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <BookOpen size={24} className="text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-foreground">{course}</p>
                                    <p className="text-sm text-muted-foreground">Click to view semesters</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
