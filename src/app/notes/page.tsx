"use client"

import Navbar from "@/components/layout/navbar"
import Sidebar from "@/components/layout/sidebar"
import BottomNav from "@/components/layout/bottom-nav"
import NotesView from "@/components/notes/notes-view"

export default function NotesPage() {


  return (
    <div
      className="flex h-screen bg-background">
      <Sidebar />

      <div className="md:block hidden">
        <Navbar />
      </div>

      <NotesView />
      <BottomNav />
    </div>
  )
}
