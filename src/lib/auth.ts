import "server-only";
import { createClient } from "@/lib/supabase/server";

export type StaffSession =
  | { kind: "anonymous" }
  | { kind: "not_admin"; email: string | null }
  | { kind: "admin"; email: string | null };

/**
 * Reads the signed-in user from the verified JWT. The database applies the
 * same admin rule through RLS, so this check is for the UI, not the only guard.
 */
export async function getStaffSession(): Promise<StaffSession> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims) return { kind: "anonymous" };

  const email = typeof claims.email === "string" ? claims.email : null;
  const role = (claims.app_metadata as { role?: unknown } | undefined)?.role;
  return role === "admin" ? { kind: "admin", email } : { kind: "not_admin", email };
}
