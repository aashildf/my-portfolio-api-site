import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { fetchApis } from "./data/fetchApis";
import publisherGroups from "./data/publisherGroups";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [apis, setApis] = useState([]);

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

  return (
    // <div className="texture-wrapper">
    // <Header
    //   theme={theme}
    //   categories={categories}
    //   toggleTheme={() =>
    //     setTheme((t) => (t === "light" ? "dark" : "light"))
    //   }
    // />

    <Routes>
      <Route
        path="/"
        element={
          <Home categories={categories} theme={theme} setTheme={setTheme} />
        }
      />

      <Route
        path="/kategori/:slug"
        element={<CategoryPage apis={apis} publisherGroups={publisherGroups} />}
      />
    </Routes>
  );
}
