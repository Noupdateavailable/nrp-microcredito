"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { incomeBands, loanLimits, products, type Product } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { fill } from "@/i18n/fill";
import type { ApplicationField } from "@/lib/validation";
import { submitApplication, type ApplyState } from "./actions";

type Props = {
  lang: Locale;
  t: Dictionary["apply"];
  productNames: Record<Product, string>;
};

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 aria-[invalid=true]:border-brand-red aria-[invalid=true]:ring-brand-red/15";

export function ApplicationForm({ lang, t, productNames }: Props) {
  const [state, action, pending] = useActionState<ApplyState, FormData>(submitApplication, {
    status: "idle",
  });
  const params = useSearchParams();
  const preset = params.get("product");
  const defaultProduct = products.includes(preset as Product) ? (preset as Product) : "";
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
    if (state.status === "success") successRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-brand-blue-soft p-8 text-center" role="status">
        <div
          aria-hidden
          className="mx-auto grid size-14 place-items-center rounded-full bg-brand-blue text-2xl text-white"
        >
          ✓
        </div>
        <h2 ref={successRef} tabIndex={-1} className="mt-5 text-2xl font-bold text-brand-blue outline-none">
          {t.success.title}
        </h2>
        <p className="mt-3 text-muted">{fill(t.success.text)}</p>
        <Link
          href={`/${lang}`}
          className="mt-6 inline-block rounded-full bg-brand-red px-6 py-3 font-semibold text-white hover:bg-brand-red-dark"
        >
          {t.success.back}
        </Link>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fields : {};
  const values = state.status === "error" ? state.values : {};
  // Remount fields after each failed submit so defaultValue reflects what was sent.
  const formKey = state.status === "error" ? JSON.stringify(values) : "initial";

  const invalid = (name: ApplicationField) => (errors[name] ? true : undefined);
  const describedBy = (name: ApplicationField, hint?: boolean) =>
    [hint ? `${name}-hint` : null, errors[name] ? `${name}-error` : null].filter(Boolean).join(" ") ||
    undefined;
  const errorText = (name: ApplicationField) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-brand-red">
        {t.errors[errorKey[name]]}
      </p>
    ) : null;

  return (
    <form action={action} key={formKey} noValidate className="space-y-10">
      {state.status === "error" ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-brand-red/30 bg-brand-red-soft p-4 font-medium text-brand-red-dark outline-none"
        >
          {state.kind === "server" ? t.errors.server : t.errors.form}
        </div>
      ) : null}

      <input type="hidden" name="locale" value={lang} />
      {/* Honeypot for bots. Hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <fieldset className="space-y-5">
        <legend className="mb-2 text-lg font-bold text-brand-blue">{t.sections.you}</legend>

        <div>
          <label htmlFor="full_name" className="font-medium">
            {t.fields.fullName}
          </label>
          <input
            id="full_name"
            name="full_name"
            autoComplete="name"
            required
            maxLength={120}
            defaultValue={values.full_name}
            aria-invalid={invalid("full_name")}
            aria-describedby={describedBy("full_name")}
            className={inputClass}
          />
          {errorText("full_name")}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="font-medium">
              {t.fields.phone}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 mt-[3px] -translate-y-1/2 text-muted">
                +258
              </span>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                required
                defaultValue={values.phone}
                aria-invalid={invalid("phone")}
                aria-describedby={describedBy("phone", true)}
                className={`${inputClass} pl-16`}
              />
            </div>
            <p id="phone-hint" className="mt-1.5 text-sm text-muted">
              {t.fields.phoneHint}
            </p>
            {errorText("phone")}
          </div>

          <div>
            <label htmlFor="email" className="font-medium">
              {t.fields.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={160}
              defaultValue={values.email}
              aria-invalid={invalid("email")}
              aria-describedby={describedBy("email")}
              className={inputClass}
            />
            {errorText("email")}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="city" className="font-medium">
              {t.fields.city}
            </label>
            <input
              id="city"
              name="city"
              autoComplete="address-level2"
              required
              maxLength={80}
              defaultValue={values.city}
              aria-invalid={invalid("city")}
              aria-describedby={describedBy("city")}
              className={inputClass}
            />
            {errorText("city")}
          </div>

          <div>
            <label htmlFor="occupation" className="font-medium">
              {t.fields.occupation}
            </label>
            <input
              id="occupation"
              name="occupation"
              autoComplete="organization-title"
              required
              maxLength={120}
              defaultValue={values.occupation}
              aria-invalid={invalid("occupation")}
              aria-describedby={describedBy("occupation")}
              className={inputClass}
            />
            {errorText("occupation")}
          </div>
        </div>

        <div>
          <label htmlFor="monthly_income" className="font-medium">
            {t.fields.income}
          </label>
          <select
            id="monthly_income"
            name="monthly_income"
            required
            defaultValue={values.monthly_income ?? ""}
            aria-invalid={invalid("monthly_income")}
            aria-describedby={describedBy("monthly_income")}
            className={inputClass}
          >
            <option value="" disabled>
              {t.select}
            </option>
            {incomeBands.map((band) => (
              <option key={band} value={band}>
                {t.income[band]}
              </option>
            ))}
          </select>
          {errorText("monthly_income")}
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-2 text-lg font-bold text-brand-blue">{t.sections.loan}</legend>

        <div>
          <span id="product-label" className="font-medium">
            {t.fields.product}
          </span>
          <div
            role="radiogroup"
            aria-labelledby="product-label"
            aria-describedby={describedBy("product")}
            className="mt-2 grid gap-3 sm:grid-cols-3"
          >
            {products.map((p) => (
              <label
                key={p}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-4 has-checked:border-brand-blue has-checked:bg-brand-blue-soft"
              >
                <input
                  type="radio"
                  name="product"
                  value={p}
                  required
                  defaultChecked={(values.product ?? defaultProduct) === p}
                  className="size-4 accent-brand-blue"
                />
                <span className="font-medium">{productNames[p]}</span>
              </label>
            ))}
          </div>
          {errorText("product")}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="amount_mzn" className="font-medium">
              {t.fields.amount}
            </label>
            <input
              id="amount_mzn"
              name="amount_mzn"
              type="number"
              inputMode="numeric"
              min={loanLimits.minAmount}
              max={loanLimits.maxAmount}
              step={500}
              required
              defaultValue={values.amount_mzn}
              aria-invalid={invalid("amount_mzn")}
              aria-describedby={describedBy("amount_mzn", true)}
              className={inputClass}
            />
            <p id="amount_mzn-hint" className="mt-1.5 text-sm text-muted">
              {t.fields.amountHint}
            </p>
            {errorText("amount_mzn")}
          </div>

          <div>
            <label htmlFor="term_months" className="font-medium">
              {t.fields.term}
            </label>
            <input
              id="term_months"
              name="term_months"
              type="number"
              inputMode="numeric"
              min={loanLimits.minTerm}
              max={loanLimits.maxTerm}
              required
              defaultValue={values.term_months}
              aria-invalid={invalid("term_months")}
              aria-describedby={describedBy("term_months", true)}
              className={inputClass}
            />
            <p id="term_months-hint" className="mt-1.5 text-sm text-muted">
              {t.fields.termHint}
            </p>
            {errorText("term_months")}
          </div>
        </div>

        <div>
          <label htmlFor="purpose" className="font-medium">
            {t.fields.purpose}
          </label>
          <textarea
            id="purpose"
            name="purpose"
            rows={4}
            required
            minLength={10}
            maxLength={1000}
            defaultValue={values.purpose}
            aria-invalid={invalid("purpose")}
            aria-describedby={describedBy("purpose", true)}
            className={inputClass}
          />
          <p id="purpose-hint" className="mt-1.5 text-sm text-muted">
            {t.fields.purposeHint}
          </p>
          {errorText("purpose")}
        </div>

        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              required
              defaultChecked={values.consent === "on"}
              aria-invalid={invalid("consent")}
              aria-describedby={describedBy("consent")}
              className="mt-1 size-4 shrink-0 accent-brand-blue"
            />
            <span className="text-sm text-muted">{t.fields.consent}</span>
          </label>
          {errorText("consent")}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand-red px-6 py-4 text-lg font-semibold text-white shadow-sm hover:bg-brand-red-dark disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? t.submitting : t.submit}
      </button>
    </form>
  );
}

const errorKey: Record<ApplicationField, keyof Dictionary["apply"]["errors"]> = {
  full_name: "fullName",
  phone: "phone",
  email: "email",
  city: "city",
  occupation: "occupation",
  monthly_income: "income",
  product: "product",
  amount_mzn: "amount",
  term_months: "term",
  purpose: "purpose",
  consent: "consent",
};
