"use client"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Download, RefreshCw, ChevronLeft, File, FileUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import NoteBreadcrumb from "./note-breadcrumb"
import { motion } from 'framer-motion'
import { appear } from "@/lib/animations"
import UploadModal from "./upload-modal"
import { useNotes } from "@/hooks/notes/useNotes"
import FileSkeleton from "../skeletons/notes/fileSkeleton"
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import PdfIcon from "@/assets/fileIcons/PDF.svg"
import DocxIcon from "@/assets/fileIcons/DOCX.svg"
import PptIcon from "@/assets/fileIcons/PPT.svg"
import XlsIcon from "@/assets/fileIcons/XLS.svg"
import JpgIcon from "@/assets/fileIcons/JPG.svg"
import DefaultIcon from "@/assets/fileIcons/default.svg"
import PngIcon from "@/assets/fileIcons/PNG.svg"



interface SubjectViewProps {
    course: string
    semester: string
    subject: string
}

type SortType = "name" | "date" | "size" | "type"
type SortOrder = "asc" | "desc"

export default function SubjectView({ course, semester, subject }: SubjectViewProps) {
    dayjs.extend(relativeTime)
    dayjs.extend(utc)
    dayjs.extend(timezone)

    const router = useRouter()
    const [showUploadModal, setShowUploadModal] = useState(false)

    // sorting
    const [sortBy, setSortBy] = useState<SortType>("date")
    const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

    const { data: files, isLoading } = useNotes(course, semester, subject)

    const list = files ?? []

    const sortedFiles = [...list].sort((a, b) => {
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

    const handleRefresh = () => window.location.reload()

    const getFileIcon = (fileType: string) => {
        switch (fileType) {
            case "pdf":
                return <Image src={PdfIcon} alt="pdf" height={26} width={26} />
            case "docx":
                return <Image src={DocxIcon} alt="pdf" height={26} width={26} />
            case "ppt":
                return <Image src={PptIcon} alt="pdf" height={26} width={26} />
            case "xlsx":
                return <Image src={XlsIcon} alt="pdf" height={26} width={26} />
            case "xls":
                return <Image src={XlsIcon} alt="pdf" height={26} width={26} />
            case "jpg":
                return <Image src={JpgIcon} alt="pdf" height={26} width={26} />
            case "jpeg":
                return <Image src={JpgIcon} alt="pdf" height={26} width={26} />
            case "png":
                return <Image src={PngIcon} alt="pdf" height={26} width={26} />
            default:
                return <Image src={DefaultIcon} alt="pdf" height={26} width={26} />
        }
    }


    return (
        <>
            <div className="flex flex-1 flex-col pb-16">
                {/* Header */}
                <div className="border-b border-border bg-card">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" onClick={() => router.back()} className="hover:bg-secondary">
                                <ChevronLeft size={20} />
                            </Button>
                            <h1 className="text-2xl font-bold text-foreground">{subject}</h1>
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

                    {/* Breadcrumb */}
                    <NoteBreadcrumb
                        segments={[
                            { label: "Notes", href: "/notes" },
                            { label: course, href: `/notes/${encodeURIComponent(course)}` },
                            { label: semester, href: `/notes/${encodeURIComponent(course)}/${encodeURIComponent(semester)}` },
                            { label: subject, href: "#" },
                        ]}
                    />
                </div>
                {/* Sorting Ribbon */}
                {sortedFiles.length > 0 && (
                    <div className="border-t border-border px-6 py-3 flex items-center gap-3 bg-muted/30">
                        <span className="text-sm text-muted-foreground font-medium">Sort by:</span>

                        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortType)}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Sort by" />
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
                {/* Content */}
                <motion.div
                    variants={appear}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex-1 overflow-y-auto p-6"
                >
                    {isLoading ? (
                        // 🔥 skeletons
                        Array.from({ length: 5 }).map((_, i) => <FileSkeleton key={i} />)

                    ) : sortedFiles.length === 0 ? (
                        // 🔥 empty
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <File size={48} className="mb-4 text-muted-foreground" />
                            <p className="text-lg font-semibold text-foreground">No Files Found</p>
                            <p className="text-sm text-muted-foreground">No files available in this subject yet.</p>
                        </div>

                    ) : (
                        // 🔥 file list
                        <div className="space-y-2">
                            {sortedFiles.map((file) => (
                                <div
                                    key={file._id}
                                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:bg-secondary transition-all"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                        {/* <FileTypeIcon type={file.fileType} size={26} /> */}
                                        {/* <Image src={PdfIcon} alt={file.fileType} /> */}
                                        {getFileIcon(file.fileType)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-foreground truncate">{file.title}</p>

                                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                            <span>{file.uploadedBy?.name || "Unknown User"}</span>
                                            <span>•</span>
                                            <span>{dayjs.utc(file.createdAt).tz(dayjs.tz.guess()).fromNow()}</span>
                                            <span>•</span>
                                            <span>{file.fileSize}</span>
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
            </div >

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
