export type PostCategory = "A" | "B";

export interface Post {
  id: string;
  category: PostCategory;
  title: string;
  content: string;
  summary: string | null;
  source_url: string | null;
  source_name: string | null;
  topic: string | null;
  fetched_at: string;
}
