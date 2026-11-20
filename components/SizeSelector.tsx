"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./SizeSelector.module.css";

/* "Pull": the selected graphite piece is pulled across to the new size,
   stretching over both before settling. Arrow keys move the selection. */

const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

interface Props {
  sizes: { label: string; stock: number }[];
  value: string | null;
  onChange: (label: string) => void;
  label?: string;
}

export function SizeSelector({ sizes, value, onChange, label = "Size" }: Props) {
  const group = useRef<HTMLDivElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const prev = useRef<{ x: number; w: number } | null>(null);

  useIso(() => {
    const g = group.current, i = ind.current;
    if (!g || !i) return;
    const btn = value ? g.querySelector<HTMLButtonElement>(`button[data-size="${CSS.escape(value)}"]`) : null;
    if (!btn) {
      i.style.opacity = "0";
      prev.current = null;
      return;
    }
    const n = { x: btn.offsetLeft, w: btn.offsetWidth };
    i.style.opacity = "1";
    i.style.transform = `translateX(${n.x}px)`;
    i.style.width = `${n.w}px`;
    const a = prev.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (a && i.animate && !reduce && (a.x !== n.x || a.w !== n.w)) {
      const lo = Math.min(a.x, n.x), hi = Math.max(a.x + a.w, n.x + n.w);
      i.animate(
        [
          { transform: `translateX(${a.x}px)`, width: `${a.w}px` },
          { transform: `translateX(${lo}px)`, width: `${hi - lo}px`, offset: 0.45 },
          { transform: `translateX(${n.x}px)`, width: `${n.w}px` },
        ],
        { duration: 480, easing: "cubic-bezier(.32,0,.12,1)" },
      );
    } else if (!a && i.animate && !reduce) {
      i.animate([{ clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 0 0 0)" }], { duration: 300, easing: "cubic-bezier(.2,.7,.2,1)" });
    }
    prev.current = n;
  }, [value]);

  const available = sizes.filter((s) => s.stock > 0).map((s) => s.label);

  return (
    <div
      ref={group}
      className={styles.group}
      role="radiogroup"
      aria-label={label}
      onKeyDown={(e) => {
        if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) return;
        e.preventDefault();
        const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
        const i = value ? available.indexOf(value) : -1;
        const next = available[(i + step + available.length) % available.length];
        if (next) {
          onChange(next);
          group.current?.querySelector<HTMLButtonElement>(`button[data-size="${CSS.escape(next)}"]`)?.focus();
        }
      }}
    >
      <span ref={ind} className={styles.ind} aria-hidden="true" />
      {sizes.map((s) => {
        const sold = s.stock <= 0;
        const checked = value === s.label;
        return (
          <button
            key={s.label}
            type="button"
            role="radio"
            data-size={s.label}
            aria-checked={checked}
            aria-label={sold ? `${s.label}, sold out` : s.stock <= 2 ? `${s.label}, only ${s.stock} left` : s.label}
            tabIndex={checked || (!value && s.label === available[0]) ? 0 : -1}
            disabled={sold}
            className={styles.size}
            onClick={() => onChange(s.label)}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
