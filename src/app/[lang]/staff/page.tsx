import { Suspense } from "react";
import { redirect } from "next/navigation";
import { products, statuses, type Product, type Status } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { getStaffSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";
import { StatusSelect } from "./status-select";

export default async function StaffPage({ searchParams }: PageProps<"/[lang]/staff">) {
  const dict = await getDictionary();
  const lang = await getLocale();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Suspense fallback={<p className="text-muted">{dict.staff.loading}</p>}>
        <Applications lang={lang} t={dict.staff} productNames={dict.products.items} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Applications({
  lang,
  t,
  productNames,
  searchParams,
}: {
  lang: Locale;
  t: Dictionary["staff"];
  productNames: Dictionary["products"]["items"];
  searchParams: PageProps<"/[lang]/staff">["searchParams"];
}) {
  const session = await getStaffSession();
  if (session.kind === "anonymous") redirect(`/${lang}/staff/login`);

  if (session.kind === "not_admin") {
    return (
      <div className="rounded-2xl bg-white p-8 ring-1 ring-line">
        <p className="font-medium">{t.notAdmin}</p>
        <SignOutButton lang={lang} label={t.signOut} />
      </div>
    );
  }

  const filterParam = (await searchParams).status;
  const filter = statuses.includes(filterParam as Status) ? (filterParam as Status) : null;

  const supabase = await createClient();
  let query = supabase
    .from("loan_applications")
    .select("id, created_at, full_name, phone, email, city, occupation, monthly_income, product, amount_mzn, term_months, purpose, status")
    .order("created_at", { ascending: false })
    .limit(200);
  if (filter) query = query.eq("status", filter);
  const { data: rows, error } = await query;

  const money = new Intl.NumberFormat(lang === "pt" ? "pt-MZ" : "en-MZ", {
    style: "currency",
    currency: "MZN",
    maximumFractionDigits: 0,
  });
  const date = new Intl.DateTimeFormat(lang === "pt" ? "pt-MZ" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Maputo",
  });

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-blue">{t.title}</h1>
          {session.email ? <p className="text-sm text-muted">{session.email}</p> : null}
        </div>
        <SignOutButton lang={lang} label={t.signOut} />
      </div>

      <nav aria-label={t.columns.status} className="mb-4 flex flex-wrap gap-2 text-sm">
        {[null, ...statuses].map((s) => {
          const active = s === filter;
          return (
            <a
              key={s ?? "all"}
              href={s ? `/${lang}/staff?status=${s}` : `/${lang}/staff`}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-3 py-1.5 font-medium ring-1 ${
                active ? "bg-brand-blue text-white ring-brand-blue" : "bg-white text-muted ring-line hover:text-brand-blue"
              }`}
            >
              {s ? t.statuses[s] : t.filterAll}
            </a>
          );
        })}
      </nav>

      {error ? (
        <p role="alert" className="rounded-xl bg-brand-red-soft p-4 text-brand-red-dark">
          {t.updateFailed}
        </p>
      ) : !rows || rows.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-muted ring-1 ring-line">{t.empty}</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-line">
          <table className="w-full min-w-[56rem] text-left text-sm">
            <thead className="border-b border-line bg-surface text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">{t.columns.date}</th>
                <th className="px-4 py-3">{t.columns.applicant}</th>
                <th className="px-4 py-3">{t.columns.loan}</th>
                <th className="px-4 py-3">{t.columns.purpose}</th>
                <th className="px-4 py-3">{t.columns.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line align-top">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{date.format(new Date(row.created_at))}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{row.full_name}</div>
                    <a href={`tel:${row.phone}`} className="block text-brand-blue hover:underline">
                      {row.phone}
                    </a>
                    {row.email ? <div className="text-muted">{row.email}</div> : null}
                    <div className="text-muted">
                      {row.city} · {row.occupation}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="font-semibold">{money.format(row.amount_mzn)}</div>
                    <div className="text-muted">
                      {row.term_months} {t.months}
                    </div>
                    <div className="text-muted">
                      {products.includes(row.product as Product) ? productNames[row.product].name : row.product}
                    </div>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-muted">{row.purpose}</td>
                  <td className="px-4 py-3">
                    <StatusSelect id={row.id} current={row.status} t={t} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function SignOutButton({ lang, label }: { lang: Locale; label: string }) {
  return (
    <form action={signOut}>
      <input type="hidden" name="locale" value={lang} />
      <button
        type="submit"
        className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium hover:border-brand-blue hover:text-brand-blue"
      >
        {label}
      </button>
    </form>
  );
}
