"use client"

import Navbar from "@/components/layout/navbar"
import Sidebar from "@/components/layout/sidebar"
import BottomNav from "@/components/layout/bottom-nav"
import NotesView from "@/components/notes/notes-view"
import { motion } from 'framer-motion';

export default function NotesPage() {


  return (
    <div
      className="h-screen w-full bg-background">
      <Sidebar />
      <div className="md:block hidden">
        <Navbar />
      </div>
      <div className="md:ml-64">
        <NotesView />
      </div>
      <BottomNav />
    </div>
  )
}
