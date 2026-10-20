import { z } from "zod";

export const PRODUCTS = ["business", "salary", "emergency"] as const;
export const INCOME_BANDS = ["lt10k", "10to25k", "25to50k", "gt50k"] as const;
export const STATUSES = ["new", "reviewing", "approved", "rejected"] as const;

export type Product = (typeof PRODUCTS)[number];
export type Status = (typeof STATUSES)[number];

/** Normalises Mozambican mobile numbers to +2588XXXXXXXX. */
export function normalisePhone(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^258/, "");
  return /^8[2-7]\d{7}$/.test(digits) ? `+258${digits}` : null;
}

// Error messages are dictionary keys under apply.errors.
export const loanApplicationSchema = z.object({
  fullName: z.string().trim().min(3, "fullName").max(120, "fullName"),
  phone: z
    .string()
    .transform((v) => normalisePhone(v))
    .refine((v): v is string => v !== null, "phone"),
  email: z
    .string()
    .trim()
    .max(160, "email")
    .refine((v) => v === "" || z.email().safeParse(v).success, "email")
    .transform((v) => (v === "" ? null : v.toLowerCase())),
  city: z.string().trim().min(2, "city").max(80, "city"),
  occupation: z.string().trim().min(2, "occupation").max(120, "occupation"),
  monthlyIncome: z.enum(INCOME_BANDS, { error: "monthlyIncome" }),
  product: z.enum(PRODUCTS, { error: "product" }),
  amount: z.coerce.number({ error: "amount" }).int("amount").min(1000, "amount").max(500000, "amount"),
  term: z.coerce.number({ error: "term" }).int("term").min(1, "term").max(24, "term"),
  purpose: z.string().trim().min(10, "purpose").max(1000, "purpose"),
  consent: z.literal("on", { error: "consent" }),
});

export type LoanApplicationInput = z.input<typeof loanApplicationSchema>;
