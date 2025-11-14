"use client"

import { useParams } from "next/navigation"
import Navbar from "@/components/layout/navbar"
import Sidebar from "@/components/layout/sidebar"
import BottomNav from "@/components/layout/bottom-nav"
import CourseView from "@/components/notes/course-view"
import { useState } from "react"

export default function CoursePage() {
    const params = useParams()
    const course = decodeURIComponent(params.course as string)

    return (
        <div className="flex h-screen bg-background">
            <Sidebar />

            <div className="md:block hidden">
                <Navbar />
            </div>

            <CourseView course={course} />

            <BottomNav />
        </div>
    )
}
