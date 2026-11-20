"use client";

import type { Colourway } from "@/lib/catalogue";
import styles from "./Swatches.module.css";

export function Swatches({ colours, value, onChange }: { colours: Colourway[]; value: string; onChange: (name: string) => void }) {
  return (
    <div className={styles.row} role="radiogroup" aria-label="Colour">
      {colours.map((c) => (
        <button
          key={c.name}
          type="button"
          role="radio"
          aria-checked={value === c.name}
          aria-label={c.name}
          tabIndex={value === c.name ? 0 : -1}
          className={styles.sw}
          style={{ "--sw": c.hex } as React.CSSProperties}
          onClick={() => onChange(c.name)}
          onKeyDown={(e) => {
            const i = colours.findIndex((x) => x.name === value);
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault();
              const n = colours[(i + 1) % colours.length];
              onChange(n.name);
              (e.currentTarget.parentElement?.children[(i + 1) % colours.length] as HTMLElement)?.focus();
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault();
              const j = (i - 1 + colours.length) % colours.length;
              onChange(colours[j].name);
              (e.currentTarget.parentElement?.children[j] as HTMLElement)?.focus();
            }
          }}
        />
      ))}
    </div>
  );
}
