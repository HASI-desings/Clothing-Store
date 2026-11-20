"use client";

import { useRef, useState } from "react";
import { byId, exhibition, formatPrice, type Product } from "@/lib/catalogue";
import { Garment } from "./Garment";
import { LatticeLight } from "./LatticeLight";
import { QuickView } from "./QuickView";
import { useAssemble } from "./useAssemble";
import styles from "./Exhibition.module.css";

/* The current exhibition as a wall of cells: jali-module spans of different
   sizes, one hero piece. Every cell shows price and sizes in stock. */

const cellClass = ["c1", "c2", "c3", "c4", "c5", "c6", "c7"];
const roomTones = ["#D8D4C8", "#C9C3B1", "#E2DED3", "#CFCDC4", "#DAD6CC", "#C4C2B8", "#D3CEC2"];

export function Exhibition() {
  const root = useRef<HTMLElement>(null);
  useAssemble(root);
  const items = exhibition.productIds.map(byId);
  const [active, setActive] = useState<Product | null>(null);
  const lastCell = useRef<HTMLButtonElement | null>(null);

  return (
    <section ref={root} id="exhibition" className={styles.section} aria-labelledby="ex-title">
      <div className={`container ${styles.head}`}>
        <div className={styles.titleWrap} data-assemble>
          <LatticeLight tone="shadow" className={styles.light} />
          <p className={`notation ${styles.mark}`}>Exhibition, {exhibition.season}</p>
          <h2 id="ex-title" className="h-section">{exhibition.title}</h2>
        </div>
        <p className={styles.curator} data-assemble style={{ "--ad": "120ms" } as React.CSSProperties}>
          {exhibition.curatorLine}
        </p>
      </div>

      <ul className={`container ${styles.wall}`}>
        {items.map((p, i) => {
          const inStock = p.sizes.filter((s) => s.stock > 0).map((s) => s.label);
          const sold = p.sizes.filter((s) => s.stock <= 0).map((s) => s.label);
          return (
            <li
              key={p.id}
              className={`${styles.cell} ${styles[cellClass[i]]}`}
              data-assemble
              style={{ "--ad": `${(i % 3) * 90}ms`, "--ay": "32px" } as React.CSSProperties}
            >
              <button
                type="button"
                className={styles.open}
                aria-haspopup="dialog"
                aria-label={`${i === 0 ? "Centrepiece: " : ""}${p.name}, ${formatPrice(p.price)}. Quick look`}
                onClick={(e) => {
                  lastCell.current = e.currentTarget;
                  setActive(p);
                }}
              >
                <span className={styles.art} style={{ background: roomTones[i] }} data-vt={p.id}>
                  <Garment kind={p.kind} colour={p.colours[0].hex} className={styles.garment} />
                  {i === 0 && <span className={`notation ${styles.badge}`}>Centrepiece</span>}
                </span>
              </button>
              <div className={styles.meta}>
                <h3 className={styles.name}>{p.name}</h3>
                <span className={styles.price}>{formatPrice(p.price)}</span>
              </div>
              <p className={styles.avail}>
                {inStock.join(" ")}
                {sold.length > 0 && <span>, {sold.join(" ")} sold out</span>}
                <span className={styles.dots} aria-label={`${p.colours.length} colours`}>
                  {p.colours.map((c) => (
                    <i key={c.name} style={{ background: c.hex }} title={c.name} />
                  ))}
                </span>
              </p>
            </li>
          );
        })}
        <li className={`${styles.cell} ${styles.note}`} data-assemble style={{ "--ad": "180ms" } as React.CSSProperties}>
          <p className="notation">Curated look</p>
          <p className={styles.noteText}>Kurta, waistcoat, shalwar and chappal: four of these seven pieces make one look.</p>
          <a className="link-cut" href="#studio">Assemble it in the Studio</a>
        </li>
      </ul>

      <QuickView
        product={active}
        onClose={() => {
          setActive(null);
          lastCell.current?.focus();
        }}
      />
    </section>
  );
}
