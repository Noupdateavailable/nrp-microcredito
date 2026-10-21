import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site, telHref } from "@/config/site";
import { Logo } from "./logo";
import { LanguageSwitch } from "./language-switch";
import { MobileMenu } from "./mobile-menu";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const n = dict.nav;
  const links = [
    { href: `/${lang}#produtos`, label: n.loans },
    { href: `/${lang}#como-funciona`, label: n.how },
    { href: `/${lang}#requisitos`, label: n.requirements },
    { href: `/${lang}#sobre-nos`, label: n.about },
    { href: `/${lang}#contacto`, label: n.contact },
  ];
  const apply = { href: `/${lang}#pedido`, label: n.apply };

  return (
    <>
      {/* Top bar */}
      <div className="bg-brand-blue text-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-x-6 gap-y-1 px-6 py-2 text-xs sm:py-2.5 sm:text-sm">
          <span>
            {dict.topbar.tagline} <span aria-hidden>·</span> {dict.topbar.hours}
          </span>
          <span>
            {dict.topbar.phones}:{" "}
            {site.phones.map((ph, i) => (
              <span key={ph}>
                {i > 0 && <span aria-hidden> · </span>}
                <a href={telHref(ph)} className="text-white no-underline hover:underline">
                  {ph}
                </a>
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="relative border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3.5">
          <Link href={`/${lang}`} aria-label={n.home} className="shrink-0">
            <Logo className="h-12 w-auto sm:h-14" />
          </Link>

          <nav aria-label={n.mainMenu} className="hidden items-center gap-6 text-base font-semibold lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="nrp-nav-link text-ink no-underline">
                {l.label}
              </Link>
            ))}
            <LanguageSwitch lang={lang} label={n.switchLanguage} />
            <Link
              href={apply.href}
              className="nrp-btn nrp-pulse rounded-full bg-brand-red px-[22px] py-3 text-white no-underline hover:text-white"
            >
              {apply.label}
            </Link>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href={apply.href}
              className="nrp-btn hidden rounded-full bg-brand-red px-5 py-3 text-[15px] font-bold text-white no-underline hover:text-white sm:inline-flex"
            >
              {apply.label}
            </Link>
            <MobileMenu
              links={links}
              apply={apply}
              language={{ label: n.switchLanguage, target: lang === "pt" ? "en" : "pt" }}
              labels={{ open: n.openMenu, close: n.closeMenu, menu: n.menu }}
            />
          </div>
        </div>
      </header>
    </>
  );
}
