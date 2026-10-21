import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileBar } from "@/components/mobile-bar";
import { Cursor } from "@/components/cursor";
import { site, siteUrl } from "@/config/site";
import "../globals.css";

// Plus Jakarta Sans (SIL OFL), self-hosted so no request goes to Google at runtime or build.
const jakarta = localFont({
  src: "../fonts/jakarta.woff2",
  weight: "200 800",
  variable: "--font-jakarta",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: { canonical: `/${lang}`, languages: { pt: "/pt", en: "/en" } },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === "pt" ? "pt_MZ" : "en_US",
      url: `/${lang}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${site.name} — ${dict.hero.title}` }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang === "pt" ? "pt-MZ" : "en"} className={jakarta.variable}>
      <body className="flex min-h-screen flex-col">
        <Header lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
        <MobileBar lang={lang} dict={dict} />
        <Cursor />
      </body>
    </html>
  );
}
