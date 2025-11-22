"use client";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/api";
import Post from "@/components/feed/post";
import PostSkeleton from "../skeletons/feed/postSkeleton";

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAllPosts();
        // Filter posts where content is empty or null
        const filteredPosts = (data.posts || []).filter(
          (post: any) => !post.content || post.content.trim() === ""
        );
        setPosts(filteredPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto h-auto">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl px-4 py-6x">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <PostSkeleton key={i} />)
            : posts.map((post) => (
              <Post
                key={post._id}
                _id={post._id}
                user={post.user}
                createdAt={post.createdAt}
                image={post.image}
                caption={post.caption || ""}
                likes={post.likes}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
