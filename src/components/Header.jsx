import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const placeholders = [
  "Søk etter Locationforecast...",
  "Søk etter Kartverket...",
  "Søk etter akvakultur...",
  "Søk etter Tidalwater...",
  "Søk etter Enhetsregisteret...",
  "Søk etter skattemelding...",
  "Søk etter Sunrise...",
];

export default function Header({ categories = [], apis = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [phIdx, setPhIdx] = useState(0);
  const [phFading, setPhFading] = useState(false);
  const inputRef = useRef(null);

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
  const navigate = useNavigate();

  const go = (path) => {
    navigate(path);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    const q = value.toLowerCase();
    const results = apis
      .filter(
        (api) =>
          api.name?.toLowerCase().includes(q) ||
          api.publisher?.toLowerCase().includes(q) ||
          api.description?.toLowerCase().includes(q)
      )
      .slice(0, 6);
    setSearchResults(results);
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* Senter: dropdown + søk */}
        <div className="header-center">
          <div className="header-dropdown">
            <button className="header-dropdown__trigger">
              API-kategorier ▾
            </button>
            <div className="header-dropdown__menu">
              <button
                className="header-dropdown__item"
                onClick={() => go("/kategorier")}
              >
                Alle
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="header-dropdown__item"
                  onClick={() => go(`/kategori/${encodeURIComponent(cat)}`)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="search-wrapper" onMouseEnter={() => inputRef.current?.focus()}>
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" className="search-icon-circle"/>
              <line x1="15.5" y1="15.5" x2="21" y2="21" className="search-icon-line"/>
            </svg>
            <input
              type="text"
              placeholder={placeholders[phIdx]}
              className={`header-search${phFading ? " header-search--fading" : ""}`}
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((api) => (
                  <button
                    key={api.id}
                    className="search-result-item"
                    onClick={() => go(`/api/${api.id}`)}
                  >
                    <span className="search-result-name">{api.name}</span>
                    <span className="search-result-pub">{api.publisher}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div
          className="search-overlay"
          onClick={() => {
            setSearchQuery("");
            setSearchResults([]);
          }}
        />
      )}
    </header>
  );
}
