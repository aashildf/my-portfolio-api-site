import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./categoryPage.css";

const categoryColors = {
  "Miljø & Energi": "#8F9F99",
  "Transport & Kart": "#9FB3BD",
  "Økonomi & Næring": "#E4E1E2",
  "Statistikk & Analyse": "#B7B9B5",
  "Forsvar & Beredskap": "#8A7D7A",
  Kommuner: "#ADB3B4",
  "Offentlig forvaltning": "#BCA6A2",
};

export default function CategoryPage({ apis, publisherGroups }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Hvilket tilbyder er valgt i venstre sidebar
  const [selectedPublisher, setSelectedPublisher] = useState(null);

  const category = decodeURIComponent(slug);
  const heroColor = categoryColors[category] ?? "#A1B4B2";
  const publishers = publisherGroups[category] || [];

  // Beregn om bakgrunnen er lys nok til å trenge mørk tekst
  const hex = heroColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  const isDark = luminance < 190;
  const heroText = isDark ? "white" : "rgba(0,0,0,0.8)";
  const heroTextMuted = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.45)";

  // Grupper API-er per utgiver
  const grouped = {};
  publishers.forEach((pub) => {
    const pubApis = apis.filter((api) => api.publisher === pub);
    if (pubApis.length > 0) grouped[pub] = pubApis;
  });

  const totalApis = Object.values(grouped).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  // "alle" = spesialverdi for å vise alle API-er samlet
  // null = ingenting valgt enda → default til "alle"
  const activePublisher = selectedPublisher ?? "alle";
  const displayedApis =
    activePublisher === "alle"
      ? Object.values(grouped).flat()
      : (grouped[activePublisher] ?? []);

  return (
    <div className="category-page">
      {/* Toppbanner med papirtekstur — samme som forsiden */}
      <div className="texture-wrapper category-hero" style={{ "--hero-bg": heroColor, "--hero-text": heroText, "--hero-text-muted": heroTextMuted }}>
        <div className="category-hero__inner">
          <div className="category-hero__toprow">
            <button className="back-btn" onClick={() => navigate("/kategorier")}>
              ← Tilbake til API-oversikt
            </button>
          </div>
          <h1 className="category-hero__title">{category}</h1>
          <p className="category-hero__meta">
            {totalApis} API-er · {Object.keys(grouped).length} etater
          </p>
        </div>
      </div>

      {/* To-kolonne layout: sidebar + API-liste */}
      <div className="category-content">
        <div className="category-layout">

          {/* Venstre: tilbyderliste */}
          <aside className="publisher-sidebar">
            <p className="publisher-sidebar__label">Tilbydere</p>

            {/* Alle-alternativ */}
            <button
              className={`publisher-item${activePublisher === "alle" ? " publisher-item--active" : ""}`}
              onClick={() => setSelectedPublisher("alle")}
            >
              <span className="publisher-item__name">Alle</span>
              <span className="publisher-item__count">{totalApis}</span>
            </button>

            {Object.entries(grouped).map(([pub, pubApis]) => (
              <button
                key={pub}
                className={`publisher-item${activePublisher === pub ? " publisher-item--active" : ""}`}
                onClick={() => setSelectedPublisher(pub)}
              >
                <span className="publisher-item__name">{pub}</span>
                <span className="publisher-item__count">{pubApis.length}</span>
              </button>
            ))}
          </aside>

          {/* Høyre: API-kort */}
          <main className="api-panel">
            {displayedApis.length === 0 ? (
              <p className="category-empty">Ingen API-er å vise.</p>
            ) : (
              displayedApis.map((api) => (
                <div
                  key={api.id}
                  className="api-row-card"
                  onClick={() => navigate(`/api/${api.id}`)}
                >
                  <div className="api-row-card__header">
                    <p className="api-row-card__name">{api.name}</p>
                    <span className="api-row-card__arrow">→</span>
                  </div>
                  <div className="api-row-card__divider" />
                  {api.description && (
                    <p className="api-row-card__desc api-row-card__desc--clamp">
                      {api.description}
                    </p>
                  )}
                </div>
              ))
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
