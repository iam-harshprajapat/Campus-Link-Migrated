'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'

interface UploadModalProps {
    isOpen: boolean
    onClose: () => void
    course?: string
    semester?: string
    subject?: string
    level: 'courses' | 'semesters' | 'subjects' | 'files'
}

interface FormData {
    courseName: string
    semesterName: string
    subjectName: string
    notesTitle: string
    file: File | null
}

export default function UploadModal({
    isOpen,
    onClose,
    course,
    semester,
    subject,
    level,
}: UploadModalProps) {
    const [formData, setFormData] = useState<FormData>({
        courseName: '',
        semesterName: '',
        subjectName: '',
        notesTitle: '',
        file: null,
    })

    const [showWarning, setShowWarning] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    // detect mobile (<= 768px)
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)')
        const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(Boolean(e.matches))
        handler(mq) // set initial
        if (typeof mq.addEventListener === 'function') {
            mq.addEventListener('change', handler)
            return () => mq.removeEventListener('change', handler)
        } else {
            // fallback for older browsers
            // @ts-ignore
            mq.addListener(handler)
            // @ts-ignore
            return () => mq.removeListener(handler)
        }
    }, [])

    // lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            const prev = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            return () => {
                document.body.style.overflow = prev
            }
        }
    }, [isOpen])

    // Check if form has any data
    const hasFormData = () => {
        return (
            formData.courseName.trim() !== '' ||
            formData.semesterName.trim() !== '' ||
            formData.subjectName.trim() !== '' ||
            formData.notesTitle.trim() !== '' ||
            formData.file !== null
        )
    }

    // Determine which fields to show based on level
    const getVisibleFields = () => {
        switch (level) {
            case 'courses':
                return ['courseName', 'semesterName', 'subjectName', 'notesTitle', 'file']
            case 'semesters':
                return ['semesterName', 'subjectName', 'notesTitle', 'file']
            case 'subjects':
                return ['subjectName', 'notesTitle', 'file']
            case 'files':
                return ['notesTitle', 'file']
            default:
                return []
        }
    }

    const visibleFields = getVisibleFields()
    useEffect(() => {
        if (isOpen) {
            window.history.pushState({ modalOpen: true }, '')
        }
    }, [isOpen])

    useEffect(() => {
        const handlePop = () => {
            if (isOpen) {
                if (hasFormData()) {
                    // Show warning instead of closing
                    setShowWarning(true)

                    // Re-push state so back stays inside modal
                    window.history.pushState({ modalOpen: true }, '')
                } else {
                    // No form data → close modal
                    handleActualClose()
                }
            }
        }

        window.addEventListener('popstate', handlePop)
        return () => window.removeEventListener('popstate', handlePop)
    }, [isOpen, formData])


    // Handle close with warning
    const handleClose = () => {
        if (hasFormData()) {
            setShowWarning(true)
        } else {
            handleActualClose()
        }
    }

    const handleActualClose = () => {
        setIsClosing(true)
        // keep small delay for motion exit to play nicely
        setTimeout(() => {
            setFormData({
                courseName: '',
                semesterName: '',
                subjectName: '',
                notesTitle: '',
                file: null,
            })
            setIsClosing(false)
            setShowWarning(false)
            onClose()
        }, 220)
    }

    const handleReset = () => {
        setFormData({
            courseName: '',
            semesterName: '',
            subjectName: '',
            notesTitle: '',
            file: null,
        })
    }

    const handleUpload = async () => {
        if (!formData.file) {
            alert('Please select a file')
            return
        }

        // API integration will be handled here
        console.log('Upload:', formData)
        handleActualClose()
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData((prev) => ({
            ...prev,
            file,
        }))
    }

    // Framer Motion variants
    const mobileVariants = {
        hidden: { y: '100%' },
        visible: { y: 0 },
        exit: { y: '100%' },
    }

    const desktopVariants = {
        hidden: { opacity: 0, scale: 0.98, y: '-10px' },
        visible: { opacity: 1, scale: 1, y: '0' },
        exit: { opacity: 0, scale: 0.98, y: '-10px' },
    }

    // wrapper animation timing
    const motionTransition = { type: 'spring', stiffness: 320, damping: 30 }

    return (
        <>
            <AnimatePresence>
                {isOpen && !isClosing && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            onClick={handleClose}
                            className="fixed inset-0 z-40 bg-black/50"
                        />

                        {/* Modal */}
                        <motion.div
                            key="modal"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={isMobile ? mobileVariants : desktopVariants}
                            transition={isMobile ? { duration: 0.28 } : { duration: 0.18 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`
    minimal-scroll fixed z-50 bg-card shadow-2xl

    ${isMobile
                                    ? 'inset-x-0 bottom-0 rounded-t-2xl max-h-[90vh] overflow-auto'
                                    : 'md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:w-full md:max-w-md md:max-h-[90vh] overflow-auto'
                                }
  `}
                        >
                            {/* Header */}
                            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-6 py-4 rounded-t-2xl md:rounded-t-2xl">
                                <h2 className="text-lg font-semibold text-foreground">Upload Notes</h2>
                                <button
                                    onClick={handleClose}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="Close upload modal"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="overflow-y-auto px-6 py-6">
                                <div className="space-y-4">
                                    {/* Course Name */}
                                    {visibleFields.includes('courseName') && (
                                        <div>
                                            <label className="text-sm font-medium text-foreground">Course Name</label>
                                            <Input
                                                type="text"
                                                placeholder="Enter course name"
                                                value={formData.courseName}
                                                onChange={(e) => handleInputChange('courseName', e.target.value)}
                                                className="mt-2"
                                            />
                                        </div>
                                    )}

                                    {/* Semester Name */}
                                    {visibleFields.includes('semesterName') && (
                                        <div>
                                            <label className="text-sm font-medium text-foreground">Semester Name</label>
                                            <Input
                                                type="text"
                                                placeholder="Enter semester (e.g., 1st Semester)"
                                                value={formData.semesterName}
                                                onChange={(e) => handleInputChange('semesterName', e.target.value)}
                                                className="mt-2"
                                            />
                                        </div>
                                    )}

                                    {/* Subject Name */}
                                    {visibleFields.includes('subjectName') && (
                                        <div>
                                            <label className="text-sm font-medium text-foreground">Subject Name</label>
                                            <Input
                                                type="text"
                                                placeholder="Enter subject name"
                                                value={formData.subjectName}
                                                onChange={(e) => handleInputChange('subjectName', e.target.value)}
                                                className="mt-2"
                                            />
                                        </div>
                                    )}

                                    {/* Notes Title */}
                                    {visibleFields.includes('notesTitle') && (
                                        <div>
                                            <label className="text-sm font-medium text-foreground">Notes Title</label>
                                            <Input
                                                type="text"
                                                placeholder="Enter notes title"
                                                value={formData.notesTitle}
                                                onChange={(e) => handleInputChange('notesTitle', e.target.value)}
                                                className="mt-2"
                                            />
                                        </div>
                                    )}

                                    {/* File Selector */}
                                    {visibleFields.includes('file') && (
                                        <div>
                                            <label className="text-sm font-medium text-foreground">Select File</label>
                                            <div className="mt-2 rounded-lg border-2 border-dashed border-border px-4 py-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    id="file-input"
                                                />
                                                <label htmlFor="file-input" className="cursor-pointer">
                                                    <div className="text-sm text-muted-foreground">
                                                        {formData.file ? (
                                                            <span className="text-primary font-medium">{formData.file.name}</span>
                                                        ) : (
                                                            <>
                                                                <p>Drag and drop your file here, or click to select</p>
                                                                <p className="text-xs mt-1">PDF, DOC, DOCX, TXT are supported</p>
                                                            </>
                                                        )}
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer / Actions */}
                            <div className="sticky bottom-0 flex gap-3 border-t border-border bg-card px-6 py-4 rounded-b-2xl md:rounded-b-2xl">
                                <Button variant="outline" onClick={() => handleClose()} className="flex-1">
                                    Cancel
                                </Button>
                                <Button variant="outline" onClick={handleReset} className="flex-1">
                                    Reset
                                </Button>
                                <Button onClick={handleUpload} className="flex-1">
                                    Upload
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Warning Dialog */}
            {showWarning && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowWarning(false)} />
                    <div className="relative bg-card rounded-lg shadow-lg p-6 max-w-sm w-full animate-in fade-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Discard changes?</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            You have unsaved changes. Are you sure you want to discard them?
                        </p>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setShowWarning(false)} className="flex-1">
                                Keep Editing
                            </Button>
                            <Button variant="destructive" onClick={handleActualClose} className="flex-1">
                                Discard
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
