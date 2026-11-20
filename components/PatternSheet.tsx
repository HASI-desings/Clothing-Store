"use client";

import { useEffect, useRef } from "react";
import { IconClose } from "./Icons";
import { TransitionLink } from "./TransitionLink";
import styles from "./PatternSheet.module.css";

/* The menu as a pattern sheet: categories are labelled pattern pieces laid on
   paper. The current exhibition is the largest piece. */

const pieces = [
  { href: "#exhibition", label: "The Courtyard Edit", mark: "Current exhibition", cls: "p1" },
  { href: "/collections/traditional", label: "Traditional", mark: "Cut 2", cls: "p2" },
  { href: "/collections/formal", label: "Formal", mark: "Cut 1", cls: "p3" },
  { href: "/collections/shirts", label: "Shirts", mark: "On fold", cls: "p4" },
  { href: "/collections/casual", label: "Casual", mark: "Cut 2", cls: "p5" },
  { href: "/collections/unstitched", label: "Unstitched", mark: "Per suit", cls: "p6" },
  { href: "/collections/trousers", label: "Trousers", mark: "Cut 2", cls: "p7" },
  { href: "#studio", label: "Style Studio", mark: "Assemble", cls: "p8" },
];

export function PatternSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    if (!open) document.documentElement.style.overflow = "";
  }, [open]);

  return (
    <dialog
      id="pattern-sheet"
      ref={ref}
      className={styles.sheet}
      aria-label="Menu"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className={styles.paper}>
        <div className={styles.head}>
          <span className="notation">Pattern sheet: DARZ, winter 2026</span>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close menu">
            <IconClose />
          </button>
        </div>
        <nav aria-label="Collections">
          <ul className={styles.grid}>
            {pieces.map((p, i) => (
              <li key={p.href} className={styles[p.cls]} style={{ "--i": i } as React.CSSProperties}>
                <TransitionLink href={p.href} className={styles.piece} onNavigate={onClose}>
                  <span className="notation">{p.mark}</span>
                  <span className={styles.label}>{p.label}</span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles.foot}>
          Cash on delivery across Pakistan. <TransitionLink href="/help" onNavigate={onClose}>Help and contact</TransitionLink>
        </p>
      </div>
    </dialog>
  );
}
