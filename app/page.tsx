"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FilterBar, type CategoryFilter } from "@/components/FilterBar";
import { FeedList } from "@/components/FeedList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { registerPushSubscription } from "@/lib/push-client";
import type { Post } from "@/lib/types";

const PAGE_SIZE = 20;
const PUSH_ATTEMPTED_KEY = "pulse-push-attempted";
const TOPICS = [
  "India",
  "Global",
  "AI",
  "Golang",
  "Kafka",
  "Redis",
  "Engineering",
  "General",
];

export default function HomePage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [topic, setTopic] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(PUSH_ATTEMPTED_KEY)) return;
    localStorage.setItem(PUSH_ATTEMPTED_KEY, "1");
    registerPushSubscription().catch(() => {});
  }, []);

  const buildUrl = useCallback(
    (pageOffset: number) => {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(pageOffset),
      });
      if (category !== "All") params.set("category", category);
      if (topic !== "All") params.set("topic", topic);
      return `/api/posts?${params}`;
    },
    [category, topic]
  );

  const loadPosts = useCallback(
    async (reset: boolean) => {
      const pageOffset = reset ? 0 : offset;
      if (reset) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      try {
        const res = await fetch(buildUrl(pageOffset));
        const data = await res.json();
        const fetched: Post[] = data.posts ?? [];

        if (reset) {
          setPosts(fetched);
          setOffset(PAGE_SIZE);
        } else {
          setPosts((prev) => [...prev, ...fetched]);
          setOffset(pageOffset + PAGE_SIZE);
        }
        setHasMore(fetched.length === PAGE_SIZE);
      } catch {
        if (reset) setPosts([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [buildUrl, offset]
  );

  useEffect(() => {
    setOffset(0);
    loadPosts(true);
  }, [category, topic]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefresh = () => {
    setOffset(0);
    loadPosts(true);
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-page">
      <header className="sticky top-0 z-20 bg-navbar border-b border-theme px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-primary">Pulse</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="text-sm text-link font-medium disabled:opacity-50 hover:opacity-80 transition-opacity"
          >
            {refreshing ? "…" : "Refresh"}
          </button>
        </div>
      </header>

      <main className="px-4 pt-3 pb-8">
        <FilterBar
          category={category}
          topic={topic}
          topics={TOPICS}
          onCategoryChange={setCategory}
          onTopicChange={setTopic}
        />

        <FeedList
          posts={posts}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={() => loadPosts(false)}
          onPostClick={(post) => router.push(`/post/${post.id}`)}
        />
      </main>
    </div>
  );
}
