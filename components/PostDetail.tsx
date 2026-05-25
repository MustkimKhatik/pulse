"use client";

import { formatDistanceToNow } from "date-fns";
import { DigestMarkdown } from "@/components/DigestMarkdown";
import { BlogMarkdown } from "@/components/BlogMarkdown";
import type { Post } from "@/lib/types";

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export function PostDetail({ post, onBack }: PostDetailProps) {
  const isDigest = post.category === "A";

  return (
    <div className="min-h-screen bg-page">
      <header className="sticky top-0 z-10 bg-navbar border-b border-theme px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="text-secondary text-sm hover:text-primary transition-colors"
        >
          ← Back
        </button>
      </header>

      <article className="px-4 py-4 max-w-lg mx-auto pb-10">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-lg border ${
              isDigest
                ? "border-[var(--accent-a)] text-[var(--accent-a)] bg-[color-mix(in_srgb,var(--accent-a)_10%,transparent)]"
                : "border-[var(--accent-b)] text-[var(--accent-b)] bg-[color-mix(in_srgb,var(--accent-b)_10%,transparent)]"
            }`}
          >
            {isDigest ? "Daily Digest" : "Blog"}
          </span>
          {post.topic && (
            <span className="text-xs text-secondary">{post.topic}</span>
          )}
        </div>

        <h1 className="text-lg font-bold text-primary leading-snug mb-3">
          {post.title}
        </h1>

        {post.summary?.trim() && (
          <p
            className="text-base text-primary leading-relaxed mb-5 pl-3 border-l-4 rounded-r-lg py-1"
            style={{
              borderLeftColor: isDigest ? "var(--accent-a)" : "var(--accent-b)",
            }}
          >
            {post.summary}
          </p>
        )}

        <div
          className={
            isDigest ? "" : "rounded-lg border border-theme bg-card p-4"
          }
        >
          {isDigest ? (
            <DigestMarkdown content={post.content} />
          ) : (
            <BlogMarkdown content={post.content} />
          )}
        </div>

        <footer className="mt-6 pt-4 border-t border-theme">
          <p className="text-secondary text-xs mb-4">
            {post.source_name ?? "Unknown"} ·{" "}
            {formatDistanceToNow(new Date(post.fetched_at), {
              addSuffix: true,
            })}
          </p>
          {post.source_url && (
            <a
              href={post.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-link hover:opacity-80 transition-opacity"
            >
              Read Original ↗
            </a>
          )}
        </footer>
      </article>
    </div>
  );
}
