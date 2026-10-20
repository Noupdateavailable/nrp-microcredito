import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/pt/staff", "/en/staff"] },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
