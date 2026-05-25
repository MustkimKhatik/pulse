import { fetchNewsDigest } from "@/lib/gemini";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

const CRON_SECRET = process.env.CRON_SECRET;

const PROMPTS = [
  {
    title: "India Tech & Finance Digest",
    topic: "India",
    prompt: `Summarize the top 5 trending topics in tech/AI/finance in India today from X and web sources. Include key opinions from Indian influencers and potential business impact. Format as bullet points with sources.`,
  },
  {
    title: "Software Engineer Daily Brief",
    topic: "Global",
    prompt: `Summarize the top tech news related to tech and tech companies about any updates, upgrades, or any news that as a software engineer I should know to stay ahead. Include key opinions and potential business impact. Format as bullet points with sources.`,
  },
];

export async function POST(req: Request) {
  const secret = req.headers.get("x-cron-secret");
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  for (const { title, topic, prompt } of PROMPTS) {
    const content = await fetchNewsDigest(prompt);
    const { error } = await supabase.from("posts").insert({
      category: "A",
      title,
      content,
      topic,
      source_name: "Gemini + Google Search",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
