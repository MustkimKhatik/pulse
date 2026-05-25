"use client";

import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/lib/types";

interface FeedCardProps {
  post: Post;
  onClick: () => void;
}

export function FeedCard({ post, onClick }: FeedCardProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className="bg-white border border-gray-100 rounded-xl p-4 mb-3 active:bg-gray-50 cursor-pointer"
    >
      <div className="flex items-center gap-2 mb-2">
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

      <h2 className="font-semibold text-gray-900 text-sm leading-snug mb-1">
        {post.title}
      </h2>

      <p className="text-sm text-gray-500 line-clamp-3 whitespace-pre-line">
        {post.content}
      </p>

      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-gray-400">
          {post.source_name ?? "Unknown"} ·{" "}
          {formatDistanceToNow(new Date(post.fetched_at), { addSuffix: true })}
        </span>
        {post.source_url && (
          <a
            href={post.source_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-blue-500"
          >
            Source ↗
          </a>
        )}
      </div>
    </div>
  );
}
