import Header from "./components/Header";
import HeroText from "./components/HeroText";
import ApiCarousel from "./components/ApiCarousel/ApiCarousel";
import Cases from "./components/Cases";
import About from "./components/About";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <HeroText />
      <ApiCarousel />
      <Cases />
      <About />
      <Footer />
    </>
  );
}
