"use client"

import { useState } from "react"
import Navbar from "@/components/layout/navbar"
import Sidebar from "@/components/layout/sidebar"
import Feed from "@/components/feed/feed"
import BottomNav from "@/components/layout/bottom-nav"

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <Navbar />

        {/* Feed with padding for mobile bottom nav */}
        <div className="md:pb-0 pb-20">
          <Feed />
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
