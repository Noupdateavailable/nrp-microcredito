import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { hasLocale, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/get-dictionary";
import { getStaff } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { STATUSES, type Product, type Status } from "@/lib/loan-schema";
import { logout, updateStatus } from "./actions";

export const metadata: Metadata = { robots: { index: false, follow: false } };

type Row = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string | null;
  city: string;
  occupation: string;
  product: Product;
  amount_mzn: number;
  term_months: number;
  purpose: string;
  status: Status;
};

const statusStyles: Record<Status, string> = {
  new: "bg-blue-100 text-brand-blue",
  reviewing: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-brand-red",
};

export default async function AdminPage({ params }: PageProps<"/[lang]/admin">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="bg-brand-sky py-10">
      <div className="mx-auto max-w-6xl px-4">
        <Suspense fallback={<p className="text-muted">{dict.admin.loading}</p>}>
          <AdminContent lang={lang} dict={dict} />
        </Suspense>
      </div>
    </section>
  );
}

async function AdminContent({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.admin;
  const staff = await getStaff();
  if (!staff) redirect(`/${lang}/admin/login`);

  const header = (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-3xl font-extrabold text-brand-blue">{t.title}</h1>
      <form action={logout} className="flex items-center gap-3 text-sm">
        <span className="text-muted">{staff.email}</span>
        <input type="hidden" name="lang" value={lang} />
        <button className="rounded-full border border-slate-300 px-4 py-1.5 font-medium hover:border-brand-blue">
          {t.logout}
        </button>
      </form>
    </div>
  );

  if (!staff.isAdmin) {
    return (
      <>
        {header}
        <p className="rounded-xl bg-white p-6 text-brand-red">{t.notAdmin}</p>
      </>
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("loan_applications")
    .select("id, created_at, full_name, phone, email, city, occupation, product, amount_mzn, term_months, purpose, status")
    .order("created_at", { ascending: false })
    .limit(200);

  const rows = (data ?? []) as Row[];
  const dateFmt = new Intl.DateTimeFormat(lang === "pt" ? "pt-MZ" : "en-GB", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Africa/Maputo",
  });
  const mzn = new Intl.NumberFormat(lang === "pt" ? "pt-MZ" : "en-GB");

  return (
    <>
      {header}
      {error && <p className="mb-4 rounded-xl bg-red-50 p-4 text-brand-red">{dict.apply.errors.generic}</p>}
      {rows.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-muted">{t.empty}</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-brand-blue text-white">
              <tr>
                {[t.columns.date, t.columns.name, t.columns.phone, t.columns.product, t.columns.amount, t.columns.term, t.columns.status].map(
                  (c) => (
                    <th key={c} className="px-4 py-3 font-semibold">
                      {c}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{dateFmt.format(new Date(r.created_at))}</td>
                  <td className="px-4 py-3">
                    <details>
                      <summary className="cursor-pointer font-semibold text-brand-blue">{r.full_name}</summary>
                      <div className="mt-2 max-w-sm space-y-1 text-muted">
                        <p>{r.city} · {r.occupation}</p>
                        {r.email && <p>{r.email}</p>}
                        <p className="whitespace-pre-wrap text-ink">{r.purpose}</p>
                      </div>
                    </details>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <a href={`tel:${r.phone}`} className="hover:text-brand-red">{r.phone}</a>
                  </td>
                  <td className="px-4 py-3">{dict.apply.productOptions[r.product]}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold">{mzn.format(r.amount_mzn)} MZN</td>
                  <td className="px-4 py-3">{r.term_months}</td>
                  <td className="px-4 py-3">
                    <form action={updateStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="lang" value={lang} />
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[r.status]}`}>
                        {t.status[r.status]}
                      </span>
                      <select name="status" defaultValue={r.status} aria-label={t.columns.status} className="rounded-md border border-slate-300 px-2 py-1">
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{t.status[s]}</option>
                        ))}
                      </select>
                      <button className="rounded-md bg-brand-blue px-2.5 py-1 text-xs font-semibold text-white hover:bg-brand-blue-light">
                        {t.update}
                      </button>
                    </form>
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
