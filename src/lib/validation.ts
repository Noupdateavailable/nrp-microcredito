import { z } from "zod";
import { incomeBands, loanLimits, products } from "@/config/site";

/**
 * Turns what people type ("84 123 4567", "+258 84-123-4567", "841234567")
 * into the E.164 form the database expects (+25884xxxxxxx).
 */
export function normalizeMzPhone(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 9) digits = `258${digits}`;
  return `+${digits}`;
}

const text = (min: number, max: number) =>
  z.string().trim().min(min).max(max);

/** Mirrors the CHECK constraints on public.loan_applications. */
export const applicationSchema = z.object({
  full_name: text(3, 120),
  phone: z
    .string()
    .transform(normalizeMzPhone)
    .pipe(z.string().regex(/^\+2588[2-7][0-9]{7}$/)),
  email: z
    .string()
    .trim()
    .max(160)
    .transform((v) => (v === "" ? null : v))
    .pipe(z.email().nullable()),
  city: text(2, 80),
  occupation: text(2, 120),
  monthly_income: z.enum(incomeBands),
  product: z.enum(products),
  amount_mzn: z.coerce
    .number()
    .int()
    .min(loanLimits.minAmount)
    .max(loanLimits.maxAmount),
  term_months: z.coerce
    .number()
    .int()
    .min(loanLimits.minTerm)
    .max(loanLimits.maxTerm),
  purpose: text(10, 1000),
  consent: z.literal("on"),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
export type ApplicationField = keyof ApplicationInput;
