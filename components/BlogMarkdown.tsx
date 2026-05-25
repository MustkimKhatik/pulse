"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";
import { prepareBlogMarkdown } from "@/lib/blog-content";

const blogComponents: Components = {
  pre: ({ children }) => <div className="not-prose my-0">{children}</div>,
  p: ({ children }) => (
    <p className="text-primary leading-relaxed mb-4 whitespace-pre-wrap">{children}</p>
  ),
  h1: ({ children }) => (
    <h1 className="text-primary font-bold text-xl mb-3 mt-6">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-primary font-semibold text-lg mb-2 mt-5">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-primary font-semibold text-base mb-2 mt-4">{children}</h3>
  ),
  li: ({ children }) => <li className="text-primary mb-1">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link hover:opacity-80 underline underline-offset-2"
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
          className="rounded px-1.5 py-0.5 text-[0.85em] font-mono text-[var(--accent-b)]"
          style={{ backgroundColor: "var(--code-bg)" }}
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
          border: "1px solid var(--border)",
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
    <article className={`prose prose-zinc max-w-none prose-p:whitespace-pre-wrap ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={blogComponents}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
