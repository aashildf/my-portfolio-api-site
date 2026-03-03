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
import ApiDetail from "./components/api/ApiDetail";

const publisherGroups = {
  "Miljø & Energi": [
    "Miljødirektoratet",
    "Norges vassdrags- og energidirektorat",
    "Norges vassdrags- og energidirektorat (nve)",
    "Meteorologisk institutt",
    "Norsk institutt for bioøkonomi",
  ],
  "Transport & Kart": [
    "Statens kartverk",
    "Norge i bilder",
    "Statens vegvesen",
  ],
  "Økonomi & Næring": [
    "Skatteetaten",
    "Registerenheten i brønnøysund",
    "Patentstyret",
  ],
  Utdanning: ["Utdanningsdirektoratet", "Statens lånekasse for utdanning"],
  "Statistikk & Analyse": ["Statistisk sentralbyrå"],
  "Forsvar & Beredskap": ["Forsvarsbygg"],
  Kommuner: ["Oslo kommune oslo origo", "Vestland fylkeskommune"],
  "Offentlig forvaltning": [
    "Digitaliseringsdirektoratet",
    "Direktoratet for byggkvalitet",
    "Barne-, ungdoms- og familiedirektoratet",
  ],
};

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

  const categories = Object.keys(publisherGroups);

  //  Filtrer API-er
  const filteredApis = useMemo(() => {
    return apis.filter((api) => {
      const matchesCategory = selectedCategory
        ? publisherGroups[selectedCategory]?.includes(api.publisher)
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

      {/*  Karusell viser kategorier */}
      <ApiCarousel
        items={categories.map((c) => ({ id: c, name: c }))}
        onSelect={setSelectedCategory}
      />

      {/* Vis liste kun hvis kategori eller søk er brukt */}
      {(selectedCategory || searchTerm) && <ApiList apis={filteredApis} />}

      <Cases />
      <About />
      <Footer />
    </>
  );
}
