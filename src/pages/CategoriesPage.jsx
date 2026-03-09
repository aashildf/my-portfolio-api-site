import { useNavigate } from "react-router-dom";
import "./categoriesPage.css";

const categoryColors = {
  "Miljø & Energi": "#8F9F99",
  "Transport & Kart": "#9FB3BD",
  "Økonomi & Næring": "#E4E1E2",
  "Statistikk & Analyse": "#B7B9B5",
  "Forsvar & Beredskap": "#8A7D7A",
  Kommuner: "#ADB3B4",
  "Offentlig forvaltning": "#BCA6A2",
};

export default function CategoriesPage({ categories, publisherGroups, apis }) {
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
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="watercolor-cat" x="-15%" y="-15%" width="130%" height="130%">
              <feTurbulence type="turbulence" baseFrequency="0.035" numOctaves="4" seed="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <div className="categories-grid">
          {categories.map((cat) => {
            const apiCount = apis.filter((api) =>
              publisherGroups[cat]?.includes(api.publisher)
            ).length;

            return (
              <div
                key={cat}
                className="category-card"
                style={{ "--cat-color": categoryColors[cat] ?? "#B0B0B0" }}
                onClick={() =>
                  navigate(`/kategori/${encodeURIComponent(cat)}`)
                }
              >
                <div className="category-card__blob" />
                <div className="category-card__content">
                  <h2 className="category-card__name">{cat}</h2>
                  <p className="category-card__count">{apiCount} API-er</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
