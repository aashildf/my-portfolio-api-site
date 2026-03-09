import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./globalNav.css";

export default function GlobalNav({ categories = [] }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Forsiden har hamburger i Header — ikke vis to stykker
  if (pathname === "/" || pathname === "") return null;

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <button
        className={`gnav-btn${open ? " gnav-btn--open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Åpne meny"
      >
        <span />
        <span />
        <span />
      </button>

      {open && <div className="gnav-overlay" onClick={() => setOpen(false)} />}

      <nav className={`gnav-panel${open ? " gnav-panel--open" : ""}`}>
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
