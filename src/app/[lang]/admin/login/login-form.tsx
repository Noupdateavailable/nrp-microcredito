"use client";

import { useActionState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { login } from "../actions";

export function LoginForm({ t, lang }: { t: Dictionary["admin"]; lang: Locale }) {
  const [state, action, pending] = useActionState(login, { error: false });

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="lang" value={lang} />
      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-brand-red">
          {t.loginError}
        </p>
      )}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          {t.email}
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className="field" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          {t.password}
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="field" />
      </div>
      <button type="submit" disabled={pending} className="btn-red w-full">
        {t.login}
      </button>
    </form>
  );
}
