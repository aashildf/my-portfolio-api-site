import { useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import { useNavigate } from "react-router-dom";



export default function Header({
  theme,
  toggleTheme,
  categories = [],
  onSearch,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const navigate = useNavigate();

  const closeAll = () => {
    setMenuOpen(false);
    setMobileDropdown(false);
  };

 const handleSelect = (value) => {
   if (!value) {
     navigate("/");
   } else {
     navigate(`/kategori/${encodeURIComponent(value)}`);
   }
   closeAll();
 };

  console.log("HEADER categories:", categories);

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
          {/* KATEGORIER */}
          <div
            className="nav-item dropdown"
            onClick={() =>
              window.innerWidth <= 1024 && setMobileDropdown(!mobileDropdown)
            }
          >
            <span className="dropdown-trigger">API-kategorier ▾</span>
            <div
              className={`dropdown-menu ${mobileDropdown ? "mobile-show" : ""}`}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(null);
                }}
              >
                Alle
              </a>

              {categories.map((cat) => (
                <a
                  key={cat}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelect(cat);
                  }}
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
          {/* ✅ VIKTIG: dropdown-diven lukkes her */}

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
