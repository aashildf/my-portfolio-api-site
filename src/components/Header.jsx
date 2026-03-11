import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import imgA from "../assets/images/a.png";
import imgS from "../assets/images/s.png";
import imgT from "../assets/images/t.png";
import imgU from "../assets/images/u.png";
import imgD from "../assets/images/d.png";
import imgI from "../assets/images/i.png";
import imgO from "../assets/images/o.png";
import imgHamburger from "../assets/images/hamburgermeny.png";
import imgClose from "../assets/images/x-close.png";

export default function Header({ categories = [], apis = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef(null);

  const startCloseTimer = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 200);
  };
  const cancelCloseTimer = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const closeAll = () => {
    setMenuOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const go = (path) => {
    navigate(path);
    closeAll();
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
        <button className="logo" onClick={() => navigate("/")} aria-label="Hjem">
          <img src={imgA} className="logo__a" alt="A" draggable={false} />
          <div className="logo__studio-row">
            {[imgS, imgT, imgU, imgD, imgI, imgO].map((src, i) => (
              <img key={i} src={src} className="logo__studio-letter" alt="" draggable={false} />
            ))}
          </div>
        </button>

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

        {/* Hamburger */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          onMouseEnter={() => { cancelCloseTimer(); setMenuOpen(true); }}
          onMouseLeave={startCloseTimer}
          aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
        >
          <img
            src={menuOpen ? imgClose : imgHamburger}
            alt=""
            className="hamburger-icon"
            draggable={false}
          />
        </button>

        {/* Slide-in panel */}
        <nav
          className={`nav ${menuOpen ? "active" : ""}`}
          onMouseEnter={cancelCloseTimer}
          onMouseLeave={startCloseTimer}
        >
          <p className="nav-section-label">API-kategorier</p>
          <button className="nav-item" onClick={() => go("/kategorier")}>
            Alle
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className="nav-item"
              onClick={() => go(`/kategori/${encodeURIComponent(cat)}`)}
            >
              {cat}
            </button>
          ))}
          <div className="nav-divider" />
          <a className="nav-item" href="#">Prosjekter</a>
          <a className="nav-item" href="#">Dokumentasjon</a>
          <a className="nav-item" href="#">Kontakt</a>
        </nav>
      </div>

      {/* Backdrop — lukker søk ved klikk utenfor */}
      {searchResults.length > 0 && (
        <div
          className="search-overlay"
          onClick={() => {
            setSearchQuery("");
            setSearchResults([]);
          }}
        />
      )}
      {menuOpen && <div className="menu-overlay" onClick={closeAll} />}
    </header>
  );
}
