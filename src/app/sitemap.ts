import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/apply"].map((path) => ({
    url: `${siteUrl}/pt${path}`,
    alternates: { languages: { pt: `${siteUrl}/pt${path}`, en: `${siteUrl}/en${path}` } },
  }));
}
