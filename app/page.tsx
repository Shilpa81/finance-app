import Hero from "./components/Hero";
import ValueSection from "./components/ValueSection";
import ProductHero from "./components/PoductHero";
import ProvidersCarousel from "./components/ProvidersCarousel";
import RetirementCalculator from "./components/RetirementCalculator";


export default function Home() {
  return (
    <main>
      <Hero />
      <ValueSection />
      <ProductHero/>
      <ProvidersCarousel />
      <RetirementCalculator />
    </main>
  );
}
