import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category");
  const topic = searchParams.get("topic");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 50);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);

  let query = supabase
    .from("posts")
    .select("*")
    .order("fetched_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (category === "A" || category === "B") {
    query = query.eq("category", category);
  }

  if (topic && topic !== "All") {
    query = query.eq("topic", topic);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data ?? [] });
}
