"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Search } from "lucide-react"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (isOpen) {
      // Disable background scroll
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      // Re-enable scroll
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }

    return () => {
      // Cleanup in case modal closes unexpectedly
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

useEffect(() => {
  if (!isOpen) return;

  window.history.pushState(null, "", window.location.href);

  const handlePopState = () => {
    onClose();
    // Prevent actual navigation after closing modal
    window.history.pushState(null, "", window.location.href);
  };

  window.addEventListener("popstate", handlePopState);
  return () => window.removeEventListener("popstate", handlePopState);
}, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose} />}

      {/* Search Modal */}
      <div
        className={`fixed h-screen w-screen top-0 bottom-0 z-50 md:hidden flex flex-col bg-background transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors duration-200">
            <ArrowLeft size={24} className="text-foreground" />
          </button>
          <div className="flex-1 flex items-center bg-muted rounded-lg px-3 py-2 gap-2">
            <Search size={20} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts, people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {searchQuery ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Search results for "{searchQuery}"</p>
              {/* Placeholder for search results */}
              <div className="text-center py-12 text-muted-foreground">No results found</div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>Type to search posts and people</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
