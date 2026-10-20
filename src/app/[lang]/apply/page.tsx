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
    <section className="bg-brand-sky px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold text-brand-blue md:text-4xl">{dict.apply.title}</h1>
        <p className="mt-3 text-muted">{dict.apply.subtitle}</p>
        <div className="relative mt-8 rounded-3xl bg-white p-6 shadow-sm md:p-10">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-slate-100" />}>
            <ApplyForm t={dict.apply} lang={lang} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
