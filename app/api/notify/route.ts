import { sendPushToAll } from "@/lib/push";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("title")
      .order("fetched_at", { ascending: false })
      .limit(3);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const titles = (posts ?? []).map((p) => p.title).filter(Boolean);
    if (titles.length === 0) {
      return NextResponse.json({ ok: true, sent: 0, message: "No posts" });
    }

    const body = titles.join(" · ");
    const result = await sendPushToAll("Pulse · What's Hot Today", body);

    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Notify failed" },
      { status: 500 }
    );
  }
}
