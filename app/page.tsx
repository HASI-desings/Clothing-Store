import { ConstructionNote } from "@/components/ConstructionNote";
import { Exhibition } from "@/components/Exhibition";
import { Hero } from "@/components/Hero";
import { MaterialStudy } from "@/components/MaterialStudy";
import { Rooms } from "@/components/Rooms";
import { StudioTeaser } from "@/components/StudioTeaser";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "DARZ",
  description: "Menswear shown the way a tailor sees it: kurtas, shirts, waistcoats and unstitched cloth.",
  areaServed: "PK",
  currenciesAccepted: "PKR",
  paymentAccepted: "Cash on delivery",
};

export default function Home() {
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Exhibition />
      <MaterialStudy />
      <StudioTeaser />
      <Rooms />
      <ConstructionNote />
    </main>
  );
}
