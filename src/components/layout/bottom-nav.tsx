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
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white">
      <div className="flex items-center justify-around px-4 py-3 relative">
        {navItems.map((item) => {
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="flex flex-col items-center justify-center transition-all duration-300"
            >
              <div
                className={`flex items-center justify-center transition-all duration-300 ${isActive
                    ? "w-14 h-14 rounded-full text-primary-foreground shadow-md scale-100 bottom-6 bg-primary absolute"
                    : "w-10 h-10 text-muted-foreground hover:text-foreground scale-100"
                  }`}
              >
                <item.icon size={24} />
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
