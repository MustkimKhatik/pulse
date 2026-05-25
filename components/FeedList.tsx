"use client";

import { FeedCard } from "./FeedCard";
import type { Post } from "@/lib/types";

interface FeedListProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function FeedList({
  posts,
  onPostClick,
  loading,
  hasMore,
  onLoadMore,
}: FeedListProps) {
  if (!loading && posts.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-500 text-sm">
        <p className="mb-2">No posts yet.</p>
        <p>Run the daily fetch workflow or trigger it manually from GitHub Actions.</p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <FeedCard
          key={post.id}
          post={post}
          onClick={() => onPostClick(post)}
        />
      ))}

      {loading && (
        <p className="text-center text-sm text-zinc-500 py-4">Loading…</p>
      )}

      {hasMore && !loading && (
        <button
          type="button"
          onClick={onLoadMore}
          className="w-full py-3 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Load more
        </button>
      )}
    </div>
  );
}
