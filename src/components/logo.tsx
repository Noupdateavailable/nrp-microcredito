import Link from "next/link";

/** Text logo placeholder. TODO(NRP): swap for the official logo file. */
export function Logo({ href, inverted = false }: { href: string; inverted?: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-2" aria-label="NRP Microcrédito">
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-lg bg-brand-red text-sm font-extrabold tracking-tight text-white"
      >
        NRP
      </span>
      <span
        className={`text-lg font-bold tracking-tight ${inverted ? "text-white" : "text-brand-blue"}`}
      >
        Microcrédito
      </span>
    </Link>
  );
}
