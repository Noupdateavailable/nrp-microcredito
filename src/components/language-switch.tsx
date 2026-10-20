"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export function LanguageSwitch({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() ?? `/${current}`;
  const rest = pathname.replace(/^\/(pt|en)(?=\/|$)/, "");

  return (
    <nav aria-label={label} className="flex rounded-full border border-line p-0.5 text-xs font-semibold">
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}${rest}`}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
              active ? "bg-brand-blue text-white" : "text-muted hover:text-brand-blue"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
