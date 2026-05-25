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
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-10 bg-zinc-950 border-b border-zinc-800 px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="text-zinc-400 text-sm hover:text-zinc-200 transition-colors"
        >
          ← Back
        </button>
      </header>

      <article className="px-4 py-4 max-w-lg mx-auto pb-10">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-lg border ${
              isDigest
                ? "border-indigo-500/40 text-indigo-400 bg-indigo-500/10"
                : "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
            }`}
          >
            {isDigest ? "Daily Digest" : "Blog"}
          </span>
          {post.topic && (
            <span className="text-xs text-zinc-500">{post.topic}</span>
          )}
        </div>

        <h1 className="text-lg font-bold text-white leading-snug mb-4">
          {post.title}
        </h1>

        <div
          className={
            isDigest
              ? ""
              : "rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
          }
        >
          {isDigest ? (
            <DigestMarkdown content={post.content} />
          ) : (
            <BlogMarkdown content={post.content} />
          )}
        </div>

        <footer className="mt-6 pt-4 border-t border-zinc-800">
          <p className="text-zinc-500 text-xs mb-4">
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
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Read Original ↗
            </a>
          )}
        </footer>
      </article>
    </div>
  );
}
