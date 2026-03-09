import Header from "../components/Header";
import HeroText from "../components/HeroText";
import ApiCarousel from "../components/api/carousel/ApiCarousel";
import IntroSection from "../components/IntroSection";
import Cases from "../components/Cases";
import About from "../components/About";
import Footer from "../components/Footer";

export default function Home({ categories, apis }) {
  return (
    <>
      <div className="texture-wrapper">
        <Header categories={categories} apis={apis} />

        <HeroText />
      </div>
      <IntroSection />

      <ApiCarousel items={categories.map((c) => ({ id: c, name: c }))} />

      <Cases />

      <About />

      <Footer />
    </>
  );
}
