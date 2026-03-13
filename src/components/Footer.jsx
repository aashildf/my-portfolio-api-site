import "../styles/footer.css";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/aashildf",
  },
  {
    label: "LinkedIn",
    href: "#", // TODO: bytt ut med din LinkedIn-URL
  },
  {
    label: "faas0825@gmail.com",
    href: "mailto:faas0825@gmail.com",
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__about">
          <p className="site-footer__name">Åshild Færøy</p>
          <p className="site-footer__tagline">Frontendstudent — Bergen</p>
          <p className="site-footer__bio">
            Tar gjerne i mot henvendelser om jobb, samarbeid eller praksisplass.
          </p>
        </div>

        <nav className="site-footer__links" aria-label="Kontaktlenker">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="site-footer__link"
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <span>{l.label}</span>
              <span className="site-footer__arrow">→</span>
            </a>
          ))}
          <p className="site-footer__copy">© 2026 API-Studio</p>
        </nav>
      </div>
    </footer>
  );
}
