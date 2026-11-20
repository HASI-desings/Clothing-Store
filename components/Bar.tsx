"use client";

import { useEffect, useRef, useState } from "react";
import { useBag } from "./BagProvider";
import { IconBag, IconMenu, IconSearch } from "./Icons";
import { PatternSheet } from "./PatternSheet";
import { TransitionLink } from "./TransitionLink";
import styles from "./Bar.module.css";

export function Bar() {
  const { count } = useBag();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const last = useRef(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const prevCount = useRef(count);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        setHidden(y > 160 && y > last.current + 4);
        if (y < last.current - 4 || y < 160) setHidden(false);
        last.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // the count "ticks" like a stitch counter when something is added
  useEffect(() => {
    if (count > prevCount.current && countRef.current?.animate && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      countRef.current.animate(
        [{ transform: "translateY(-6px) scale(1.25)" }, { transform: "none" }],
        { duration: 420, easing: "cubic-bezier(.32,0,.12,1)" },
      );
    }
    prevCount.current = count;
  }, [count]);

  return (
    <>
      <header className={styles.bar} data-hidden={hidden && !open} data-scrolled={scrolled}>
        <div className={styles.inner}>
          <TransitionLink href="/" className={styles.brand} aria-label="DARZ, home">
            DARZ
          </TransitionLink>
          <nav className={styles.nav} aria-label="Primary">
            <TransitionLink href="#exhibition" className={styles.hideSm}>Exhibition</TransitionLink>
            <TransitionLink href="#rooms" className={styles.hideSm}>Shop</TransitionLink>
            <TransitionLink href="#studio">Studio</TransitionLink>
            <TransitionLink href="/search" className={styles.icon} aria-label="Search">
              <IconSearch />
            </TransitionLink>
            <TransitionLink href="/bag" className={styles.icon} aria-label={`Bag, ${count} ${count === 1 ? "item" : "items"}`}>
              <IconBag />
              {count > 0 && (
                <span ref={countRef} className={styles.count} aria-hidden="true">
                  {count}
                </span>
              )}
            </TransitionLink>
            <button
              ref={menuBtn}
              type="button"
              className={styles.icon}
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="pattern-sheet"
              onClick={() => setOpen(true)}
            >
              <IconMenu />
            </button>
          </nav>
        </div>
      </header>
      <PatternSheet
        open={open}
        onClose={() => {
          setOpen(false);
          menuBtn.current?.focus();
        }}
      />
    </>
  );
}
