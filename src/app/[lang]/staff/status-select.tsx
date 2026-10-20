"use client";

import { useActionState } from "react";
import { statuses, type Status } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { updateStatus, type StatusState } from "./actions";

export function StatusSelect({
  id,
  current,
  t,
}: {
  id: string;
  current: Status;
  t: Dictionary["staff"];
}) {
  const [state, action, pending] = useActionState<StatusState, FormData>(updateStatus, { ok: null });

  return (
    <form action={action} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <label className="sr-only" htmlFor={`status-${id}`}>
        {t.columns.status}
      </label>
      <select
        id={`status-${id}`}
        name="status"
        defaultValue={current}
        key={current}
        className="rounded-lg border border-line bg-white px-2 py-1.5 text-sm"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {t.statuses[s]}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-brand-blue px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:opacity-60"
      >
        {t.save}
      </button>
      {state.ok === false ? (
        <span role="alert" className="text-xs text-brand-red">
          {t.updateFailed}
        </span>
      ) : null}
    </form>
  );
}
