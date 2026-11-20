"use client";

import { useState } from "react";
import { TransitionLink } from "./TransitionLink";
import styles from "./Footer.module.css";

/* Footer as a pattern sheet: links grouped as pieces, and drop alerts. */

const groups = [
  { title: "Shop", links: [["Traditional", "/collections/traditional"], ["Formal", "/collections/formal"], ["Casual", "/collections/casual"], ["Unstitched", "/collections/unstitched"]] },
  { title: "Help", links: [["Size guide", "/help/size-guide"], ["Delivery", "/help/delivery"], ["Exchanges", "/help/returns"], ["Contact", "/help/contact"]] },
  { title: "DARZ", links: [["How it's made", "/construction"], ["Style Studio", "/#studio"], ["Privacy", "/legal/privacy"], ["Terms", "/legal/terms"]] },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.alerts}>
          <p className={styles.brand} aria-hidden="true">DARZ</p>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
              setState(ok ? "done" : "error");
            }}
          >
            <label htmlFor="drop-email" className={styles.label}>Drop alerts</label>
            <p id="drop-help" className={styles.help}>One email when a new exhibition opens. Nothing else.</p>
            {state === "done" ? (
              <p className={styles.done} role="status">Saved. You&apos;ll hear from us when the next exhibition opens.</p>
            ) : (
              <div className={styles.row}>
                <input
                  id="drop-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  aria-invalid={state === "error"}
                  aria-describedby={state === "error" ? "drop-help drop-err" : "drop-help"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                />
                <button type="submit" className="btn">Notify me</button>
              </div>
            )}
            {state === "error" && (
              <p id="drop-err" className={styles.error} role="alert">
                Enter an email address like name@example.com.
              </p>
            )}
          </form>
        </div>
        <nav className={styles.links} aria-label="Footer">
          {groups.map((g) => (
            <div key={g.title} className={styles.group}>
              <h2 className="notation">{g.title}</h2>
              <ul>
                {g.links.map(([label, href]) => (
                  <li key={href}>
                    <TransitionLink href={href}>{label}</TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className={`container ${styles.base}`}>
        <span>DARZ is a concept store. Products, prices and policies are demo content.</span>
        <span>© 2026 DARZ</span>
      </div>
    </footer>
  );
}
