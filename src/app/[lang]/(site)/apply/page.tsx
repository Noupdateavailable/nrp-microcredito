import type { Metadata } from "next";
import { Suspense } from "react";
import { products, type Product } from "@/config/site";
import { fill, getDictionary, getLocale } from "@/i18n/dictionaries";
import { ApplicationForm } from "./application-form";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  const lang = await getLocale();
  return {
    title: { absolute: dict.apply.metaTitle },
    alternates: { canonical: `/${lang}/apply` },
  };
}

export default async function ApplyPage() {
  const dict = await getDictionary();
  const lang = await getLocale();
  const productNames = Object.fromEntries(
    products.map((p) => [p, dict.products.items[p].name]),
  ) as Record<Product, string>;

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
          {dict.apply.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{fill(dict.apply.subtitle)}</p>

        <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line sm:p-10">
          {/* The form reads ?product= from the URL, so it renders behind a boundary. */}
          <Suspense fallback={<div className="h-[56rem] animate-pulse rounded-2xl bg-surface" />}>
            <ApplicationForm lang={lang} t={dict.apply} productNames={productNames} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
