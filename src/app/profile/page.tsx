"use client"

import { useState } from "react"
import Navbar from "@/components/layout/navbar"
import Sidebar from "@/components/layout/sidebar"
import ProfilePage from "@/components/profile/profile-page"

export default function Profile() {
  return (
   <div className="h-screen bg-background w-full">
      <Sidebar/>
      <div className="hidden md:block">
       <Navbar/>
      </div>
      <div className="md:ml-64">
        <ProfilePage/>
      </div>
   </div>
  )
}
