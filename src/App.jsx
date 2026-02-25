import { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroText from "./components/HeroText";
import ApiCarousel from "./components/ApiCarousel/ApiCarousel";
import Cases from "./components/Cases";
import About from "./components/About";
import Footer from "./components/Footer";
import IntroSection from "./components/IntroSection";

export default function App() {
  const [theme, setTheme] = useState("light");

 useEffect(() => {
   document.body.classList.remove("theme-light", "theme-dark");
   document.body.classList.add(`theme-${theme}`);
 }, [theme]);

  return (
    <>
      <div className="texture-wrapper">
        <Header
          theme={theme}
          toggleTheme={() =>
            setTheme((t) => (t === "light" ? "dark" : "light"))
          }
        />
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
