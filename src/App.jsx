import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchApis } from "./data/fetchApis";
import publisherGroups from "./data/publisherGroups";
import ScrollToTop from "./components/ScrollToTop";
import GlobalNav from "./components/GlobalNav";
import Home from "./pages/Home";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import ApiDetail from "./components/api/views/ApiDetail";

export default function App() {
  const [apis, setApis] = useState([]);

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
    <>
      <ScrollToTop />
      <GlobalNav categories={categories} />
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

        <Route path="/api/:id" element={<ApiDetail apis={apis} publisherGroups={publisherGroups} />} />
      </Routes>
    </>
  );
}
