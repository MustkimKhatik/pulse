export const BLOG_TOPIC_KEYWORDS = [
  "AI",
  "Golang",
  "Go",
  "Kafka",
  "Redis",
  "MariaDB",
  "MySQL",
  "memory management",
  "CPU",
  "Assembly",
  "gRPC",
  "LLM",
  "distributed systems",
  "backend",
] as const;

function matchesKeyword(haystack: string, keyword: string): boolean {
  const lower = haystack.toLowerCase();
  const kw = keyword.toLowerCase();
  if (kw === "go") {
    return /\bgo\b/i.test(haystack);
  }
  return lower.includes(kw);
}

export function matchesBlogTopics(title: string, content: string): boolean {
  const haystack = `${title} ${content}`;
  return BLOG_TOPIC_KEYWORDS.some((kw) => matchesKeyword(haystack, kw));
}
