"use client"

import { useState } from "react"
import { Menu, Search, Bell, Mail, ChevronDown } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  onMenuClick: () => void
}

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <nav className="md:sticky mobile:static top-0 z-50 border-b border-border bg-card shadow-sm">
      <div className="flex h-16 items-center justify-between px-2">
        {/* Left: Menu Button & Logo */}
        <div className="flex gap-1 items-center">
          <div className="size-8 bg-primary rounded-sm flex items-center justify-center text-white">CL</div>
          <h1 className="text-primary font-sans font-bold md:text-lg">Campus Link</h1>
        </div>

        {/* Center: Search Bar */}
        <div
          className={`hidden items-center gap-2 rounded-full border transition-all lg:flex ${
            searchFocused ? "border-primary bg-background" : "border-border bg-muted hover:bg-secondary"
          } px-4 py-2`}
        >
          <Search size={18} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts, people..."
            className="w-64 bg-transparent text-sm outline-none placeholder:text-muted-foreground focus:outline-none text-black"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Right: Icons & Profile */}
        <div className="flex items-center gap-4">
          <button className="relative text-muted-foreground hover:text-foreground transition-colors">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent"></span>
          </button>

          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail size={20} />
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full hover:bg-secondary transition-colors p-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/student-profile.png" />
                  <AvatarFallback>SU</AvatarFallback>
                </Avatar>
                <ChevronDown size={16} className="text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/diverse-student-profiles.png" />
                  <AvatarFallback>SU</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm text-foreground">Sarah University</p>
                  <p className="text-xs text-muted-foreground">@sarahuniv</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
