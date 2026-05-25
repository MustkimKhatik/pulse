import { createClient } from "@supabase/supabase-js";

/** Project URL only — not the REST path (no `/rest/v1`). */
function normalizeSupabaseUrl(url: string): string {
  return url.replace(/\/rest\/v1\/?$/i, "").replace(/\/$/, "");
}

const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL!);
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
