import { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroText from "./components/HeroText";
import ApiCarousel from "./components/ApiCarousel/ApiCarousel";
import Cases from "./components/Cases";
import About from "./components/About";
import Footer from "./components/Footer";
import IntroSection from "./components/IntroSection";
import { fetchApis } from "./data/fetchApis";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [apis, setApis] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  useEffect(() => {
    fetchApis()
      .then((cleanData) => {
        setApis(cleanData);

        const allKeywords = [
          ...new Set(cleanData.flatMap((api) => api.keywords).filter(Boolean)),
        ];

        setCategories(allKeywords);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="texture-wrapper">
        <Header
          theme={theme}
          categories={categories}
          toggleTheme={() =>
            setTheme((t) => (t === "light" ? "dark" : "light"))
          }
        />
        <HeroText />
      </div>

      <IntroSection />

      <div style={{ clear: "both", width: "100%" }}>
        <ApiCarousel items={apis} />
      </div>

      <Cases />
      <About />
      <Footer />
    </>
  );
}
