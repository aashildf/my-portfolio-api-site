import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ categories = [], apis = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Søk API..."
              className="header-search"
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
