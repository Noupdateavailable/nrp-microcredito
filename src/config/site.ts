// Business contact details shown on the site.
export const site = {
  name: "NRP Microcrédito",
  legalName: "NRP Microcrédito E.I",
  phones: ["+258 84 280 5988", "+258 87 387 8534"],
  whatsapp: "258873878534", // WhatsApp Business line, digits only for wa.me links
  whatsappDisplay: "+258 87 387 8534",
  email: "nrp.microcredito@gmail.com",
  address: "Avenida Agostinho Neto, 936, Maputo",
  hours: { pt: "Seg–Sex, 08:00–19:00", en: "Mon–Fri, 08:00–19:00" },
};

/** Public site address. Set NEXT_PUBLIC_SITE_URL once a custom domain exists; Vercel's own domain is the fallback. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
