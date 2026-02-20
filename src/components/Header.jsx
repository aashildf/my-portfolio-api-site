import {useState} from "react";

export default function Header() {
    const [open, setOpen] = useState(false);


  return (
    <header className="header">
        <div className="header-inner">

        {/* Logo */}
   <div className="logo">API Studio</div>

   {/* Navigasjon */}
    <nav className="nav">
          <div className="nav-item dropdown" onClick={() => setOpen(!open)}
          >
            API-kategorier ▾
            {open && (
              <div className="dropdown-menu">
                <a href="#">Betaling</a>
                <a href="#">Autentisering</a>
                <a href="#">Data</a>
                <a href="#">Kommunikasjon</a>
              </div>
            )}
          </div>

          <a className="nav-item" href="#">Prosjekter</a>
          <a className="nav-item" href="#">Dokumentasjon</a>
          <a className="nav-item" href="#">Om meg</a>
        </nav>

        {/* Right side */}
        <div className="header-right">
          <button className="theme-toggle">☀︎</button>
        </div>

      </div>
        
   
    </header>
  );
}
