import Header from "./components/Header";
import HeroText from "./components/HeroText";
import ApiCarousel from "./components/ApiCarousel/ApiCarousel";
import Cases from "./components/Cases";
import About from "./components/About";
import Footer from "./components/Footer";
import IntroSection from "./components/IntroSection";

export default function App() {
  return (
    <>
      <div className="texture-wrapper">
        <Header />
        <HeroText />
      </div>
      <IntroSection />
      <div style={{ clear: "both", width: "100%" }}>
        <ApiCarousel />
      </div>
      <Cases />
      <About />
      <Footer />
    </>
  );
}
