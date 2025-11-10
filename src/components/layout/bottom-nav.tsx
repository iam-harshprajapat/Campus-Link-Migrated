"use client"

import { useState } from "react"
import { BookOpen, Search, Home, Users, Zap } from "lucide-react"

const navItems = [
  { icon: BookOpen, label: "Notes", id: "notes" },
  { icon: Search, label: "Search", id: "search" },
  { icon: Home, label: "Home", id: "home" },
  { icon: Users, label: "Connect", id: "connect" },
  { icon: Zap, label: "Updates", id: "updates" },
]
export default function BottomNav() {
  const [activeId, setActiveId] = useState("home")

  return (
    <nav className="bg-white h-16 w-full fixed bottom-0 flex justify-evenly items-center">
      {
        navItems.map((item) => {
          const isActive = activeId === item.id
          return (
            <button 
            onClick={()=>{setActiveId(item.id)}}
            key={item.id} className={`size-14 flex justify-center items-center rounded-full ${isActive?"-translate-y-6 text-white scale-125 ease-in-out duration-300 bg-primary":""}`}>
              <item.icon size={30} />
            </button>
          )
        })
      }
    </nav>
  )
}
