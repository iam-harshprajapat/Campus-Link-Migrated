"use client"

import { useState } from "react"
import { Heart, MessageCircle } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface PostProps {
  id: number
  author: string
  handle: string
  avatar: string
  timestamp: string
  image: string
  caption: string
  likes: number
}

const MIN_IMAGE_HEIGHT = 300

export default function Post({
  id,
  author,
  handle,
  avatar,
  timestamp,
  image,
  caption,
  likes: initialLikes,
}: PostProps) {
  const [expanded, setExpanded] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikes)

  const shouldTruncate = caption.length > 200
  const displayCaption = expanded ? caption : caption.slice(0, 200)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <article className="border-b border-border border pb-6 mb-6 transition-all hover:bg-muted/30 -mx-4 px-4 py-4 rounded-lg">
      {/* Post Header */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatar || "/placeholder.svg"} alt={author} />
          <AvatarFallback>{author.split(" ")[0][0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground">{author}</p>
            <p className="text-sm text-muted-foreground">{handle}</p>
          </div>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
      </div>

      {/* Post Image */}
      <div className="mb-4 overflow-hidden rounded-xl bg-muted">
        <img
          src={image || "/placeholder.svg"}
          alt={`Post by ${author}`}
          className="w-full object-cover"
          style={{
            minHeight: `${MIN_IMAGE_HEIGHT}px`,
            maxHeight: "600px",
          }}
        />
      </div>

      {/* Caption Section */}
      <div className="mb-4">
        <p className="text-foreground text-sm leading-relaxed">
          <span className="font-semibold">{author}</span>{" "}
          <span className="text-muted-foreground">{displayCaption}</span>
          {shouldTruncate && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="ml-1 font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              more
            </button>
          )}
          {expanded && shouldTruncate && (
            <button
              onClick={() => setExpanded(false)}
              className="ml-1 font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              less
            </button>
          )}
        </p>
      </div>

      {/* Post Footer */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="text-xs font-semibold text-muted-foreground">{likeCount.toLocaleString()} likes</div>
        <div className="flex gap-8">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <Heart
              size={18}
              className={`transition-all ${liked ? "fill-primary text-primary" : "group-hover:fill-primary/20"}`}
            />
            <span className="text-sm font-medium">Like</span>
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group">
            <MessageCircle size={18} className="group-hover:fill-accent/20" />
            <span className="text-sm font-medium">Comment</span>
          </button>
        </div>
      </div>
    </article>
  )
}
