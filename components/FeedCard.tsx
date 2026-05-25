"use client";

import { formatDistanceToNow } from "date-fns";
import { contentPreview } from "@/lib/preview";
import type { Post } from "@/lib/types";

interface FeedCardProps {
  post: Post;
  onClick: () => void;
}

export function FeedCard({ post, onClick }: FeedCardProps) {
  const isDigest = post.category === "A";

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className={`bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-3 cursor-pointer transition-colors hover:bg-zinc-800 border-l-4 ${
        isDigest ? "border-l-indigo-500" : "border-l-emerald-500"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-lg ${
            isDigest
              ? "text-indigo-400 bg-indigo-500/10"
              : "text-emerald-400 bg-emerald-500/10"
          }`}
        >
          {isDigest ? "Daily Digest" : "Blog"}
        </span>
        {post.topic && (
          <span className="text-xs text-zinc-500">{post.topic}</span>
        )}
      </div>

      <h2 className="font-semibold text-white text-sm leading-snug mb-1.5">
        {post.title}
      </h2>

      <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
        {contentPreview(post.content)}
      </p>

      <div className="flex items-center justify-between mt-3">
        <span className="text-zinc-500 text-xs">
          {post.source_name ?? "Unknown"} ·{" "}
          {formatDistanceToNow(new Date(post.fetched_at), { addSuffix: true })}
        </span>
        {post.source_url && (
          <a
            href={post.source_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-indigo-400 text-xs hover:text-indigo-300 transition-colors"
          >
            Source ↗
          </a>
        )}
      </div>
    </div>
  );
}
