import Link from "next/link";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function NotFound() {
  const dict = await getDictionary();
  const lang = await getLocale();
  return (
    <main id="main" className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-brand-red">404</p>
      <h1 className="mt-4 text-2xl font-bold text-brand-blue">{dict.notFound.title}</h1>
      <Link
        href={`/${lang}`}
        className="mt-8 rounded-full bg-brand-blue px-6 py-3 font-semibold text-white hover:bg-brand-blue-dark"
      >
        {dict.notFound.back}
      </Link>
    </main>
  );
}
