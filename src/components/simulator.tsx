"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { Product } from "@/lib/loan-schema";
import { loans, productOrder, simTerms, simulate } from "@/config/loans";
import { formatMzn } from "@/lib/format";

export const SIMULATE_EVENT = "nrp:simulate";

const pill = (selected: boolean) =>
  `nrp-pill min-h-11 cursor-pointer rounded-full border-2 px-4 py-2.5 text-[15px] font-bold ${
    selected ? "border-brand-blue bg-brand-blue text-white" : "border-line-strong bg-white text-brand-blue"
  }`;

export function Simulator({
  lang,
  t,
  names,
}: {
  lang: Locale;
  t: Dictionary["sim"];
  names: Record<Product, string>;
}) {
  const [product, setProduct] = useState<Product>("personal");
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(1);

  const cfg = loans[product];
  // Keep the amount valid for the chosen loan.
  const amounts = cfg.simAmounts;
  const value = amounts.includes(amount) ? amount : amounts[Math.min(1, amounts.length - 1)];

  // "Simular" links on the loan cards pick a product here.
  useEffect(() => {
    const onPick = (e: Event) => {
      const p = (e as CustomEvent<Product>).detail;
      if (p in loans) setProduct(p);
    };
    window.addEventListener(SIMULATE_EVENT, onPick);
    return () => window.removeEventListener(SIMULATE_EVENT, onPick);
  }, []);

  const low = simulate(value, cfg.rateMin, term);
  const high = simulate(value, cfg.rateMax, term);
  const range = cfg.rateMin !== cfg.rateMax;
  const fmt = (n: number) => formatMzn(n, lang);
  const rateLabel = range ? `${cfg.rateMin}% ${t.to} ${cfg.rateMax}%` : `${cfg.rateMax}%`;
  const href = `/${lang}/apply?product=${product}&amount=${value}&term=${term}`;

  return (
    <div className="flex flex-col gap-[22px]">
      <div className="flex flex-col gap-1.5">
        <h2 className="m-0 text-2xl font-extrabold text-brand-blue">{t.title}</h2>
        <p className="m-0 text-[15px] text-muted">{t.subtitle}</p>
      </div>

      <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
        <legend className="mb-2.5 p-0 text-sm font-bold text-ink">{t.product}</legend>
        <div className="flex flex-wrap gap-2">
          {productOrder.map((p) => (
            <button key={p} type="button" aria-pressed={p === product} onClick={() => setProduct(p)} className={pill(p === product)}>
              {names[p]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
        <legend className="mb-2.5 p-0 text-sm font-bold text-ink">{t.amount}</legend>
        <div className="flex flex-wrap gap-2">
          {amounts.map((a) => (
            <button key={a} type="button" aria-pressed={a === value} onClick={() => setAmount(a)} className={pill(a === value)}>
              {fmt(a)}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
        <legend className="mb-2.5 p-0 text-sm font-bold text-ink">{t.term}</legend>
        <div className="flex flex-wrap gap-2">
          {simTerms.map((m) => (
            <button key={m} type="button" aria-pressed={m === term} onClick={() => setTerm(m)} className={pill(m === term)}>
              {m} {m === 1 ? t.month : t.months}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1.5 rounded-[14px] bg-brand-sky p-5" aria-live="polite">
        <span className="text-sm text-muted">{t.monthly}</span>
        <span className="text-[30px] leading-tight font-extrabold text-brand-blue tabular-nums sm:text-4xl">
          {range ? `${fmt(low.monthly)} – ${fmt(high.monthly)}` : fmt(high.monthly)} MZN
        </span>
        <span className="text-[13px] text-muted tabular-nums">
          {t.total}: {range ? `${fmt(low.total)} – ${fmt(high.total)}` : fmt(high.total)} MZN · {t.rate} {rateLabel} {t.perMonth}
        </span>
      </div>

      <Link
        href={href}
        className="nrp-btn rounded-xl bg-brand-red p-4 text-center text-[17px] font-bold text-white no-underline hover:text-white"
      >
        {t.cta}
      </Link>
      <p className="m-0 text-xs leading-normal text-muted">{t.note}</p>
    </div>
  );
}

/** A link that scrolls to the simulator and selects a product there. */
export function SimulateLink({ product, children }: { product: Product; children: React.ReactNode }) {
  return (
    <a
      href="#pedido"
      onClick={() => window.dispatchEvent(new CustomEvent(SIMULATE_EVENT, { detail: product }))}
      className="nrp-arrow inline-flex min-h-11 items-center gap-1 font-bold text-brand-red no-underline"
    >
      {children}
    </a>
  );
}
