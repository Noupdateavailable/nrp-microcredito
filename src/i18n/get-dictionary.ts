import "server-only";
import type { Locale } from "./config";
import type pt from "./dictionaries/pt.json";

export type Dictionary = typeof pt;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
