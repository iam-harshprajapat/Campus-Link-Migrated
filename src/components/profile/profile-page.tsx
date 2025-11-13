"use client"

import { useState } from "react"
import { Camera, Settings, Heart, MessageCircle, ArrowLeft, Search, Edit, Pen, Pencil } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileImageCropper from "../shared/cropper/profile-image-cropper"
import SearchModal from "../layout/search-modal"
import { motion } from 'framer-motion';
import ImageCropperModal from "../shared/cropper/profile-image-cropper"

interface UserPost {
  id: number
  author: string
  handle: string
  avatar: string
  timestamp: string
  content: string
  image?: string
  likes: number
  comments: number
}

// Mock user data
const userData = {
  name: "Sarah University",
  username: "@sarahuniv",
  course: "B.Tech - Computer Science",
  enrollmentNumber: "2024CS0234",
  bio: "Passionate about coding and community building. Love contributing to open-source projects and helping fellow students. Always curious to learn new technologies.",
  profileImage: "/diverse-student-profiles.png",
}

// Mock posts data
const userPosts: UserPost[] = [
  {
    id: 1,
    author: "Sarah University",
    handle: "@sarahuniv",
    avatar: "/diverse-student-profiles.png",
    timestamp: "2 hours ago",
    content: "",
    image: "/campus-study-session-group-of-students-studying.jpg",
    likes: 324,
    comments: 45,
  },
  {
    id: 2,
    author: "Sarah University",
    handle: "@sarahuniv",
    avatar: "/diverse-student-profiles.png",
    timestamp: "5 hours ago",
    content:
      "Just completed my #WebDevelopment project! Learned so much about #ReactJS and #TailwindCSS. Really excited about the final result. #100DaysOfCode",
    image: "",
    likes: 156,
    comments: 32,
  },
  {
    id: 3,
    author: "Sarah University",
    handle: "@sarahuniv",
    avatar: "/diverse-student-profiles.png",
    timestamp: "1 day ago",
    content: "",
    image: "/campus-library-with-students.jpg",
    likes: 289,
    comments: 67,
  },
  {
    id: 4,
    author: "Sarah University",
    handle: "@sarahuniv",
    avatar: "/diverse-student-profiles.png",
    timestamp: "2 days ago",
    content:
      "Excited to announce that I've been selected for the #InternshipProgram at a leading tech company! Thanks to all my mentors and friends for the support. #CareerGrowth",
    image: "",
    likes: 512,
    comments: 89,
  },
]

