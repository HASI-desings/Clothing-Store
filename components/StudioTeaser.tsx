"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { bySlot, formatPrice, type Product, type StudioSlot } from "@/lib/catalogue";
import { useBag } from "./BagProvider";
import { Garment } from "./Garment";
import { IconArrow, IconLock, IconPin, IconShuffle } from "./Icons";
import { LatticeLight } from "./LatticeLight";
import { SizeSelector } from "./SizeSelector";
import { useAssemble } from "./useAssemble";
import styles from "./StudioTeaser.module.css";

/* The Style Studio on the homepage: a flat-lay on a cutting table. Swap each
   slot, lock what you like, shuffle the rest, save to a shortlist, share or
   add the whole look. Pieces are illustrated flat-lays, never a try-on. */

interface Option { product: Product | null; colour: number }
const SLOTS: { slot: StudioSlot; label: string; optional?: boolean }[] = [
  { slot: "top", label: "Top" },
  { slot: "layer", label: "Layer", optional: true },
  { slot: "bottom", label: "Bottom" },
  { slot: "footwear", label: "Footwear" },
];

function optionsFor(slot: StudioSlot, optional?: boolean): Option[] {
  const list: Option[] = bySlot(slot).flatMap((p) => p.colours.map((_, colour) => ({ product: p, colour })));
  return optional ? [{ product: null, colour: 0 }, ...list] : list;
}

type Pick = Record<StudioSlot, number>;
const START: Pick = { top: 0, layer: 1, bottom: 0, footwear: 0 };
const SAVE_KEY = "darz.shortlist.v1";

function encode(p: Pick) {
  return SLOTS.map((s) => p[s.slot]).join("-");
}
function decode(s: string | null, opts: Record<StudioSlot, Option[]>): Pick | null {
  if (!s) return null;
  const parts = s.split("-").map(Number);
  if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0)) return null;
  const out = { ...START };
  SLOTS.forEach((sl, i) => (out[sl.slot] = Math.min(parts[i], opts[sl.slot].length - 1)));
  return out;
}

