import Parser from "rss-parser";

const parser = new Parser();

export interface RssItem {
  title: string;
  content: string;
  source_url: string;
  source_name: string;
  fetched_at: string;
}

export async function fetchFeed(url: string): Promise<RssItem[]> {
  const feed = await parser.parseURL(url);
  return feed.items.map((item) => ({
    title: item.title ?? "",
    content: item.contentSnippet ?? item.summary ?? "",
    source_url: item.link ?? "",
    source_name: feed.title ?? "",
    fetched_at: item.pubDate ?? new Date().toISOString(),
  }));
}
