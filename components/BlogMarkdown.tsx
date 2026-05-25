"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";
import { prepareBlogMarkdown } from "@/lib/blog-content";

const blogComponents: Components = {
  pre: ({ children }) => <div className="not-prose my-0">{children}</div>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
    >
      {children}
    </a>
  ),
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className ?? "");
    const code = String(children).replace(/\n$/, "");

    if (!className && !code.includes("\n")) {
      return (
        <code
          className="rounded bg-zinc-800 px-1.5 py-0.5 text-emerald-300 text-[0.85em] font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <SyntaxHighlighter
        language={match?.[1] ?? "text"}
        style={vscDarkPlus}
        PreTag="div"
        customStyle={{
          margin: "1rem 0",
          borderRadius: "0.5rem",
          fontSize: "0.8rem",
          border: "1px solid rgb(39 39 42)",
        }}
      >
        {code}
      </SyntaxHighlighter>
    );
  },
};

interface BlogMarkdownProps {
  content: string;
  className?: string;
}

export function BlogMarkdown({ content, className = "" }: BlogMarkdownProps) {
  const markdown = prepareBlogMarkdown(content);

  return (
    <article
      className={`prose prose-invert prose-zinc max-w-none prose-p:text-zinc-300 prose-p:leading-relaxed prose-headings:text-zinc-100 prose-li:text-zinc-300 prose-pre:p-0 prose-pre:bg-transparent ${className}`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={blogComponents}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
