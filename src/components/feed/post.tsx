"use client";

import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PostProps {
  _id: string;
  user: string;
  createdAt: string;
  image: string | null;
  caption: string | null;
  likes: string[];
}

const MIN_IMAGE_HEIGHT = 300;

// Format date to relative time
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  
  return date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric", 
    year: "numeric" 
  });
}

export default function Post({
  _id,
  user,
  createdAt,
  image,
  caption,
  likes: initialLikes,
}: PostProps) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const captionText = caption || "";
  const shouldTruncate = captionText.length > 200;
  const displayCaption = expanded ? captionText : captionText.slice(0, 200);

  const handleLike = () => {
    if (liked) {
      setLikes((prev) => prev.slice(0, -1));
    } else {
      setLikes((prev) => [...prev, "mockUserId"]);
    }
    setLiked(!liked);
  };

  return (
    <article className="border-b border-border pb-6 mb-6 transition-all hover:bg-muted/30 -mx-4 px-4 py-4 rounded-lg">
      {/* Post Header */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={"/placeholder.svg"} alt={user} />
          <AvatarFallback>{user?.[0]?.toUpperCase() || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{user}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(createdAt)}
          </p>
        </div>
      </div>

      {/* Post Image */}
      {image && (
        <div className="mb-4 overflow-hidden rounded-xl bg-muted">
          <img
            src={image}
            alt={`Post by ${user}`}
            className="w-full object-cover"
            style={{
              minHeight: `${MIN_IMAGE_HEIGHT}px`,
              maxHeight: "600px",
            }}
          />
        </div>
      )}

      {/* Caption Section */}
      {captionText && (
        <div className="mb-4">
          <p className="text-foreground text-sm leading-relaxed">
            <span className="font-semibold">{user}</span>{" "}
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
      )}

      {/* Post Footer */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <div className="text-xs font-semibold text-muted-foreground">
          {likes.length.toLocaleString()} {likes.length === 1 ? 'like' : 'likes'}
        </div>
        <div className="flex gap-8">
          <button
            onClick={handleLike}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <Heart
              size={18}
              className={`transition-all ${
                liked ? "fill-primary text-primary" : "group-hover:fill-primary/20"
              }`}
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
  );
}