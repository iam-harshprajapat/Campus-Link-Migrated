"use client"

import { useState } from "react"
import Navbar from "@/components/layout/navbar"
import Sidebar from "@/components/layout/sidebar"
import BottomNav from "@/components/layout/bottom-nav"
import SubjectView from "@/components/notes/subject-view"
import { useParams } from "next/navigation"

export default function SubjectPage() {
    const params = useParams();
    const course = decodeURIComponent(params.course as string);
    const semester = decodeURIComponent(params.semester as string);
    const subject = decodeURIComponent(params.subject as string);
    return (
        <div className="w-full h-screen bg-background">
            <Sidebar />
            <div className="md:block hidden">
                <Navbar />
            </div>
            <div className="md:ml-64">
                <SubjectView
                    course={decodeURIComponent(course)}
                    semester={decodeURIComponent(semester)}
                    subject={decodeURIComponent(subject)}
                />
            </div>
            <BottomNav />
        </div>
    )
}
