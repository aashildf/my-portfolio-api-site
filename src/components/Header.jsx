import { useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Header({
  theme,
  toggleTheme,
  categories = [],
  onSearch,
  onSelectCategory,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);

  const closeAll = () => {
    setMenuOpen(false);
    setMobileDropdown(false);
  };

  const handleCategoryClick = (categoryName) => {
    onSelectCategory?.(categoryName);
    closeAll();
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
          {/* 🔥 KATEGORIER */}
          <div
            className="nav-item dropdown"
            onClick={() =>
              window.innerWidth <= 1024 && setMobileDropdown(!mobileDropdown)
            }
          >
            API-kategorier ▾
            <div
              className={`dropdown-menu ${mobileDropdown ? "mobile-show" : ""}`}
            >
              {/* Alle */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(null);
                }}
              >
                Alle
              </a>

              {/* Dynamiske kategorier */}
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(cat.name);
                  }}
                >
                  {cat.name}
                </a>
              ))}
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

        {/* 🔥 SØK + TEMA */}
        <div className="header-right">
          <input
            type="text"
            placeholder="Søk API..."
            className="header-search"
            onChange={(e) => onSearch?.(e.target.value)}
          />

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
