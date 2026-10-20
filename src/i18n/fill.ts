import { site } from "@/config/site";

/** Fill {placeholders} used in the dictionaries. Safe on server and client. */
export function fill(text: string, values: Record<string, string | number> = {}) {
  const all: Record<string, string | number> = { hours: site.responseHours, ...values };
  return text.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in all ? String(all[key]) : match,
  );
}
