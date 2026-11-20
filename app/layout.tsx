import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BagProvider } from "@/components/BagProvider";
import { Bar } from "@/components/Bar";
import { Footer } from "@/components/Footer";
import { ApertureDefs } from "@/components/Aperture";
import { TransitionProvider } from "@/components/TransitionLink";

const archivo = localFont({
  src: "./fonts/archivo-wdth.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  fallback: ["Arial Narrow", "system-ui", "sans-serif"],
});

const martian = localFont({
  src: "./fonts/martian-mono-500.woff2",
  variable: "--font-martian",
  weight: "500",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "DARZ: menswear, constructed", template: "%s | DARZ" },
  description:
    "Kurtas, shirts, waistcoats and unstitched cloth, shown the way a tailor sees them. Cash on delivery across Pakistan.",
  openGraph: {
    title: "DARZ: menswear, constructed",
    description: "Style isn't something you put on. It's something you construct.",
    type: "website",
    locale: "en_PK",
    siteName: "DARZ",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECECE7" },
    { media: "(prefers-color-scheme: dark)", color: "#16191E" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-PK"
      className={`${archivo.variable} ${martian.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available before paint so assemble-on-enter never hides content for no-JS visitors */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <ApertureDefs />
        <TransitionProvider>
          <BagProvider>
            <Bar />
            {children}
            <Footer />
          </BagProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
