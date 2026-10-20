/**
 * Business details shown across the site.
 * TODO(NRP): replace every placeholder below with the real details before launch.
 */
export const site = {
  name: "NRP Microcrédito",
  shortName: "NRP",
  phone: "+258 84 000 0000", // TODO(NRP): real phone
  whatsapp: "258840000000", // TODO(NRP): digits only, used in wa.me links
  email: "info@nrp-microcredito.co.mz", // TODO(NRP): real email
  address: "Maputo, Moçambique", // TODO(NRP): street address
  hours: {
    pt: "Segunda a sexta, 8h–17h · Sábado, 8h–12h", // TODO(NRP)
    en: "Monday to Friday, 8am–5pm · Saturday, 8am–12pm", // TODO(NRP)
  },
  responseHours: 48, // TODO(NRP): confirm the response-time promise
} as const;

/** Loan limits. These must match the CHECK constraints in Supabase. */
export const loanLimits = {
  minAmount: 1_000,
  maxAmount: 500_000,
  minTerm: 1,
  maxTerm: 24,
} as const;

export const products = ["business", "personal", "entrepreneur"] as const;
export type Product = (typeof products)[number];

export const incomeBands = ["lt10k", "10to25k", "25to50k", "gt50k"] as const;
export type IncomeBand = (typeof incomeBands)[number];

export const statuses = ["new", "reviewing", "approved", "rejected"] as const;
export type Status = (typeof statuses)[number];
