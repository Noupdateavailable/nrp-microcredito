import Link from "next/link";
import { site } from "@/config/site";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { Logo } from "./logo";

export async function SiteFooter() {
  const dict = await getDictionary();
  const lang = await getLocale();

  return (
    <footer className="mt-auto bg-brand-blue-dark text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Logo href={`/${lang}`} inverted />
        <div className="flex flex-col gap-1 text-sm sm:items-end">
          <span>{site.address}</span>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">
            {site.phone}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs sm:flex-row sm:justify-between">
          {/* Year is fixed at build time so the footer stays in the static shell. */}
          <span>
            © {site.name}. {dict.footer.rights}
          </span>
          <Link href={`/${lang}/staff`} className="hover:text-white">
            {dict.footer.staff}
          </Link>
        </div>
      </div>
    </footer>
  );
}
