"use server";

import { hasLocale } from "@/i18n/config";
import { createClient } from "@/lib/supabase/server";
import { applicationSchema, type ApplicationField } from "@/lib/validation";

export type ApplyState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      kind: "fields" | "server";
      fields: Partial<Record<ApplicationField, true>>;
      values: Record<string, string>;
    };

const FIELDS = [
  "full_name",
  "phone",
  "email",
  "city",
  "occupation",
  "monthly_income",
  "product",
  "amount_mzn",
  "term_months",
  "purpose",
  "consent",
] as const;

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  // Honeypot: real people never see or fill this field.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "success" };
  }

  const raw: Record<string, string> = {};
  for (const name of FIELDS) raw[name] = String(formData.get(name) ?? "");
  const localeRaw = String(formData.get("locale") ?? "pt");
  const locale = hasLocale(localeRaw) ? localeRaw : "pt";

  const parsed = applicationSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Partial<Record<ApplicationField, true>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fields[key as ApplicationField] = true;
    }
    return { status: "error", kind: "fields", fields, values: raw };
  }

  const { full_name, phone, email, city, occupation, monthly_income, product, amount_mzn, term_months, purpose } =
    parsed.data;
  const supabase = await createClient();

  // No .select(): visitors may insert but never read, by design (RLS).
  const { error } = await supabase
    .from("loan_applications")
    .insert({
      full_name,
      phone,
      email,
      city,
      occupation,
      monthly_income,
      product,
      amount_mzn,
      term_months,
      purpose,
      locale,
      status: "new",
    });

  if (error) {
    console.error("loan_applications insert failed", { code: error.code, message: error.message });
    return { status: "error", kind: "server", fields: {}, values: raw };
  }

  return { status: "success" };
}
