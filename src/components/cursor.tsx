"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, input, select, textarea, label, summary";

/** The design's cursor follower: a red dot plus a trailing ring. Mouse only; off for reduced motion. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mx = -200, my = -200, rx = -200, ry = -200;
    let seen = false, hover = false, down = false, raf = 0;

    const set = (el: HTMLElement | null, name: string, on: boolean) => {
      if (el && el.classList.contains(name) !== on) el.classList.toggle(name, on);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      if (!seen) { seen = true; rx = mx; ry = my; }
      hover = !!(e.target as Element | null)?.closest?.(INTERACTIVE);
    };
    const onOut = (e: MouseEvent) => { if (!e.relatedTarget) seen = false; };
    const onDown = () => { down = true; };
    const onUp = () => { down = false; };

    const tick = () => {
      const k = reduce ? 1 : 0.18;
      rx += (mx - rx) * k;
      ry += (my - ry) * k;
      for (const [el, x, y] of [[dot.current, mx, my], [ring.current, rx, ry]] as const) {
        if (!el) continue;
        el.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`;
        set(el, "is-visible", seen);
        set(el, "is-hover", hover);
        set(el, "is-down", down);
      }
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="nrp-cursor-dot" aria-hidden />
      <div ref={ring} className="nrp-cursor-ring" aria-hidden />
    </>
  );
}
