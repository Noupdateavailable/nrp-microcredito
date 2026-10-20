import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { LanguageSwitch } from "./language-switch";
import { Logo } from "./logo";

export async function SiteHeader() {
  const dict = await getDictionary();
  const lang = await getLocale();
  const links = [
    { href: `/${lang}#products`, label: dict.nav.products },
    { href: `/${lang}#how`, label: dict.nav.how },
    { href: `/${lang}#requirements`, label: dict.nav.requirements },
    { href: `/${lang}#faq`, label: dict.nav.faq },
    { href: `/${lang}#contact`, label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-white focus:px-3 focus:py-2"
      >
        {dict.nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo href={`/${lang}`} />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-blue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch current={lang} label={dict.nav.language} />
          <Link
            href={`/${lang}/apply`}
            className="hidden rounded-full bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark sm:inline-block"
          >
            {dict.nav.apply}
          </Link>
          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-line px-3 py-1.5 text-sm font-medium [&::-webkit-details-marker]:hidden">
              {dict.nav.menu}
            </summary>
            <ul className="absolute right-0 mt-2 w-56 rounded-xl border border-line bg-white p-2 shadow-lg">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-surface">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${lang}/apply`}
                  className="mt-1 block rounded-lg bg-brand-red px-3 py-2 text-sm font-semibold text-white"
                >
                  {dict.nav.apply}
                </Link>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
}
