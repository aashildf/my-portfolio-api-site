import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchApis } from "./data/fetchApis";
import publisherGroups from "./data/publisherGroups";
import ScrollToTop from "./components/ScrollToTop";
import GlobalNav from "./components/GlobalNav";
import BackToTopButton from "./components/BackToTopButton";
import Home from "./pages/Home";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import ApiDetail from "./components/api/views/ApiDetail";

export default function App() {
  const [apis, setApis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hent API-er
  useEffect(() => {
    async function load() {
      try {
        const cleanData = await fetchApis();
        setApis(cleanData);
      } catch (err) {
        console.error("FEIL I FRONTEND:", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const categories = Object.keys(publisherGroups);

  return (
    <>
      <ScrollToTop />
      <GlobalNav categories={categories} apis={apis} />
      <BackToTopButton />
      <Routes>
        <Route
          path="/"
          element={
            <Home categories={categories} apis={apis} />
          }
        />

        <Route
          path="/kategorier"
          element={
            <CategoriesPage
              categories={categories}
              publisherGroups={publisherGroups}
              apis={apis}
            />
          }
        />

        <Route
          path="/kategori/:slug"
          element={<CategoryPage apis={apis} publisherGroups={publisherGroups} />}
        />

        <Route path="/api/:id" element={<ApiDetail apis={apis} isLoading={isLoading} publisherGroups={publisherGroups} />} />
      </Routes>
    </>
  );
}
