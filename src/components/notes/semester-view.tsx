"use client"

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { BookOpen, ChevronRight, RefreshCw, ChevronLeft } from 'lucide-react'
import { getSubjectsBySemester } from "@/lib/data/notes-data"
import { Button } from "@/components/ui/button"
import NoteBreadcrumb from "./note-breadcrumb"
import { motion } from 'framer-motion';
import { appear } from "@/lib/animations"

interface SemesterViewProps {
    course: string
    semester: string
}

export default function SemesterView({ course, semester }: SemesterViewProps) {
    const router = useRouter()
    const subjects = getSubjectsBySemester(course, semester)

    const handleRefresh = () => {
        window.location.reload()
    }

    return (
        <div className="flex flex-1 flex-col">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-secondary">
                            <ChevronLeft size={20} />
                        </Button>
                        <h1 className="text-2xl font-bold text-foreground">{semester}</h1>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleRefresh} className="hover:bg-secondary">
                        <RefreshCw size={20} />
                    </Button>
                </div>

                {/* Breadcrumb */}
                <NoteBreadcrumb
                    segments={[
                        { label: "Notes", href: "/notes" },
                        { label: course, href: `/notes/${encodeURIComponent(course)}` },
                        { label: semester, href: "#" },
                    ]}
                />
            </div>

            {/* Content */}
            <motion.div
                variants={appear}
                exit="exit"
                animate="visible"
                initial="hidden"
                className="flex-1 overflow-y-auto p-6">
                {subjects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <BookOpen size={48} className="mb-4 text-muted-foreground" />
                        <p className="text-lg font-semibold text-foreground">No Files Found</p>
                        <p className="text-sm text-muted-foreground">No subjects available in this semester.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground mb-4">SELECT A SUBJECT</p>
                        {subjects.map((subject) => (
                            <Link
                                key={subject}
                                href={`/notes/${encodeURIComponent(course)}/${encodeURIComponent(semester)}/${encodeURIComponent(subject)}`}
                                className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:bg-secondary hover:border-primary cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <BookOpen size={24} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{subject}</p>
                                        <p className="text-sm text-muted-foreground">Click to view files</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-muted-foreground" />
                            </Link>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    )
}
