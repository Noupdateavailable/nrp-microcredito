import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ApplyForm } from "./apply-form";

export async function generateMetadata({ params }: PageProps<"/[lang]/apply">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: `${dict.apply.title} — NRP` };
}

export default async function ApplyPage({ params }: PageProps<"/[lang]/apply">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="bg-brand-sky px-6 py-14 sm:py-[72px]">
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow">{dict.nav.apply}</span>
        <h1 className="mt-3 text-[28px] leading-[1.15] font-extrabold text-brand-blue sm:text-[40px]">{dict.apply.title}</h1>
        <p className="mt-3 text-[17px] leading-relaxed text-muted">{dict.apply.subtitle}</p>
        <div className="relative mt-8 rounded-[20px] border border-line bg-white p-6 shadow-[0_12px_40px_rgba(11,46,111,0.08)] sm:p-10">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-slate-100" />}>
            <ApplyForm t={dict.apply} lang={lang} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
