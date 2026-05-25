import { fetchFeed } from "@/lib/rss";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const CRON_SECRET = process.env.CRON_SECRET;

const FEEDS = [
  { url: "https://news.ycombinator.com/rss", topic: "General" },
  { url: "https://dev.to/feed", topic: "Engineering" },
  { url: "https://techcrunch.com/feed/", topic: "Startups" },
  { url: "https://newsletter.pragmaticengineer.com/feed", topic: "Engineering" },
  { url: "https://feed.infoq.com", topic: "Engineering" },
  { url: "https://blog.google/rss/", topic: "AI" },
];

export async function POST(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  for (const { url, topic } of FEEDS) {
    try {
      const items = await fetchFeed(url);
      const rows = items.slice(0, 10).map((item) => ({
        ...item,
        category: "B",
        topic,
      }));

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
