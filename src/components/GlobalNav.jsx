import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function GlobalNav({ categories = [] }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <button
        className="gnav-logo"
        onClick={() => go("/")}
        aria-label="Hjem"
      >
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
        onMouseEnter={() => setOpen(true)}
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

      <nav className={`gnav-panel${open ? " gnav-panel--open" : ""}`} onMouseLeave={() => setOpen(false)}>
        <button className="nav-item" onClick={() => go("/")}>
          Hjem
        </button>
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
        <button className="nav-item" onClick={() => {
          navigate("/");
          setOpen(false);
          setTimeout(() => document.getElementById("eksempelprosjekter")?.scrollIntoView({ behavior: "smooth" }), 100);
        }}>Eksempelprosjekter</button>
        <a className="nav-item" href="mailto:faas0825@gmail.com">Kontakt</a>
      </nav>
    </>
  );
}
