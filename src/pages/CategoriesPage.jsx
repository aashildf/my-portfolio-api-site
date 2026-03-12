import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/api/card/CategoryCard";
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
  "Transport & Kart": "#A7B7BF",
  "Økonomi & Næring": "#88857E",
  "Statistikk & Analyse": "#C7CBC3",
  "Forsvar & Beredskap": "#BCA6A2",
  Kommuner: "#ADB3B4",
  "Offentlig forvaltning": "#8A7D7A",
};

export default function CategoriesPage({ categories }) {
  const navigate = useNavigate();

  return (
    <div className="categories-page">
      <div className="texture-wrapper categories-hero">
        <div className="categories-hero__inner">
          <h1 className="categories-hero__title">API-kategorier</h1>
          <p className="categories-hero__meta">
            Velg en kategori for å utforske tilgjengelige API-er
          </p>
        </div>
      </div>

      <div className="categories-content">
        <div className="categories-grid">
          {categories.map((cat) => {
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
