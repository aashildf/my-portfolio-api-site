import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/api/card/CategoryCard";
import Header from "../components/Header";
import "./categoriesPage.css";

import imgStatistikk from "../assets/images/statistikk.jpg";
import imgKommuner from "../assets/images/kommune.jpg";
import imgMiljo from "../assets/images/miljo.jpg";
import imgTransport from "../assets/images/transport.jpg";
import imgOkonomi from "../assets/images/okonomi.jpg";
import imgForsvar from "../assets/images/forsvar.jpg";
import imgForvaltning from "../assets/images/forvaltning.jpg";

const categoryImages = {
  "Statistikk & Analyse": imgStatistikk,
  Kommuner: imgKommuner,
  "Miljø & Energi": imgMiljo,
  "Transport & Kart": imgTransport,
  "Økonomi & Næring": imgOkonomi,
  "Forsvar & Beredskap": imgForsvar,
  "Offentlig forvaltning": imgForvaltning,
};

const categoryColors = {
  "Miljø & Energi": "#99A6A1",
  "Transport & Kart": "#8CA1AC",
  "Økonomi & Næring": "#88857E",
  "Statistikk & Analyse": "#888C84",
  "Forsvar & Beredskap": "#BCA6A2",
  Kommuner: "#8DA1A0",
  "Offentlig forvaltning": "#8A7D7A",
};

export default function CategoriesPage({ categories, apis }) {
  const navigate = useNavigate();
  useEffect(() => { document.title = "Kategorier | API-Studio"; }, []);

  return (
    <div className="categories-page texture-wrapper">
      <Header categories={categories} apis={apis} />
      <div className="categories-content">
        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              key={cat}
              className="categories-grid__item"
              onClick={() => navigate(`/kategori/${encodeURIComponent(cat)}`)}
            >
              <CategoryCard
                name={cat}
                image={categoryImages[cat]}
                color={categoryColors[cat]}
                showStamp={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
