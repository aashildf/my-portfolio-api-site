import { useEffect, useState, useMemo } from "react";
import Header from "./components/Header";
import HeroText from "./components/HeroText";
import ApiCarousel from "./components/api/carousel/ApiCarousel";
import ApiList from "./components/api/ApiList";
import Cases from "./components/Cases";
import About from "./components/About";
import Footer from "./components/Footer";
import IntroSection from "./components/IntroSection";
import { fetchApis } from "./data/fetchApis";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [apis, setApis] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Tema
  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  // Hent API-er
  useEffect(() => {
    async function load() {
      try {
        const cleanData = await fetchApis();
        setApis(cleanData);
      } catch (err) {
        console.error("FEIL I FRONTEND:", err);
      }
    }
    load();
  }, []);

  // 🔥 Lag kategorier basert på publisher
  const categories = useMemo(() => {
    return Object.values(
      apis.reduce((acc, api) => {
        const key = api.publisher;
        if (!acc[key]) {
          acc[key] = {
            id: key,
            name: key,
          };
        }
        return acc;
      }, {}),
    );
  }, [apis]);

  // 🔥 Filtrer API-er
  const filteredApis = useMemo(() => {
    return apis.filter((api) => {
      const matchesCategory = selectedCategory
        ? api.publisher === selectedCategory
        : true;

      const matchesSearch =
        api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        api.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [apis, selectedCategory, searchTerm]);

  return (
    <>
      <div className="texture-wrapper">
        <Header
          theme={theme}
          categories={categories}
          onSearch={setSearchTerm}
          onSelectCategory={setSelectedCategory}
          toggleTheme={() =>
            setTheme((t) => (t === "light" ? "dark" : "light"))
          }
        />
        <HeroText />
      </div>

      <IntroSection />

      {/* 🔥 Karusell viser kategorier */}
      <ApiCarousel
        items={categories}
        onSelect={(cat) => setSelectedCategory(cat.name)}
      />

      {/* 🔥 Liste viser filtrerte API-er */}
      <ApiList apis={filteredApis} />

      <Cases />
      <About />
      <Footer />
    </>
  );
}
