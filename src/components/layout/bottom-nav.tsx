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
    <nav className="bg-white h-16 w-full fixed bottom-0 flex justify-evenly items-center md:hidden">
      {
        navItems.map((item) => {
          const isActive = activeId === item.id
          return (
            <button 
            onClick={()=>{setActiveId(item.id)}}
            key={item.id} className={`size-12 flex justify-center gap-1 items-center text-muted-foreground rounded-full flex-col ${isActive?"-translate-y-6 text-white scale-125 transition-all ease-in-out duration-300 bg-primary":""}`}>
              <item.icon size={24} />
              {
                item.id!=activeId &&
              <label htmlFor={item.label} className="text-xs">{item.label}</label>
              }
            </button>
          )
        })
      }
    </nav>
  )
}
