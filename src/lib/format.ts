/** Whole meticais, grouped the way each language writes them: 30.000 (pt) / 30,000 (en). */
export function formatMzn(n: number, lang: string) {
  const s = Math.round(n).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, lang === "pt" ? "." : ",");
}
