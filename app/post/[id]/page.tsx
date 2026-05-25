"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PostDetail } from "@/components/PostDetail";
import type { Post } from "@/lib/types";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data.post);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center text-secondary text-sm">
        Loading…
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-page flex flex-col items-center justify-center gap-3 text-secondary text-sm px-4">
        <p>Post not found.</p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-secondary hover:text-primary transition-colors"
        >
          ← Back to feed
        </button>
      </div>
    );
  }

  return <PostDetail post={post} onBack={() => router.push("/")} />;
}
