"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice, type Product } from "@/lib/catalogue";
import { useBag } from "./BagProvider";
import { BiasImage } from "./BiasImage";
import { IconClose, IconRuler } from "./Icons";
import { SizeSelector } from "./SizeSelector";
import { Swatches } from "./Swatches";
import { TransitionLink } from "./TransitionLink";
import styles from "./QuickView.module.css";

/* Quick look: a sheet that slides in like a pattern piece. Colour switches
   with the bias cut; sizes switch with the pull. */

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState<Product | null>(product);
  const [colour, setColour] = useState("");
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const { add } = useBag();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (product) {
      /* eslint-disable react-hooks/set-state-in-effect -- reset the sheet for the newly opened product */
      setShown(product);
      setColour(product.colours[0].name);
      setSize(null);
      setError(false);
      /* eslint-enable react-hooks/set-state-in-effect */
      if (!d.open) d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (d.open) {
      d.close();
      document.documentElement.style.overflow = "";
    }
  }, [product]);

  useEffect(() => () => void (document.documentElement.style.overflow = ""), []);

  const p = shown;
  const c = p?.colours.find((x) => x.name === colour) ?? p?.colours[0];
  const sel = p?.sizes.find((s) => s.label === size);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="qv-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      {p && c && (
        <div className={styles.sheet}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close quick look">
            <IconClose />
          </button>
          <div className={styles.media}>
            <BiasImage kind={p.kind} colour={c.hex} label={c.name} room="#D8D4C8" />
          </div>
          <div className={styles.panel}>
            <p className="notation" style={{ color: "var(--color-accent)" }}>The Courtyard Edit</p>
            <h2 id="qv-title" className={styles.title}>{p.name}</h2>
            <p className={styles.price}>{formatPrice(p.price)}</p>

            <div className={styles.group}>
              <span className={styles.label}>Colour: {c.name}</span>
              <Swatches colours={p.colours} value={c.name} onChange={setColour} />
            </div>

            <div className={styles.group}>
              <div className={styles.labelRow}>
                <span className={styles.label} id="qv-size">Size{size ? `: ${size}` : ""}</span>
                <TransitionLink className={styles.guide} href="/help/size-guide" onNavigate={onClose}>
                  <IconRuler /> Size guide
                </TransitionLink>
              </div>
              <SizeSelector
                sizes={p.sizes}
                value={size}
                onChange={(s) => {
                  setSize(s);
                  setError(false);
                }}
              />
              {sel && sel.stock <= 2 && (
                <p className={styles.low}>
                  <i aria-hidden="true" /> Only {sel.stock} left in {sel.label}
                </p>
              )}
              {error && <p className={styles.error} role="alert">Choose a size to add this to your bag.</p>}
            </div>

            <button
              type="button"
              className={`btn ${styles.add}`}
              data-ready={size ? "true" : "false"}
              onClick={() => {
                if (!size) {
                  setError(true);
                  return;
                }
                add([{ id: p.id, name: p.name, colour: c.name, size, price: p.price }]);
                onClose();
              }}
            >
              {size ? `Add to bag: ${formatPrice(p.price)}` : "Select a size"}
            </button>

            <dl className={styles.facts}>
              {p.material.map((m) => (
                <div key={m.term}>
                  <dt className="notation">{m.term}</dt>
                  <dd>
                    {m.value}
                    <small>{m.explain}</small>
                  </dd>
                </div>
              ))}
            </dl>
            <p className={styles.service}>Cash on delivery. Delivered in 2 to 4 working days. Exchange within 7 days.</p>
          </div>
        </div>
      )}
    </dialog>
  );
}
