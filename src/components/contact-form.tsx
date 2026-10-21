"use client";

import { useActionState, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { CHANNELS } from "@/lib/contact-schema";
import { sendContactMessage, type ContactState } from "@/app/[lang]/contact-actions";
import { site, telHref } from "@/config/site";
import { CheckIcon } from "./icons";

type T = Dictionary["talk"];

export function ContactForm({ t, lang }: { t: T; lang: Locale }) {
  // "Send another message" remounts the form, which gives it a clean state.
  const [round, setRound] = useState(0);
  return <ContactFormInner key={round} t={t} lang={lang} onReset={() => setRound((r) => r + 1)} />;
}

function ContactFormInner({ t, lang, onReset }: { t: T; lang: Locale; onReset: () => void }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContactMessage, { status: "idle" });

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="flex min-w-0 flex-[2_1_520px] flex-col items-start gap-[18px] rounded-[20px] bg-brand-sky px-6 py-10 sm:px-8">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red">
          <CheckIcon size={32} color="#FFFFFF" />
        </span>
        <h3 className="m-0 text-[26px] leading-tight font-extrabold text-brand-blue">{t.success.title}</h3>
        <p className="m-0 text-[17px] leading-relaxed text-muted">{t.success.text}</p>
        <p className="m-0 text-[15px] leading-relaxed text-muted">
          {t.success.urgent}{" "}
          <a href={telHref(site.phones[0])} className="font-bold text-brand-blue no-underline">{site.phones[0]}</a>{" "}
          {t.success.or}{" "}
          <a href={telHref(site.phones[1])} className="font-bold text-brand-blue no-underline">{site.phones[1]}</a>.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="nrp-btn min-h-12 cursor-pointer rounded-full border-2 border-brand-red bg-white px-6 py-3 text-base font-bold text-brand-red"
        >
          {t.success.again}
        </button>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};
  const err = (k: string) => (errors[k] ? (t.errors as Record<string, string>)[errors[k]] ?? t.errors.generic : undefined);
  const f = t.form;

  return (
    <form action={action} noValidate className="flex min-w-0 flex-[2_1_520px] flex-col gap-5">
      <input type="hidden" name="locale" value={lang} />
      <div aria-hidden className="absolute -left-[9999px]">
        <label>Website <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {errors._form && (
        <p role="alert" className="m-0 rounded-lg bg-brand-red-soft p-4 font-semibold text-brand-red-dark">{t.errors.generic}</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-firstName" label={f.firstName} error={err("firstName")}>
          <input id="cf-firstName" name="firstName" autoComplete="given-name" required placeholder={f.firstNamePh} defaultValue={values.firstName} className="field" aria-invalid={!!err("firstName")} />
        </Field>
        <Field id="cf-lastName" label={f.lastName} error={err("lastName")}>
          <input id="cf-lastName" name="lastName" autoComplete="family-name" required placeholder={f.lastNamePh} defaultValue={values.lastName} className="field" aria-invalid={!!err("lastName")} />
        </Field>
      </div>
      <Field id="cf-company" label={<>{f.company} <span className="font-medium text-muted">{f.optional}</span></>} error={err("company")}>
        <input id="cf-company" name="company" autoComplete="organization" placeholder={f.companyPh} defaultValue={values.company} className="field" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cf-email" label={<>{f.email} <span className="font-medium text-muted">{f.optional}</span></>} error={err("email")}>
          <input id="cf-email" name="email" type="email" autoComplete="email" placeholder={f.emailPh} defaultValue={values.email} className="field" aria-invalid={!!err("email")} />
        </Field>
        <Field id="cf-phone" label={f.phone} error={err("phone")}>
          <input id="cf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" required placeholder={f.phonePh} defaultValue={values.phone} className="field" aria-invalid={!!err("phone")} />
        </Field>
      </div>

      <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
        <legend className="mb-2.5 p-0 text-sm font-bold">{f.channel}</legend>
        <div className="flex flex-wrap gap-2.5">
          {CHANNELS.map((c) => (
            <label
              key={c}
              className="nrp-pill flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border-2 border-line-strong px-[18px] text-[15px] font-semibold text-brand-blue has-[:checked]:border-brand-blue has-[:checked]:bg-brand-sky"
            >
              <input
                type="radio"
                name="channel"
                value={c}
                defaultChecked={(values.channel || "call") === c}
                className="m-0 h-[18px] w-[18px] accent-brand-blue"
              />
              {f.channels[c]}
            </label>
          ))}
        </div>
        {err("channel") && <p role="alert" className="m-0 text-sm text-brand-red">{err("channel")}</p>}
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="nrp-btn min-h-[52px] cursor-pointer self-stretch rounded-full border-0 bg-brand-red px-8 py-4 text-[17px] font-bold text-white disabled:opacity-60 sm:self-start"
      >
        {pending ? f.sending : f.submit}
      </button>
      <p className="m-0 text-[13px] leading-normal text-muted">{f.privacy}</p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold">{label}</label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="m-0 text-sm text-brand-red">{error}</p>}
    </div>
  );
}
