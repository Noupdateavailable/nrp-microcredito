import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { Logo } from "./logo";
import { LanguageSwitch } from "./language-switch";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${lang}#products`, label: dict.nav.products },
    { href: `/${lang}#how`, label: dict.nav.how },
    { href: `/${lang}#about`, label: dict.nav.about },
    { href: `/${lang}#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="h-1 bg-gradient-to-r from-brand-red via-brand-red to-brand-blue" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={`/${lang}`} aria-label={dict.nav.home}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-ink hover:text-brand-red">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitch lang={lang} label={dict.nav.switchLanguage} />
          <Link href={`/${lang}/apply`} className="btn-red !hidden whitespace-nowrap !px-4 !py-2 text-sm sm:!inline-flex">
            {dict.nav.apply}
          </Link>
        </div>
      </div>
    </header>
  );
}
