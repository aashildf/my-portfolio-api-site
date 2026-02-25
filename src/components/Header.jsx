import { useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";


export default function Header({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  const closeAll = () => {
    setMenuOpen(false);
    setMobileDropdown(false);
  };


  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">API Studio</div>

        <button
          className={`mobile-menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <div
            className="nav-item dropdown"
            /* På mobil toggler vi klikk, på desktop styres det av CSS :hover */
            onClick={() =>
              window.innerWidth <= 1024 && setMobileDropdown(!mobileDropdown)
            }
          >
            API-kategorier ▾
            <div
              className={`dropdown-menu ${mobileDropdown ? "mobile-show" : ""}`}
            >
              <a href="#" onClick={closeAll}>
                Betaling
              </a>
              <a href="#" onClick={closeAll}>
                Autentisering
              </a>
              <a href="#" onClick={closeAll}>
                Data
              </a>
              <a href="#" onClick={closeAll}>
                Kommunikasjon
              </a>
            </div>
          </div>

          <a className="nav-item" href="#" onClick={closeAll}>
            Prosjekter
          </a>
          <a className="nav-item" href="#" onClick={closeAll}>
            Dokumentasjon
          </a>
          <a className="nav-item" href="#" onClick={closeAll}>
            Kontakt
          </a>
        </nav>

        <div className="header-right">
          <ThemeToggleButton
            pressed={theme === "dark"}
            onToggle={toggleTheme}
          />
        </div>
      </div>

      {menuOpen && <div className="menu-overlay" onClick={closeAll}></div>}
    </header>
  );
}
