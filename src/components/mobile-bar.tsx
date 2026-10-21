import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site, telHref } from "@/config/site";
import { PhoneIcon } from "./icons";

/** Phone-only action bar that stays at the bottom of the screen. */
export function MobileBar({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <div className="sticky bottom-0 z-50 flex gap-2.5 border-t border-line bg-white px-4 pt-2.5 pb-[max(10px,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(11,46,111,0.10)] sm:hidden">
      <a
        href={telHref(site.phones[0])}
        className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-brand-blue text-base font-bold text-brand-blue no-underline"
      >
        <PhoneIcon size={18} width={2.2} />
        {dict.mbar.call}
      </a>
      <Link
        href={`/${lang}#pedido`}
        className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-brand-red text-base font-bold text-white no-underline hover:text-white"
      >
        {dict.mbar.apply}
      </Link>
    </div>
  );
}
