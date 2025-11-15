"use client"

import { useState } from "react"
import { BookOpen, Search, Home, Users, Zap } from "lucide-react"
import SearchModal from "./search-modal"
import { useRouter, usePathname } from "next/navigation"

const navItems = [
  { icon: BookOpen, label: "Notes", id: "notes", href: "/notes" },
  { icon: Search, label: "Search", id: "search", href: "#" },
  { icon: Home, label: "Home", id: "home", href: "/feed" },
  { icon: Users, label: "Connect", id: "connect", href: "#" },
  { icon: Zap, label: "Updates", id: "updates", href: "#" },
]
export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname();
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
    }
    router.push(href);
  }

  return (
    <>
      <nav className="bg-white h-16 w-full fixed bottom-0 flex justify-evenly items-center md:hidden">
        {
          navItems.map((item) => {
            const isActive = activeId === item.id
            return (
              <button
                onClick={() => handleNavClick(item.id, item.href)}
                key={item.id} className={`size-12 flex justify-center gap-1 items-center text-muted-foreground rounded-full flex-col ${isActive ? "text-white scale-125 transition-all ease-in-out duration-300 bg-primary" : ""}`}>
                <item.icon size={24} />
                {
                  item.id != activeId &&
                  <label htmlFor={item.label} className="text-xs">{item.label}</label>
                }
              </button>
            )
          })
        }
      </nav>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
