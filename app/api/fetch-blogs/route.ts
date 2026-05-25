import { fetchFeed } from "@/lib/rss";
import { matchesBlogTopics } from "@/lib/blog-filter";
import { blogSummaryFromSnippet } from "@/lib/summary";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const CRON_SECRET = process.env.CRON_SECRET;

const FEEDS = [
  { url: "https://news.ycombinator.com/rss", topic: "General" },
  { url: "https://dev.to/feed/tag/go", topic: "Golang" },
  { url: "https://dev.to/feed/tag/kafka", topic: "Kafka" },
  { url: "https://dev.to/feed/tag/redis", topic: "Redis" },
  { url: "https://dev.to/feed/tag/ai", topic: "AI" },
  { url: "https://feed.infoq.com", topic: "Engineering" },
  { url: "https://blog.golang.org/feed.atom", topic: "Golang" },
  { url: "https://newsletter.pragmaticengineer.com/feed", topic: "Engineering" },
];

export async function POST(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  for (const { url, topic } of FEEDS) {
    try {
      const items = await fetchFeed(url);
      const rows = items
        .filter((item) => matchesBlogTopics(item.title, item.content))
        .slice(0, 10)
        .map((item) => ({
          title: item.title,
          content: item.content,
          summary: blogSummaryFromSnippet(item.contentSnippet) || null,
          source_url: item.source_url,
          source_name: item.source_name,
          fetched_at: item.fetched_at,
          category: "B",
          topic,
        }));

      if (rows.length === 0) continue;

      const { error } = await supabase.from("posts").insert(rows);
      if (error) {
        console.error(`Failed to insert ${url}:`, error);
      }
    } catch (e) {
      console.error(`Failed to fetch ${url}:`, e);
    }
  }

  return NextResponse.json({ ok: true });
}
