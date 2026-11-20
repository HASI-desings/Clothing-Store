import type { Metadata } from "next";
import { TransitionLink } from "@/components/TransitionLink";
import styles from "./placeholder.module.css";

/* Every page other than the homepage is still on the cutting table.
   This keeps links working (no 404s) and says so plainly. */

export const metadata: Metadata = { title: "Being cut", robots: { index: false } };

export default async function Placeholder({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const name = slug[slug.length - 1].replace(/-/g, " ");
  return (
    <main id="main" className={styles.main}>
      <div className="container">
        <p className="notation" style={{ color: "var(--color-accent)" }}>/{slug.join("/")}</p>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.text}>This page is still on the cutting table. The homepage is the first piece of DARZ to be finished.</p>
        <TransitionLink href="/" className="btn">Back to the homepage</TransitionLink>
      </div>
    </main>
  );
}
