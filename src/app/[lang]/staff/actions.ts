"use server";

import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { z } from "zod";
import { statuses } from "@/config/site";
import { hasLocale, type Locale } from "@/i18n/config";
import { getStaffSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

function localeFrom(formData: FormData): Locale {
  const value = String(formData.get("locale") ?? "pt");
  return hasLocale(value) ? value : "pt";
}

export type SignInState = { error: "invalid" | "not_admin" | null };

const credentials = z.object({
  email: z.email().max(160),
  password: z.string().min(1).max(200),
});

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const lang = localeFrom(formData);
  const parsed = credentials.safeParse({
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  });
  if (!parsed.success) return { error: "invalid" };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: "invalid" };

  const session = await getStaffSession();
  if (session.kind !== "admin") {
    await supabase.auth.signOut();
    return { error: "not_admin" };
  }

  redirect(`/${lang}/staff`);
}

export async function signOut(formData: FormData) {
  const lang = localeFrom(formData);
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`/${lang}/staff/login`);
}

const statusUpdate = z.object({
  id: z.uuid(),
  status: z.enum(statuses),
});

export type StatusState = { ok: boolean | null };

export async function updateStatus(_prev: StatusState, formData: FormData): Promise<StatusState> {
  const session = await getStaffSession();
  if (session.kind !== "admin") return { ok: false };

  const parsed = statusUpdate.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) return { ok: false };

  const supabase = await createClient();
  const { error, count } = await supabase
    .from("loan_applications")
    .update({ status: parsed.data.status }, { count: "exact" })
    .eq("id", parsed.data.id);

  if (error || count === 0) return { ok: false };
  refresh();
  return { ok: true };
}
