import Link from "next/link";
import { cacheLife } from "next/cache";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/config/site";
import { Logo } from "./logo";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <Logo inverted />
        <p className="text-sm text-white/80">
          © <CurrentYear /> {site.name}. {dict.footer.rights}
        </p>
        <Link href={`/${lang}/admin`} className="text-sm text-white/70 underline-offset-4 hover:underline">
          {dict.footer.staff}
        </Link>
      </div>
    </footer>
  );
}
