"use client";

import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/lib/types";

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export function PostDetail({ post, onBack }: PostDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="text-blue-600 text-sm font-medium"
        >
          ← Back
        </button>
      </header>

      <article className="px-4 py-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              post.category === "A"
                ? "bg-blue-50 text-blue-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {post.category === "A" ? "Daily Digest" : "Blog"}
          </span>
          {post.topic && (
            <span className="text-xs text-gray-400">{post.topic}</span>
          )}
        </div>

        <h1 className="text-lg font-bold text-gray-900 leading-snug mb-4">
          {post.title}
        </h1>

        <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          {post.content}
        </div>

        <footer className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {post.source_name ?? "Unknown"} ·{" "}
            {formatDistanceToNow(new Date(post.fetched_at), {
              addSuffix: true,
            })}
          </span>
          {post.source_url && (
            <a
              href={post.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 font-medium"
            >
              Open source ↗
            </a>
          )}
        </footer>
      </article>
    </div>
  );
}
