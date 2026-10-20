// Business contact details shown on the site.
// TODO(NRP): replace every placeholder below with the real details.
export const site = {
  name: "NRP Microcrédito",
  phone: "+258 84 000 0000", // TODO
  whatsapp: "258840000000", // TODO: digits only, with country code, for wa.me links
  email: "info@nrp.co.mz", // TODO
  address: "Av. 24 de Julho, Maputo", // TODO
  hours: { pt: "Seg–Sex 08:00–17:00, Sáb 08:00–12:00", en: "Mon–Fri 08:00–17:00, Sat 08:00–12:00" }, // TODO
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
