"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import SearchModal from "./search-modal"
import { useRouter, usePathname } from "next/navigation"
import { RiBookOpenFill, RiBookOpenLine } from "react-icons/ri"
import { GoHome, GoHomeFill } from 'react-icons/go'
import { HiOutlineUsers, HiUsers } from 'react-icons/hi2'
import { BiSolidZap } from "react-icons/bi"
import { LuZap } from "react-icons/lu"

const navItems = [
  { icon: RiBookOpenLine, activeIcon: RiBookOpenFill, label: "Notes", id: "notes", href: "/notes" },
  { icon: Search, activeIcon: Search, label: "Search", id: "search", href: "#" },
  { icon: GoHome, activeIcon: GoHomeFill, label: "Home", id: "home", href: "/feed" },
  { icon: HiOutlineUsers, activeIcon: HiUsers, label: "Connect", id: "connect", href: "#" },
  { icon: LuZap, activeIcon: BiSolidZap, label: "Updates", id: "updates", href: "#" },
]

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  const getActiveId = () => {
    if (pathname === "/feed") return "home"
    if (pathname.startsWith("/notes")) return "notes"
    return "home"
  }

  const activeId = getActiveId()

  const handleNavClick = (id: string, href: string) => {
    if (id === "search") {
      setSearchOpen(true)
      return
    }
    router.push(href)
  }

  return (
    <>
      <nav className="bg-card border-t border-border h-16 w-full fixed bottom-0 flex justify-evenly items-center md:hidden shadow-md ">
        {navItems.map((item) => {
          const isActive = activeId === item.id
          const Icon = isActive ? item.activeIcon : item.icon

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.href)}
              className={`size-12 flex justify-center items-center gap-0.5 rounded-full flex-col transition-all ${isActive ? "scale-105 text-primary" : ""}}`}
            >
              <Icon size={24} />
              <label className="text-xs">{item.label}</label>
            </button>
          )
        })}
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
