import { useNavigate } from "react-router-dom";

const categoryColors = {
  "Miljø & Energi": "#BAC3BB",
  "Transport & Kart": "#B7C2C2",
  "Økonomi & Næring": "#BABCB8",
  "Statistikk & Analyse": "#b3b6ac",
  "Forsvar & Beredskap": "#bfb7b5",
  Kommuner: "#ADB3B4",
  "Offentlig forvaltning": "#948986",
};

export default function CategoryTabsNav({ categories, activeCategory = null }) {
  const navigate = useNavigate();

  return (
    <div className="category-tabs">
      <button
        className={`category-tab${activeCategory === null ? " category-tab--active" : ""}`}
        onClick={() => navigate("/kategorier")}
      >
        Alle
      </button>
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            className={`category-tab${isActive ? " category-tab--active" : ""}`}
            style={!isActive ? { backgroundColor: categoryColors[cat] ?? "#8a9c9a" } : undefined}
            onClick={() => navigate(`/kategori/${encodeURIComponent(cat)}`)}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
