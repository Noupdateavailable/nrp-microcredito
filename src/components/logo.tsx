export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2" aria-label="NRP Microcrédito">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-red text-sm font-extrabold tracking-tight text-white shadow-sm">
        NRP
      </span>
      <span className={`text-lg font-bold leading-none ${inverted ? "text-white" : "text-brand-blue"}`}>
        Microcrédito
      </span>
    </span>
  );
}
