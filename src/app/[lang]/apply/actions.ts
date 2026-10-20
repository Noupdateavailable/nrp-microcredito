"use server";

import { loanApplicationSchema } from "@/lib/loan-schema";
import { createClient } from "@/lib/supabase/server";

export type ApplyState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; fieldErrors: Record<string, string>; values: Record<string, string> };

export async function submitApplication(_prev: ApplyState, formData: FormData): Promise<ApplyState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([, v]) => typeof v === "string"),
  ) as Record<string, string>;

  // Honeypot: real people never fill this hidden field.
  if (raw.website) return { status: "success" };

  const parsed = loanApplicationSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", fieldErrors, values: raw };
  }

  const d = parsed.data;
  const supabase = await createClient();
  // Insert only — anonymous visitors have no SELECT permission, so we don't ask for the row back.
  const { error } = await supabase.from("loan_applications").insert({
    full_name: d.fullName,
    phone: d.phone,
    email: d.email,
    city: d.city,
    occupation: d.occupation,
    monthly_income: d.monthlyIncome,
    product: d.product,
    amount_mzn: d.amount,
    term_months: d.term,
    purpose: d.purpose,
    locale: raw.locale === "en" ? "en" : "pt",
  });

  if (error) {
    console.error("loan_applications insert failed", error.code, error.message);
    return { status: "error", fieldErrors: { _form: "generic" }, values: raw };
  }

  return { status: "success" };
}
