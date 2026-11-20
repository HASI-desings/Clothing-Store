"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "./BagProvider.module.css";

export interface BagLine {
  id: string;
  name: string;
  colour: string;
  size: string;
  price: number;
  qty: number;
}

interface BagCtx {
  lines: BagLine[];
  count: number;
  add: (lines: Omit<BagLine, "qty">[]) => void;
  notify: (message: string) => void;
}

const Ctx = createContext<BagCtx | null>(null);
const KEY = "darz.bag.v1";

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>([]);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from browser storage once
      if (raw) setLines(JSON.parse(raw) as BagLine[]);
    } catch {
      /* storage blocked: the bag still works for this visit */
    }
  }, []);

  const persist = (next: BagLine[]) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const notify = useCallback((message: string) => {
    window.clearTimeout(timer.current);
    setToast({ id: Date.now(), message });
    timer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  const add = useCallback(
    (incoming: Omit<BagLine, "qty">[]) => {
      setLines((prev) => {
        const next = [...prev];
        for (const l of incoming) {
          const i = next.findIndex((x) => x.id === l.id && x.colour === l.colour && x.size === l.size);
          if (i >= 0) next[i] = { ...next[i], qty: next[i].qty + 1 };
          else next.push({ ...l, qty: 1 });
        }
        persist(next);
        return next;
      });
      notify(
        incoming.length === 1
          ? `Added to bag: ${incoming[0].name}, ${incoming[0].colour}, ${incoming[0].size}`
          : `Added the look to your bag: ${incoming.length} pieces`,
      );
    },
    [notify],
  );

  const value = useMemo(
    () => ({ lines, count: lines.reduce((n, l) => n + l.qty, 0), add, notify }),
    [lines, add, notify],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className={styles.region} role="status" aria-live="polite">
        {toast && (
          <div key={toast.id} className={styles.toast}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 12l4 4 10-10" />
            </svg>
            {toast.message}
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}

export function useBag() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useBag must be inside BagProvider");
  return c;
}
