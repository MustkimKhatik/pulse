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
  const subtitle = post.summary?.trim() || contentPreview(post.content, 160);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className="bg-card border border-theme rounded-lg p-4 mb-3 cursor-pointer transition-colors bg-card-hover border-l-4"
      style={{
        borderLeftColor: isDigest ? "var(--accent-a)" : "var(--accent-b)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-lg ${
            isDigest
              ? "text-[var(--accent-a)] bg-[color-mix(in_srgb,var(--accent-a)_12%,transparent)]"
              : "text-[var(--accent-b)] bg-[color-mix(in_srgb,var(--accent-b)_12%,transparent)]"
          }`}
        >
          {isDigest ? "Daily Digest" : "Blog"}
        </span>
        {post.topic && (
          <span className="text-xs text-secondary">{post.topic}</span>
        )}
      </div>

      <h2 className="font-semibold text-primary text-sm leading-snug mb-1">
        {post.title}
      </h2>

      <p className="text-sm text-secondary line-clamp-2 leading-relaxed mb-1">
        {subtitle}
      </p>

      <div className="flex items-center justify-between mt-2">
        <span className="text-secondary text-xs">
          {post.source_name ?? "Unknown"} ·{" "}
          {formatDistanceToNow(new Date(post.fetched_at), { addSuffix: true })}
        </span>
        {post.source_url && (
          <a
            href={post.source_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-link text-xs hover:opacity-80 transition-opacity"
          >
            Source ↗
          </a>
        )}
      </div>
    </div>
  );
}
