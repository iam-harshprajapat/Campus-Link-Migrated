"use client"
import Post from "@/components/feed/post"

const mockPosts = [
  {
    id: 1,
    author: "Alex Chen",
    handle: "@alexchen",
    avatar: "/student-profile.png",
    timestamp: "5 months ago",
    image: "/campus-study-session-group-of-students-studying.jpg",
    caption:
      "Just finished the biggest project of the semester! So grateful for my amazing team and the late-night coffee runs. This is what college memories are made of 🎓☕",
    likes: 234,
  },
  {
    id: 2,
    author: "Jordan Smith",
    handle: "@jordansmith",
    avatar: "/student-profile.png",
    timestamp: "3 weeks ago",
    image: "/campus-library-with-students.jpg",
    caption: "The new library renovation is absolutely beautiful. Perfect study vibes for finals week!",
    likes: 892,
  },
  {
    id: 3,
    author: "Priya Patel",
    handle: "@priyapatel",
    avatar: "/student-profile.png",
    timestamp: "2 weeks ago",
    image: "/campus-event-celebration-students-having-fun.jpg",
    caption:
      "Amazing turnout at the cultural fest! So proud to see our community come together and celebrate our diverse backgrounds. Thanks everyone who participated! 🎉",
    likes: 1205,
  },
  {
    id: 4,
    author: "Marcus Johnson",
    handle: "@marcusj",
    avatar: "/student-profile.png",
    timestamp: "1 week ago",
    image: "/campus-sports-game-students-playing-volleyball.jpg",
    caption: "Rec league championship game incoming! Go Warriors! 🏆⚡",
    likes: 567,
  },
]

export default function Feed() {
  return (
    <div className="flex-1 overflow-y-auto h-auto">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl px-4 py-6 mt-4">
          {mockPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
}
