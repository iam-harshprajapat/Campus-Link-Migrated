"use client"
import { useParams } from "next/navigation"
import Navbar from "@/components/layout/navbar"
import Sidebar from "@/components/layout/sidebar"
import BottomNav from "@/components/layout/bottom-nav"
import SemesterView from "@/components/notes/semester-view"

export default function SemesterPage() {
    const params = useParams()
    const course = decodeURIComponent(params.course as string)
    const semester = decodeURIComponent(params.semester as string)
    return (
        <div className="flex h-screen bg-background">
            <Sidebar />

            <div className="md:block hidden">
                <Navbar />
            </div>
            <SemesterView course={course} semester={decodeURIComponent(semester)} />
            <BottomNav />
        </div>
    )
}
