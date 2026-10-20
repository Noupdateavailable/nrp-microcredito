import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function LoginPage({ params }: PageProps<"/[lang]/admin/login">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="grid place-items-center bg-brand-sky px-4 py-20">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-extrabold text-brand-blue">{dict.admin.loginTitle}</h1>
        <LoginForm t={dict.admin} lang={lang} />
      </div>
    </section>
  );
}
