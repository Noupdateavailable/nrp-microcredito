import "server-only";
import { createClient } from "@/lib/supabase/server";

/**
 * Verifies the session JWT and returns the staff member, or null.
 * The admin role lives in app_metadata (not user-editable) and is
 * also enforced by RLS on loan_applications.
 */
export async function getStaff() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) return null;
  const role = (claims.app_metadata as { role?: string } | undefined)?.role;
  return { id: claims.sub, email: claims.email as string | undefined, isAdmin: role === "admin" };
}
