import { z } from "zod";
import { normalisePhone } from "./loan-schema";

export const CHANNELS = ["call", "whatsapp", "sms", "email"] as const;
export type Channel = (typeof CHANNELS)[number];

const optionalText = (max: number, key: string) =>
  z
    .string()
    .trim()
    .max(max, key)
    .transform((v) => (v === "" ? null : v));

// Error messages are dictionary keys under talk.errors. Limits match the database CHECK constraints.
export const contactSchema = z
  .object({
    firstName: z.string().trim().min(1, "firstName").max(80, "firstName"),
    lastName: z.string().trim().min(1, "lastName").max(80, "lastName"),
    company: optionalText(120, "company"),
    email: z
      .string()
      .trim()
      .max(160, "email")
      .refine((v) => v === "" || z.email().safeParse(v).success, "email")
      .transform((v) => (v === "" ? null : v.toLowerCase())),
    phone: z
      .string()
      .transform((v) => normalisePhone(v))
      .refine((v): v is string => v !== null, "phone"),
    channel: z.enum(CHANNELS, { error: "channel" }),
  })
  .refine((d) => d.channel !== "email" || d.email !== null, { message: "emailRequired", path: ["email"] });
