import Parser from "rss-parser";

type RssItemRaw = {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  summary?: string;
  content?: string;
  contentEncoded?: string;
};

const parser = new Parser({
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

export interface RssItem {
  title: string;
  content: string;
  source_url: string;
  source_name: string;
  fetched_at: string;
}

function itemBody(item: RssItemRaw): string {
  return (
    item.contentEncoded ??
    item.content ??
    item.contentSnippet ??
    item.summary ??
    ""
  );
}

export async function fetchFeed(url: string): Promise<RssItem[]> {
  const feed = await parser.parseURL(url);
  return feed.items.map((item) => ({
    title: item.title ?? "",
    content: itemBody(item as RssItemRaw),
    source_url: item.link ?? "",
    source_name: feed.title ?? "",
    fetched_at: item.pubDate ?? new Date().toISOString(),
  }));
}
