import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CategoryTabsNav from "../components/CategoryTabsNav";
import "./categoryPage.css";

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

const placeholders = [
  "Søk etter Locationforecast...",
  "Søk etter Kartverket...",
  "Søk etter akvakultur...",
  "Søk etter Tidalwater...",
  "Søk etter Enhetsregisteret...",
  "Søk etter skattemelding...",
  "Søk etter Sunrise...",
];

const categoryColors = {
  "Miljø & Energi": "#99A6A1",
  "Transport & Kart": "#8CA1AC",
  "Økonomi & Næring": "#88857E",
  "Statistikk & Analyse": "#888C84",
  "Forsvar & Beredskap": "#BCA6A2",
  Kommuner: "#8DA1A0",
  "Offentlig forvaltning": "#8A7D7A",
};

export default function CategoryPage({ apis, publisherGroups }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [phIdx, setPhIdx] = useState(0);
  const [phFading, setPhFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhFading(true);
      setTimeout(() => {
        setPhIdx((i) => (i + 1) % placeholders.length);
        setPhFading(false);
      }, 350);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const category = decodeURIComponent(slug);
  useEffect(() => { document.title = `${category} | API-Studio`; }, [category]);
  const heroColor = categoryColors[category] ?? "#A1B4B2";
  const publishers = publisherGroups[category] || [];


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
      <div className="texture-wrapper category-hero" style={{ "--hero-bg": heroColor, "--hero-img": `url(${categoryImages[category] ?? ""})` }}>
        <div className="category-hero__inner">
          {categoryImages[category] && (
            <div className="category-hero__medallion" />
          )}
          <div className="category-hero__text">
            <h1 className="category-hero__title">{category}</h1>
            <p className="category-hero__meta">
              {totalApis} API-er · {Object.keys(grouped).length} etater
            </p>
          </div>
        </div>
        <CategoryTabsNav categories={Object.keys(publisherGroups)} activeCategory={category} />
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
                placeholder={placeholders[phIdx]}
                className={`category-search${phFading ? " category-search--fading" : ""}`}
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
