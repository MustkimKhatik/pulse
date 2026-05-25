"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const digestComponents: Components = {
  h1: ({ children }) => (
    <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 border-t border-zinc-800 pt-5 mt-5 first:mt-0 first:border-t-0 first:pt-0">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400 border-t border-zinc-800 pt-5 mt-5 first:mt-0 first:border-t-0 first:pt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-semibold text-zinc-300 border-t border-zinc-800 pt-4 mt-4">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-zinc-300 leading-relaxed mb-3 last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => <ul className="space-y-2 my-3 list-none pl-0">{children}</ul>,
  ol: ({ children }) => (
    <ol className="space-y-2 my-3 list-decimal list-inside text-zinc-300">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="border-l-4 border-indigo-500 bg-zinc-900 rounded-r-lg pl-3 pr-3 py-2.5 text-sm text-zinc-300 leading-relaxed">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-zinc-100">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 mx-0.5 px-2 py-0.5 rounded-md bg-zinc-800 text-indigo-400 text-xs border border-zinc-700 hover:bg-zinc-700 transition-colors no-underline"
    >
      {children}
      <span aria-hidden>↗</span>
    </a>
  ),
  hr: () => <hr className="border-zinc-800 my-5" />,
};

interface DigestMarkdownProps {
  content: string;
  className?: string;
}

export function DigestMarkdown({ content, className = "" }: DigestMarkdownProps) {
  return (
    <div className={`digest-markdown ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={digestComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
