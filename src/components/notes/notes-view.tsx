"use client"

import Link from "next/link"
import { BookOpen, FileUp, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'
import { appear, fade_bottom, staggerParent } from "@/lib/animations"
import { useState } from "react"
import UploadModal from "./upload-modal"
import { useCourses } from "@/hooks/notes/useCourses"
import NoteSkeleton from "../skeletons/notes/noteSkeleton"

export default function NotesView() {
    const [showUploadModal, setShowUploadModal] = useState(false)

    const { data: courses, isLoading } = useCourses()
    const handleRefresh = () => {
        window.location.reload()
    }


    const list: string[] = courses ?? [] // <-- safe fallback

    return (
        <>
            <motion.div
                variants={appear}
                exit="exit"
                animate="visible"
                initial="hidden"
                className="flex flex-1 flex-col"
            >
                {/* Header */}
                <div className="border-b border-border bg-card">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <BookOpen size={24} className="text-primary" />
                            <h1 className="text-2xl font-bold text-foreground">Notes</h1>
                        </div>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="text-primary hover:bg-primary hover:text-white p-1 rounded-sm"
                            >
                                <FileUp size={20} />
                            </button>
                            <button
                                onClick={handleRefresh}
                                className="text-primary hover:bg-primary hover:text-white p-1 rounded-sm"
                            >
                                <RefreshCw size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {
                        isLoading ? (
                            Array.from({ length: 4 }).map((_, i) => <NoteSkeleton key={i} />)
                        ) : (


                            list.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <BookOpen size={48} className="mb-4 text-muted-foreground" />
                                    <p className="text-lg font-semibold text-foreground">No Files Found</p>
                                    <p className="text-sm text-muted-foreground">
                                        No notes available yet.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-sm font-semibold text-muted-foreground mb-4">
                                        SELECT A COURSE
                                    </p>

                                    <motion.div
                                        variants={staggerParent}
                                        initial="hidden"
                                        animate="visible"
                                        className="grid gap-4"
                                    >
                                        {list.map((course: string) => (
                                            <Link
                                                key={course}
                                                href={`/notes/${encodeURIComponent(course)}`}
                                            >
                                                <motion.div
                                                    variants={fade_bottom}
                                                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:bg-secondary hover:border-primary cursor-pointer"
                                                >
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                                        <BookOpen size={24} className="text-primary" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-foreground">
                                                            {course}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Click to view semesters
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </motion.div>
                                </div>
                            )

                        )}
                </div>
            </motion.div>

            <UploadModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                level="courses"
            />
        </>
    )
}
