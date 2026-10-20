// Business contact details shown on the site.
export const site = {
  name: "NRP Microcrédito",
  legalName: "NRP Microcrédito E.I",
  phones: ["+258 84 280 5988", "+258 87 387 8534"],
  whatsapp: "258842805988", // digits only, used for wa.me links — confirm this is the WhatsApp number
  email: "nrp.microcredito@gmail.com",
  address: "Av. Agostinho Neto, 936, Maputo",
  hours: { pt: "Seg–Sex, 08:00–19:00", en: "Mon–Fri, 08:00–19:00" },
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, "")}`;
