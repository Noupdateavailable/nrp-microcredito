import type { Product } from "@/lib/loan-schema";

/**
 * NRP's loan products as the client described them (monthly interest rates).
 * The simulator reads these, so a rate change here updates the whole site.
 */
export const loans: Record<
  Product,
  { rateMin: number; rateMax: number; minAmount?: number; maxAmount?: number; simAmounts: number[] }
> = {
  personal: { rateMin: 25, rateMax: 25, simAmounts: [5000, 10000, 20000, 30000, 50000] }, // TODO(NRP): confirm amount range
  business: { rateMin: 20, rateMax: 25, minAmount: 30000, maxAmount: 70000, simAmounts: [30000, 40000, 50000, 60000, 70000] },
  entrepreneur: { rateMin: 18, rateMax: 18, simAmounts: [5000, 10000, 20000, 30000, 50000] }, // TODO(NRP): confirm amount range
};

/** Order the products appear in across the site. */
export const productOrder: Product[] = ["personal", "business", "entrepreneur"];

/** Terms (months) offered in the simulator. TODO(NRP): confirm usual loan terms. */
export const simTerms = [1, 2, 3];

/**
 * How the simulator charges interest.
 * "simple": interest = amount × monthly rate × months (flat, on the amount borrowed).
 * "amortized": fixed instalments on a reducing balance.
 * TODO(NRP): confirm which one NRP uses. "simple" never shows a lower cost than the real one.
 */
export const simMethod: "simple" | "amortized" = "simple";

export function simulate(amount: number, monthlyRatePct: number, months: number) {
  const r = monthlyRatePct / 100;
  if (simMethod === "amortized" && r > 0) {
    const monthly = (amount * r) / (1 - Math.pow(1 + r, -months));
    return { monthly, total: monthly * months };
  }
  const total = amount * (1 + r * months);
  return { monthly: total / months, total };
}