export default function ProfilePage() {
  const [expandedBio, setExpandedBio] = useState(false)
  const [showImageCropper, setShowImageCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState("gallery")
  const [searchOpen, setSearchOpen] = useState(false)

  const imagePostCount = userPosts.filter((p) => p.image && p.content === "").length
  const textPostCount = userPosts.filter((p) => !p.image || p.content).length

  const bioLimit = 50
  const isBioTruncated = userData.bio.length > bioLimit
  const displayBio = expandedBio ? userData.bio : userData.bio.slice(0, bioLimit)

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only .jpg, .jpeg, .png files allowed");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setShowImageCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleLikePost = (postId: number) => {
    const newLiked = new Set(likedPosts)
    if (newLiked.has(postId)) {
      newLiked.delete(postId)
    } else {
      newLiked.add(postId)
    }
    setLikedPosts(newLiked)
  }

  return (
    <div className="w-full flex-1">
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className="md:hidden h-14 w-full flex justify-between px-2">
        <div className="flex justify-between items-center gap-4">
          <button className="p-2 rounded-full border active:bg-muted ">
            <a href="/feed">
              <ArrowLeft size={24} />
            </a>
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-full border bg-border active:scale-95">
            <Search size={24} />
          </button>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
          <Settings size={24} />
        </button>
      </div>
      {/* Profile Header */}
      <div className="">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <div className="flex gap-6 md:gap-8">
            {/* Profile Picture */}
            <div className="relative h-24 w-24 md:h-32 md:w-32 shrink-0">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary/20">
                <AvatarImage src={userData.profileImage || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback>{userData.name.split(" ")[0][0]}</AvatarFallback>
              </Avatar>

              <button
                onClick={() => document.getElementById("profile-pic-input")?.click()}
                className="absolute bottom-1 right-1 flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors transform hover:scale-105"
                aria-label="Edit profile picture"
              >
                <Pencil size={17} strokeWidth={2.5} />
              </button>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                id="profile-pic-input"
                onChange={handleSelectImage}
              />

            </div>

            {/* User Info */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{userData.name}</h1>
                  <p className="text-muted-foreground">{userData.username}</p>
                </div>

                {/* Settings Icon */}
                <button className="hidden md:block text-muted-foreground hover:text-foreground transition-colors p-2">
                  <Settings size={24} />
                </button>
              </div>

              <div className="mt-3 space-y-1">
                <p className="text-sm font-medium text-foreground">{userData.course}</p>
                <p className="text-xs text-muted-foreground">Enrollment: {userData.enrollmentNumber}</p>
              </div>

              {/* Bio */}
              <motion.div
                initial={false}
                animate={{
                  height: expandedBio ? "auto" : 45,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-4">
                <p className="text-sm leading-relaxed text-foreground">
                  {displayBio}
                  {isBioTruncated && !expandedBio && "..."}
                  {isBioTruncated && (
                    <button
                      onClick={() => setExpandedBio(!expandedBio)}
                      className="ml-2 text-black/50 font-semibold transition-colors text-sm"
                    >
                      {expandedBio ? "show less" : "show more"}
                    </button>
                  )}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-4xl mx-auto md:px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="relative w-full border-b border-border justify-start bg-transparent p-0 rounded-none h-auto">

            <TabsTrigger
              value="gallery"
              className="relative rounded-none border-none px-6 py-4 font-medium data-[state=active]:shadow-none"
            >
              Gallery ({imagePostCount})

              {activeTab === "gallery" && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </TabsTrigger>

            <TabsTrigger
              value="thoughts"
              className="relative rounded-none border-none px-6 py-4 font-medium data-[state=active]:shadow-none"
            >
              Thoughts ({textPostCount})

              {activeTab === "thoughts" && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </TabsTrigger>

          </TabsList>


          {/* Gallery Tab */}
          <TabsContent value="gallery" className="py-8">
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {userPosts
                .filter((p) => p.image && p.content === "")
                .map((post) => (
                  <GalleryImage key={post.id} post={post} onLikeChange={() => handleLikePost(post.id)} />
                ))}
            </div>
          </TabsContent>

          {/* Thoughts Tab */}
          <TabsContent value="thoughts" className="py-8">
            <div className="space-y-6">
              {userPosts
                .filter((p) => p.content)
                .map((post) => (
                  <TextPost
                    key={post.id}
                    post={post}
                    isLiked={likedPosts.has(post.id)}
                    onLikeChange={() => handleLikePost(post.id)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Profile Image Cropper Modal */}
      {showImageCropper && selectedImage && (
        <ProfileImageCropper
          image={selectedImage}
          onComplete={(cropped) => {
            setSelectedImage(cropped);
            setShowImageCropper(false);
          }}
          onCancel={() => setShowImageCropper(false)}
        />
      )}

    </div>
  )
}

// Gallery Image Component
function GalleryImage({
  post,
  onLikeChange,
}: {
  post: UserPost
  onLikeChange: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <img
        src={post.image || "/placeholder.svg"}
        alt="Post"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 flex items-center justify-center gap-8 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="flex flex-col items-center text-white">
          <Heart size={32} fill="white" />
          <span className="text-sm font-medium mt-2">{post.likes}</span>
        </div>
        <div className="flex flex-col items-center text-white">
          <MessageCircle size={32} fill="white" />
          <span className="text-sm font-medium mt-2">{post.comments}</span>
        </div>
      </div>
    </div>
  )
}

// Text Post Component
function TextPost({
  post,
  isLiked,
  onLikeChange,
}: {
  post: UserPost
  isLiked: boolean
  onLikeChange: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  const textLimit = 300
  const isTruncated = post.content.length > textLimit
  const displayText = expanded ? post.content : post.content.slice(0, textLimit)

  // Function to render text with hashtags in blue and bold
  const renderTextWithHashtags = (text: string) => {
    const parts = text.split(/(#\w+)/g)
    return (
      <>
        {parts.map((part, i) =>
          part.startsWith("#") ? (
            <span key={i} className="font-bold text-primary">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </>
    )
  }

  return (
    <div className="border border-border rounded-lg p-4 md:p-6 bg-card hover:bg-muted/30 transition-colors">
      {/* Post Header */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
          <AvatarFallback>{post.author.split(" ")[0][0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground text-sm">{post.author}</p>
            <p className="text-xs text-muted-foreground">{post.handle}</p>
          </div>
          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
        </div>
      </div>

      {/* Post Body */}
      <div className="mb-4">
        <p className="text-sm leading-relaxed text-foreground">
          {renderTextWithHashtags(displayText)}
          {isTruncated && !expanded && "..."}
          {isTruncated && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-2 font-semibold text-muted-foreground hover:text-primary/80 transition-colors text-sm"
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          )}
        </p>
      </div>

      {/* Post Footer */}
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs font-semibold text-muted-foreground">{post.likes} likes</span>
        <div className="flex gap-6">
          <button
            onClick={onLikeChange}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <Heart
              size={18}
              className={`transition-all ${isLiked ? "fill-primary text-primary" : "group-hover:fill-primary/20"}`}
            />
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group">
            <MessageCircle size={18} className="group-hover:fill-accent/20" />
          </button>
        </div>
      </div>
    </div>
  )
}
