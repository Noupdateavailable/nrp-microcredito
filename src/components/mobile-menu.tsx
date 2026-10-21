"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloseIcon, MenuIcon } from "./icons";

type NavLink = { href: string; label: string };

/** Phone and iPad menu (below 1024px): a toggle button and a panel that drops under the header. */
export function MobileMenu({
  links,
  apply,
  language,
  labels,
}: {
  links: NavLink[];
  apply: NavLink;
  language: { label: string; target: string };
  labels: { open: string; close: string; menu: string };
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Every link closes the menu; Escape does too.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const languageHref = (pathname ?? "/").replace(/^\/(pt|en)(?=\/|$)/, `/${language.target}`);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? labels.close : labels.open}
        aria-expanded={open}
        aria-controls="nrp-mobile-nav"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border-2 border-line bg-white text-brand-blue"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <nav
          id="nrp-mobile-nav"
          aria-label={labels.menu}
          className="nrp-drop absolute inset-x-0 top-full z-40 border-b border-line bg-white shadow-[0_16px_30px_rgba(11,46,111,0.10)]"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col px-6 pt-1 pb-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                className="flex min-h-[52px] items-center border-b border-[#EEF1F7] text-lg font-bold text-ink no-underline"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={languageHref}
              hrefLang={language.target}
              onClick={close}
              className="flex min-h-[52px] items-center text-lg font-bold text-brand-blue no-underline"
            >
              {language.label}
            </Link>
            <Link
              href={apply.href}
              onClick={close}
              className="nrp-btn mt-3 rounded-xl bg-brand-red p-4 text-center text-[17px] font-bold text-white no-underline"
            >
              {apply.label}
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
