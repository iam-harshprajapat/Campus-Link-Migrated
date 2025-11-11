"use client"

import { Home, User, BookOpen, Users, Zap } from "lucide-react"

const menuItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: User, label: "Profile", href: "#" },
  { icon: BookOpen, label: "Notes", href: "#" },
  { icon: Users, label: "Connect", href: "#" },
  { icon: Zap, label: "Updates", href: "#" },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col border-r border-border bg-sidebar p-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold">
          CL
        </div>
        <span className="font-bold text-sidebar-foreground text-lg">Campus Link</span>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-3 mt-6">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sidebar-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-sidebar-border pt-4">
        <p className="text-xs text-sidebar-foreground/60">© 2025 Campus Link. All rights reserved.</p>
      </div>
    </aside>
  )
}
