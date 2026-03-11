import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./globalNav.css";

import imgA from "../assets/images/a.png";
import imgS from "../assets/images/s.png";
import imgT from "../assets/images/t.png";
import imgU from "../assets/images/u.png";
import imgD from "../assets/images/d.png";
import imgI from "../assets/images/i.png";
import imgO from "../assets/images/o.png";
import imgHamburger from "../assets/images/hamburgermeny.png";
import imgClose from "../assets/images/x-close.png";

export default function GlobalNav({ categories = [], apis = [] }) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Forsiden har hamburger i Header — ikke vis to stykker
  if (pathname === "/" || pathname === "") return null;

  const go = (path) => {
    navigate(path);
    setOpen(false);
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
    <>
      {/* Logo øverst til venstre — lenke hjem */}
      <button className="gnav-logo" onClick={() => navigate("/")} aria-label="Hjem">
        <img src={imgA} className="logo__a" alt="A" draggable={false} />
        <div className="logo__studio-row">
          {[imgS, imgT, imgU, imgD, imgI, imgO].map((src, i) => (
            <img key={i} src={src} className="logo__studio-letter" alt="" draggable={false} />
          ))}
        </div>
      </button>

      <button
        className="gnav-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Lukk meny" : "Åpne meny"}
      >
        <img
          src={open ? imgClose : imgHamburger}
          alt=""
          className="hamburger-icon"
          draggable={false}
        />
      </button>

      {open && <div className="gnav-overlay" onClick={() => setOpen(false)} />}

      <nav className={`gnav-panel${open ? " gnav-panel--open" : ""}`}>
        {/* Søk */}
        <div className="gnav-search-wrapper">
          <input
            type="text"
            placeholder="Søk API..."
            className="gnav-search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="gnav-search-results">
              {searchResults.map((api) => (
                <button
                  key={api.id}
                  className="gnav-search-item"
                  onClick={() => go(`/api/${api.id}`)}
                >
                  <span className="gnav-search-item__name">{api.name}</span>
                  <span className="gnav-search-item__pub">{api.publisher}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="nav-divider" />
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
    </>
  );
}
