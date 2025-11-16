"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Download, RefreshCw, ChevronLeft, File, FileText, Image, FileUp } from 'lucide-react'
import { getFilesBySubject } from "@/lib/data/notes-data"
import { Button } from "@/components/ui/button"
import { FaFilePdf, FaFilePowerpoint, FaFileWord } from 'react-icons/fa';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import NoteBreadcrumb from "./note-breadcrumb"
import { motion } from 'framer-motion';
import { appear } from "@/lib/animations"
import UploadModal from "./upload-modal"

interface SubjectViewProps {
    course: string
    semester: string
    subject: string
}

type SortType = "name" | "date" | "size" | "type"
type SortOrder = "asc" | "desc"

export default function SubjectView({ course, semester, subject }: SubjectViewProps) {
    const router = useRouter()
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [sortBy, setSortBy] = useState<SortType>("date")
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

    const files = getFilesBySubject(course, semester, subject)

    const sortedFiles = [...files].sort((a, b) => {
        let comparison = 0

        switch (sortBy) {
            case "name":
                comparison = a.title.localeCompare(b.title)
                break
            case "date":
                comparison = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
                break
            case "size":
                comparison = a.fileSize - b.fileSize
                break
            case "type":
                comparison = a.fileType.localeCompare(b.fileType)
                break
        }

        return sortOrder === "asc" ? comparison : -comparison
    })

    const handleRefresh = () => {
        window.location.reload()
    }

    const getFileIcon = (fileType: string) => {
        switch (fileType) {
            case "pdf":
                return <FaFilePdf size={20} className="text-red-500" />
            case "docx":
                return <FaFileWord size={20} className="text-blue-500" />
            case "ppt":
                return <FaFilePowerpoint size={20} className="text-orange-500" />
            case "jpg":
            case "png":
            case "jpeg":
                return <Image size={20} className="text-purple-500" />
            default:
                return <File size={20} className="text-muted-foreground" />
        }
    }

    const formatFileSize = (sizeInMB: number) => {
        if (sizeInMB < 1) return `${(sizeInMB * 1024).toFixed(0)} KB`
        return `${sizeInMB.toFixed(1)} MB`
    }

    const getRelativeTime = (date: string) => {
        const now = new Date()
        const uploadDate = new Date(date)
        const diffMs = now.getTime() - uploadDate.getTime()
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

        if (diffDays === 0) return "Today"
        if (diffDays === 1) return "Yesterday"
        if (diffDays < 7) return `${diffDays} days ago`
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
        return `${Math.floor(diffDays / 30)} months ago`
    }

    return (
        <>
            <div
                className="flex flex-1 flex-col">
                {/* Header */}
                <div className="border-b border-border bg-card">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-secondary">
                                <ChevronLeft size={20} />
                            </Button>
                            <h1 className="text-2xl font-bold text-foreground">{subject}</h1>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="text-primary hover:bg-primary hover:text-white p-1 cursor-pointer rounded-sm flex items-center">
                                <FileUp size={20} />
                            </button>
                            <button onClick={handleRefresh} className="text-primary hover:bg-primary hover:text-white p-1 cursor-pointer rounded-sm flex items-center">
                                <RefreshCw size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Breadcrumb */}
                    <NoteBreadcrumb
                        segments={[
                            { label: "Notes", href: "/notes" },
                            { label: course, href: `/notes/${encodeURIComponent(course)}` },
                            { label: semester, href: `/notes/${encodeURIComponent(course)}/${encodeURIComponent(semester)}` },
                            { label: subject, href: "#" },
                        ]}
                    />

                    {/* Sorting Ribbon */}
                    {sortedFiles.length > 0 && (
                        <div className="border-t border-border px-6 py-3 flex items-center gap-3 bg-muted/30">
                            <span className="text-sm text-muted-foreground font-medium">Sort by:</span>
                            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortType)}>
                                <SelectTrigger className="w-40">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">Name</SelectItem>
                                    <SelectItem value="date">Upload Date</SelectItem>
                                    <SelectItem value="size">File Size</SelectItem>
                                    <SelectItem value="type">File Type</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                                className="ml-auto"
                            >
                                {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
                            </Button>
                        </div>
                    )}
                </div>

                {/* Content */}
                <motion.div variants={appear}
                    exit="exit"
                    animate="visible"
                    initial="hidden"
                    className="flex-1 overflow-y-auto p-6">
                    {sortedFiles.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <File size={48} className="mb-4 text-muted-foreground" />
                            <p className="text-lg font-semibold text-foreground">No Files Found</p>
                            <p className="text-sm text-muted-foreground">No files available in this subject yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {sortedFiles.map((file) => (
                                <div
                                    key={file._id}
                                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:bg-secondary transition-all"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                        {getFileIcon(file.fileType)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-foreground truncate">{file.title}</p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                            <span>{file.uploadedBy.name}</span>
                                            <span>•</span>
                                            <span>{getRelativeTime(file.uploadedAt)}</span>
                                            <span>•</span>
                                            <span>{formatFileSize(file.fileSize)}</span>
                                        </div>
                                    </div>

                                    <a
                                        href={file.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0"
                                    >
                                        <Button variant="ghost" size="icon" className="hover:bg-primary hover:text-primary-foreground">
                                            <Download size={18} />
                                        </Button>
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
            <UploadModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                level="files"
                course={course}
                semester={semester}
                subject={subject}
            />
        </>
    )
}
