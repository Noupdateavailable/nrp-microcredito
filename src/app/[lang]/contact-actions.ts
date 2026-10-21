"use server";

import { contactSchema } from "@/lib/contact-schema";
import { createClient } from "@/lib/supabase/server";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; fieldErrors: Record<string, string>; values: Record<string, string> };

const FIELDS = ["firstName", "lastName", "company", "email", "phone", "channel"] as const;

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw: Record<string, string> = {};
  for (const k of [...FIELDS, "locale", "website"]) {
    const v = formData.get(k);
    raw[k] = typeof v === "string" ? v : "";
  }

  // Honeypot: real people never fill this hidden field.
  if (raw.website) return { status: "success" };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
    return { status: "error", fieldErrors, values: raw };
  }

  const d = parsed.data;
  const supabase = await createClient();
  // Insert only: visitors have no read access, so the row is not requested back.
  const { error } = await supabase.from("contact_messages").insert({
    first_name: d.firstName,
    last_name: d.lastName,
    company: d.company,
    email: d.email,
    phone: d.phone,
    channel: d.channel,
    locale: raw.locale === "en" ? "en" : "pt",
  });

  if (error) {
    console.error("contact_messages insert failed", error.code, error.message);
    return { status: "error", fieldErrors: { _form: "generic" }, values: raw };
  }
  return { status: "success" };
}