export function StudioTeaser() {
  const root = useRef<HTMLElement>(null);
  useAssemble(root);
  const { add, notify } = useBag();
  const opts = useMemo(() => {
    const o = {} as Record<StudioSlot, Option[]>;
    SLOTS.forEach((s) => (o[s.slot] = optionsFor(s.slot, s.optional)));
    return o;
  }, []);

  const [pick, setPick] = useState<Pick>(START);
  const [dir, setDir] = useState<Record<StudioSlot, number>>({ top: 0, layer: 0, bottom: 0, footwear: 0 });
  const [locked, setLocked] = useState<Record<StudioSlot, boolean>>({ top: false, layer: false, bottom: false, footwear: false });
  const [size, setSize] = useState<string | null>("M");
  const [shoe, setShoe] = useState<string | null>("42");
  const [saved, setSaved] = useState<string[]>([]);
  const [swaps, setSwaps] = useState(0);
  const [origin, setOrigin] = useState(process.env.NEXT_PUBLIC_SITE_URL ?? "");

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- restore a shared look and the shortlist after hydration */
    const fromUrl = decode(new URLSearchParams(window.location.search).get("look"), opts);
    if (fromUrl) setPick(fromUrl);
    setOrigin(window.location.origin);
    try {
      const raw = window.localStorage.getItem(SAVE_KEY);
      if (raw) setSaved(JSON.parse(raw) as string[]);
    } catch {
      /* storage blocked */
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [opts]);

  const move = (slot: StudioSlot, step: number) => {
    const n = opts[slot].length;
    setDir((d) => ({ ...d, [slot]: step }));
    setPick((p) => ({ ...p, [slot]: (p[slot] + step + n) % n }));
    setSwaps((s) => s + 1);
  };

  const shuffle = () => {
    setPick((p) => {
      const next = { ...p };
      SLOTS.forEach(({ slot }) => {
        if (locked[slot]) return;
        const n = opts[slot].length;
        let r = Math.floor(Math.random() * n);
        if (n > 1 && r === p[slot]) r = (r + 1) % n;
        next[slot] = r;
      });
      return next;
    });
    setDir({ top: 1, layer: -1, bottom: 1, footwear: -1 });
    setSwaps((s) => s + 1);
  };

  const pieces = SLOTS.map(({ slot }) => ({ slot, opt: opts[slot][pick[slot]] }));
  const chosen = pieces.filter((x) => x.opt.product);
  const total = chosen.reduce((n, x) => n + (x.opt.product?.price ?? 0), 0);
  const code = encode(pick);
  const isSaved = saved.includes(code);

  const shareUrl = `${origin}/?look=${code}#studio`;

  return (
    <section ref={root} id="studio" className={styles.section} aria-labelledby="studio-title">
      <div className={`container ${styles.head}`}>
        <p className="notation" style={{ color: "var(--color-accent)" }} data-assemble>The Style Studio</p>
        <h2 id="studio-title" className="h-section" data-assemble style={{ "--ad": "80ms" } as React.CSSProperties}>
          Lay it out. Swap a piece. See how it joins.
        </h2>
        <p className={styles.lede} data-assemble style={{ "--ad": "140ms" } as React.CSSProperties}>
          Build an outfit on the cutting table. Lock the pieces you love and shuffle the rest. These are flat-lays of real pieces in
          the collection, not a virtual try-on.
        </p>
      </div>

      <div className={`container ${styles.studio}`}>
        <div className={styles.table} data-assemble style={{ "--ay": "0px" } as React.CSSProperties}>
          <LatticeLight tone="shadow" className={styles.light} />
          {pieces.map(({ slot, opt }) => {
            const meta = SLOTS.find((s) => s.slot === slot)!;
            const n = opts[slot].length;
            const p = opt.product;
            const colour = p ? p.colours[opt.colour] : null;
            return (
              <div key={slot} className={`${styles.slot} ${styles[slot]}`} data-locked={locked[slot]}>
                <div className={styles.slotHead}>
                  <span className="notation">
                    {meta.label} / {pick[slot] + 1} of {n}
                  </span>
                  <button
                    type="button"
                    className={styles.lock}
                    aria-pressed={locked[slot]}
                    aria-label={`${locked[slot] ? "Unlock" : "Lock"} ${meta.label.toLowerCase()}`}
                    onClick={() => setLocked((l) => ({ ...l, [slot]: !l[slot] }))}
                  >
                    <IconLock open={!locked[slot]} />
                  </button>
                </div>
                <div className={styles.stage}>
                  <button type="button" className={styles.arrow} onClick={() => move(slot, -1)} disabled={locked[slot]} aria-label={`Previous ${meta.label.toLowerCase()}`}>
                    <IconArrow dir="left" />
                  </button>
                  <div className={styles.piece} key={`${slot}-${pick[slot]}`} data-dir={dir[slot]}>
                    {p && colour ? (
                      <Garment kind={p.kind} colour={colour.hex} className={styles.garment} title={`${p.name} in ${colour.name}`} />
                    ) : (
                      <span className={styles.empty}>No layer</span>
                    )}
                  </div>
                  <button type="button" className={styles.arrow} onClick={() => move(slot, 1)} disabled={locked[slot]} aria-label={`Next ${meta.label.toLowerCase()}`}>
                    <IconArrow />
                  </button>
                </div>
                <p className={styles.caption} aria-live="polite">
                  {p && colour ? (
                    <>
                      <span>{p.name}, {colour.name.toLowerCase()}</span>
                      <span className={styles.cost}>{formatPrice(p.price)}</span>
                    </>
                  ) : (
                    <span>Nothing over the top</span>
                  )}
                </p>
              </div>
            );
          })}
        </div>

        <aside className={styles.panel} aria-label="Your look" data-assemble style={{ "--ad": "120ms" } as React.CSSProperties}>
          <div className={styles.total}>
            <span className="notation">Look {code}</span>
            <strong>{formatPrice(total)}</strong>
            <span>{chosen.length} pieces</span>
          </div>
          <button type="button" className="btn-quiet" onClick={shuffle}>
            <IconShuffle /> Shuffle unlocked pieces
          </button>
          <div className={styles.sizes}>
            <span className={styles.label}>Your size</span>
            <SizeSelector label="Clothing size" sizes={["S", "M", "L", "XL", "XXL"].map((label) => ({ label, stock: 9 }))} value={size} onChange={setSize} />
            <span className={styles.label}>Shoe size</span>
            <SizeSelector label="Shoe size" sizes={["40", "41", "42", "43", "44"].map((label) => ({ label, stock: 9 }))} value={shoe} onChange={setShoe} />
          </div>
          <button
            type="button"
            className="btn"
            onClick={() =>
              add(
                chosen.map(({ opt }) => ({
                  id: opt.product!.id,
                  name: opt.product!.name,
                  colour: opt.product!.colours[opt.colour].name,
                  size: opt.product!.kind === "chappal" ? shoe ?? "42" : size ?? "M",
                  price: opt.product!.price,
                })),
              )
            }
          >
            Add the look to bag
          </button>
          <div className={styles.secondary}>
            <button
              type="button"
              className={styles.textBtn}
              aria-pressed={isSaved}
              onClick={() => {
                const next = isSaved ? saved.filter((s) => s !== code) : [...saved, code];
                setSaved(next);
                try {
                  window.localStorage.setItem(SAVE_KEY, JSON.stringify(next));
                } catch {
                  /* ignore */
                }
                notify(isSaved ? "Removed from your shortlist" : "Pinned to your shortlist");
              }}
            >
              <IconPin /> {isSaved ? "Pinned" : "Pin to shortlist"} ({saved.length})
            </button>
            <button
              type="button"
              className={styles.textBtn}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(shareUrl);
                  notify("Link copied. Anyone who opens it sees this exact look.");
                } catch {
                  notify(`Copy this link: ${shareUrl}`);
                }
              }}
            >
              Copy link
            </button>
            <a
              className={styles.textBtn}
              href={`https://wa.me/?text=${encodeURIComponent(`What do you think of this look? ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send on WhatsApp
            </a>
          </div>
          {saved.length > 0 && (
            <ul className={styles.shortlist} aria-label="Shortlist">
              {saved.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    aria-current={s === code}
                    onClick={() => {
                      const d = decode(s, opts);
                      if (d) {
                        setDir({ top: 1, layer: 1, bottom: 1, footwear: 1 });
                        setPick(d);
                      }
                    }}
                  >
                    Look {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="visually-hidden" aria-live="polite">{swaps > 0 ? `Look updated. Total ${formatPrice(total)}.` : ""}</p>
        </aside>
      </div>
    </section>
  );
}
