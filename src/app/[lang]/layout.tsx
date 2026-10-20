import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { site } from "@/config/site";
import { siteUrl } from "@/lib/site-url";
import "../globals.css";

const jakarta = localFont({
  src: "../../fonts/PlusJakartaSans-Variable.woff2",
  variable: "--font-jakarta",
  weight: "200 800",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  const locale = await getLocale();
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: dict.meta.title, template: `%s · ${site.name}` },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { pt: "/pt", en: "/en", "x-default": "/pt" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: site.name,
      locale: locale === "pt" ? "pt_MZ" : "en_US",
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b2e6f",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return (
    <html lang={locale === "pt" ? "pt-MZ" : "en"} className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">{children}</body>
    </html>
  );
}
