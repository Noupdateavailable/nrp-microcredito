"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { INCOME_BANDS, PRODUCTS } from "@/lib/loan-schema";
import { submitApplication, type ApplyState } from "./actions";

type T = Dictionary["apply"];

export function ApplyForm({ t, lang }: { t: T; lang: Locale }) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(submitApplication, {
    status: "idle",
  });
  const preselected = useSearchParams().get("product") ?? "";

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <p className="text-4xl" aria-hidden>
          ✅
        </p>
        <h2 className="mt-3 text-2xl font-bold text-brand-blue">{t.successTitle}</h2>
        <p className="mt-2 text-muted">{t.successText}</p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};
  const err = (k: string) =>
    errors[k] ? (t.errors as Record<string, string>)[errors[k]] ?? t.errors.generic : undefined;

  return (
    <form action={action} noValidate className="space-y-8">
      <input type="hidden" name="locale" value={lang} />
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {errors._form && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 font-medium text-brand-red">
          {t.errors.generic}
        </p>
      )}

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 text-lg font-bold text-brand-blue">{t.sections.personal}</legend>
        <Field label={t.fields.fullName} name="fullName" error={err("fullName")} className="sm:col-span-2">
          <input id="fullName" name="fullName" autoComplete="name" required defaultValue={values.fullName} className="field" />
        </Field>
        <Field label={t.fields.phone} name="phone" error={err("phone")}>
          <div className="flex">
            <span className="rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 px-3 py-2.5 text-muted">+258</span>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={t.fields.phoneHint}
              required
              defaultValue={values.phone}
              className="field rounded-l-none"
            />
          </div>
        </Field>
        <Field label={t.fields.email} name="email" error={err("email")}>
          <input id="email" name="email" type="email" autoComplete="email" defaultValue={values.email} className="field" />
        </Field>
        <Field label={t.fields.city} name="city" error={err("city")}>
          <input id="city" name="city" autoComplete="address-level2" required defaultValue={values.city} className="field" />
        </Field>
        <Field label={t.fields.occupation} name="occupation" error={err("occupation")}>
          <input id="occupation" name="occupation" required defaultValue={values.occupation} className="field" />
        </Field>
        <Field label={t.fields.monthlyIncome} name="monthlyIncome" error={err("monthlyIncome")} className="sm:col-span-2">
          <select id="monthlyIncome" name="monthlyIncome" required defaultValue={values.monthlyIncome ?? ""} className="field">
            <option value="" disabled>
              {t.select}
            </option>
            {INCOME_BANDS.map((b) => (
              <option key={b} value={b}>
                {t.incomeOptions[b]}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 text-lg font-bold text-brand-blue">{t.sections.loan}</legend>
        <Field label={t.fields.product} name="product" error={err("product")} className="sm:col-span-2">
          <select
            id="product"
            name="product"
            required
            defaultValue={values.product ?? ((PRODUCTS as readonly string[]).includes(preselected) ? preselected : "")}
            className="field"
          >
            <option value="" disabled>
              {t.select}
            </option>
            {PRODUCTS.map((p) => (
              <option key={p} value={p}>
                {t.productOptions[p]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.fields.amount} name="amount" error={err("amount")}>
          <input id="amount" name="amount" type="number" inputMode="numeric" min={1000} max={500000} step={500} required defaultValue={values.amount} className="field" />
        </Field>
        <Field label={t.fields.term} name="term" error={err("term")}>
          <input id="term" name="term" type="number" inputMode="numeric" min={1} max={24} required defaultValue={values.term} className="field" />
        </Field>
        <Field label={t.fields.purpose} name="purpose" error={err("purpose")} className="sm:col-span-2">
          <textarea id="purpose" name="purpose" rows={4} required maxLength={1000} defaultValue={values.purpose} className="field" />
        </Field>
      </fieldset>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={values.consent === "on"}
            aria-describedby={err("consent") ? "consent-error" : undefined}
            className="mt-1 h-5 w-5 accent-brand-red"
          />
          {t.fields.consent}
        </label>
        {err("consent") && (
          <p id="consent-error" className="mt-1 text-sm text-brand-red">
            {err("consent")}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className="btn-red w-full sm:w-auto">
        {pending ? t.submitting : t.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  className = "",
  children,
}: {
  label: string;
  name: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} role="alert" className="mt-1 text-sm text-brand-red">
          {error}
        </p>
      )}
    </div>
  );
}
