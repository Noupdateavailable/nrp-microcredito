"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { hasLocale } from "@/i18n/config";
import { STATUSES } from "@/lib/loan-schema";
import { createClient } from "@/lib/supabase/server";
import { getStaff } from "@/lib/auth";

const langOf = (fd: FormData) => {
  const l = String(fd.get("lang") ?? "pt");
  return hasLocale(l) ? l : "pt";
};

export async function login(_prev: { error: boolean }, formData: FormData) {
  const lang = langOf(formData);
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (error) return { error: true };
  redirect(`/${lang}/admin`);
}

export async function logout(formData: FormData) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`/${langOf(formData)}/admin/login`);
}

const updateSchema = z.object({
  id: z.uuid(),
  status: z.enum(STATUSES),
});

export async function updateStatus(formData: FormData) {
  const staff = await getStaff();
  if (!staff?.isAdmin) redirect(`/${langOf(formData)}/admin/login`);

  const parsed = updateSchema.safeParse({ id: formData.get("id"), status: formData.get("status") });
  if (!parsed.success) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("loan_applications")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);
  if (error) console.error("status update failed", error.code, error.message);

  revalidatePath(`/${langOf(formData)}/admin`);
}
