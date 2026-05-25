import { supabase } from "@/lib/supabase";
import type { PushSubscriptionJSON } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const subscription = (await req.json()) as PushSubscriptionJSON;

    if (!subscription?.endpoint || !subscription?.keys) {
      return NextResponse.json(
        { error: "Invalid subscription" },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from("push_subscriptions")
      .select("id, subscription");

    const match = existing?.find(
      (row) =>
        (row.subscription as PushSubscriptionJSON).endpoint ===
        subscription.endpoint
    );

    if (match) {
      await supabase.from("push_subscriptions").delete().eq("id", match.id);
    }

    const { error } = await supabase
      .from("push_subscriptions")
      .insert({ subscription });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Subscribe failed" },
      { status: 500 }
    );
  }
}
