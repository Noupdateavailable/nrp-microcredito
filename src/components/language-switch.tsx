"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

export function LanguageSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname() ?? `/${lang}`;
  const target: Locale = lang === "pt" ? "en" : "pt";
  const href = pathname.replace(/^\/(pt|en)(?=\/|$)/, `/${target}`);

  return (
    <Link
      href={href}
      hrefLang={target}
      className="inline-flex min-h-10 items-center rounded-full border-2 border-line px-3.5 text-sm font-semibold text-brand-blue no-underline hover:border-brand-blue"
    >
      {label}
    </Link>
  );
}
