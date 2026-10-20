import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return ["", "/apply"].flatMap((path) =>
    locales.map((lang) => ({
      url: `${base}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
      },
    })),
  );
}
