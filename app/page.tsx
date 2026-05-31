import Hero from "./components/Hero";
import ValueSection from "./components/ValueSection";
import ProductHero from "./components/PoductHero.tsx";
import ProvidersCarousel from "./components/ProvidersCarousel";
// import CalendlyWidget from "./components/BookPage";


export default function Home() {
  return (
    <main>
      <Hero />
      <ValueSection />
      <ProductHero/>
      <ProvidersCarousel />
      {/* <CalendlyWidget /> */}
    </main>
  );
}
