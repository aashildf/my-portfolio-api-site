import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./categoryPage.css";

const categoryColors = {
  "Miljø & Energi": "#CACEC7",
  "Transport & Kart": "#ced9df",
  "Økonomi & Næring": "#F7EAC8",
  "Statistikk & Analyse": "#b3b6ac",
  "Forsvar & Beredskap": "#bfb7b5",
  Kommuner: "#ADB3B4",
  "Offentlig forvaltning": "#c2a8a4",
};

export default function CategoryPage({ apis, publisherGroups }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const category = decodeURIComponent(slug);
  const heroColor = categoryColors[category] ?? "#A1B4B2";
  const publishers = publisherGroups[category] || [];

  const hex = heroColor.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (r * 299 + g * 587 + b * 114) / 1000;
  const isDark = luminance < 190;
  const heroText = isDark ? "white" : "rgba(0,0,0,0.8)";
  const heroTextMuted = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.45)";

  const grouped = {};
  publishers.forEach((pub) => {
    const pubApis = apis.filter((api) => api.publisher === pub);
    if (pubApis.length > 0) grouped[pub] = pubApis;
  });

  const totalApis = Object.values(grouped).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const activePublisher = selectedPublisher ?? "alle";
  const publisherFiltered =
    activePublisher === "alle"
      ? Object.values(grouped).flat()
      : (grouped[activePublisher] ?? []);

  const displayedApis = searchQuery.trim()
    ? publisherFiltered.filter(
        (api) =>
          api.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          api.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : publisherFiltered;

  return (
    <div className="category-page">
      <div className="texture-wrapper category-hero" style={{ "--hero-bg": heroColor, "--hero-text": heroText, "--hero-text-muted": heroTextMuted }}>
        <div className="category-hero__inner">
          <h1 className="category-hero__title">{category}</h1>
          <p className="category-hero__meta">
            {totalApis} API-er · {Object.keys(grouped).length} etater
          </p>
        </div>
      </div>

      <div className="category-content">
        <div className="category-layout">

          {/* Venstre: tilbyderliste + søk + tilbake */}
          <aside className="publisher-sidebar">
            <button className="category-back-btn" onClick={() => navigate("/kategorier")}>
              ← Alle kategorier
            </button>

            <div className="category-search-wrapper">
              <input
                type="text"
                placeholder="Søk i API-er..."
                className="category-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <p className="publisher-sidebar__label">Tilbydere</p>

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
