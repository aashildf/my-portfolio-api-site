import { useNavigate } from "react-router-dom";

const categoryColors = {
  "Miljø & Energi": "#FDFAFA",
  "Transport & Kart": "#FDFAFA",
  "Økonomi & Næring": "#FDFAFA",
  "Statistikk & Analyse": "#FDFAFA",
  "Forsvar & Beredskap": "#FDFAFA",
  Kommuner: "#FDFAFA",
  "Offentlig forvaltning": "#FDFAFA",
};

export default function CategoryTabsNav({ categories, activeCategory = null }) {
  const navigate = useNavigate();

  return (
    <div className="category-tabs">
      <button
        className={`category-tab${activeCategory === null ? " category-tab--active" : ""}`}
        style={
          activeCategory !== null ? { backgroundColor: "#FDFAFA" } : undefined
        }
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
            style={
              !isActive
                ? { backgroundColor: categoryColors[cat] ?? "#FDFAFA" }
                : undefined
            }
            onClick={() => navigate(`/kategori/${encodeURIComponent(cat)}`)}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
