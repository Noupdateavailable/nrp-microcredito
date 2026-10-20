"use client";

import { useActionState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { signIn, type SignInState } from "../actions";

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

export function LoginForm({ lang, t }: { lang: Locale; t: Dictionary["staff"] }) {
  const [state, action, pending] = useActionState<SignInState, FormData>(signIn, { error: null });

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="locale" value={lang} />
      {state.error ? (
        <p role="alert" className="rounded-xl bg-brand-red-soft p-3 text-sm font-medium text-brand-red-dark">
          {state.error === "not_admin" ? t.notAdmin : t.invalid}
        </p>
      ) : null}
      <div>
        <label htmlFor="email" className="font-medium">
          {t.email}
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className="font-medium">
          {t.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand-blue px-6 py-3 font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-70"
      >
        {pending ? t.signingIn : t.signIn}
      </button>
    </form>
  );
}
