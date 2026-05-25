import webpush from "web-push";
import { supabase } from "@/lib/supabase";
import type { PushSubscription } from "web-push";

function initVapid() {
  const email = process.env.VAPID_EMAIL;
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!email || !publicKey || !privateKey) {
    throw new Error("VAPID keys not configured");
  }
  webpush.setVapidDetails(email, publicKey, privateKey);
}

export async function sendPushToAll(title: string, body: string) {
  initVapid();

  const { data: rows, error } = await supabase
    .from("push_subscriptions")
    .select("id, subscription");

  if (error) throw error;
  if (!rows?.length) return { sent: 0, failed: 0 };

  let sent = 0;
  let failed = 0;
  const staleIds: string[] = [];

  await Promise.all(
    rows.map(async (row) => {
      try {
        await webpush.sendNotification(
          row.subscription as PushSubscription,
          JSON.stringify({ title, body })
        );
        sent++;
      } catch (err: unknown) {
        failed++;
        const status = (err as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) {
          staleIds.push(row.id);
        }
      }
    })
  );

  if (staleIds.length > 0) {
    await supabase.from("push_subscriptions").delete().in("id", staleIds);
  }

  return { sent, failed };
}
