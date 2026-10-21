import Link from "next/link";
import { cacheLife } from "next/cache";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/config/site";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const f = dict.footer;
  const linkCls = "inline-flex min-h-10 items-center text-mist no-underline hover:text-white hover:underline";
  return (
    <footer className="bg-brand-night text-mist">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 pt-14 pb-8">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-3">
            <span className="text-[26px] font-extrabold text-white">
              NRP <span className="text-[#FF4D63]">Microcrédito</span>
            </span>
            <p className="m-0 text-[15px] leading-relaxed">{f.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-12 text-[15px]">
            <div className="flex flex-col">
              <span className="pb-1 font-bold text-white">{f.loans}</span>
              {dict.products.items.map((p) => (
                <Link key={p.key} href={`/${lang}#produtos`} className={linkCls}>
                  {p.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="pb-1 font-bold text-white">{f.company}</span>
              <Link href={`/${lang}#como-funciona`} className={linkCls}>{dict.nav.how}</Link>
              <Link href={`/${lang}#requisitos`} className={linkCls}>{dict.nav.requirements}</Link>
              <Link href={`/${lang}#sobre-nos`} className={linkCls}>{dict.nav.about}</Link>
              <Link href={`/${lang}#contacto`} className={linkCls}>{dict.nav.contact}</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-[#23407A] pt-5 text-[13px] leading-relaxed">
          <span>
            © <CurrentYear /> {site.legalName}. {f.rights}
          </span>
          <Link href={`/${lang}/admin`} className="inline-flex min-h-10 items-center text-mist no-underline hover:text-white hover:underline">
            {f.staff}
          </Link>
        </div>
      </div>
    </footer>
  );
}
