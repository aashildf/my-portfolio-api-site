import "../styles/introSection.css";

export default function IntroSection() {
  return (
    <section className="intro-section">
      <div className="container intro-grid">
        <h2 className="intro-title">Utforsk Norges offentlige API-landskap</h2>

        <div className="intro-text">
          API-studio er en samlet oversikt over API-er fra norske offentlige
          etater. Her kan du oppdage hvilke data som finnes, hvem som tilbyr
          dem, og hvordan de kan brukes. Per i dag samler API-studio{" "}
          <strong>583 API-er</strong> fra <strong>14 etater</strong>.
        </div>

        <div className="intro-list">
          Plattformen gjør det enklere å:
          <ul>
            <li>finne API-er fra ulike etater</li>
            <li>forstå hva slags data som er tilgjengelig</li>
            <li>utforske dokumentasjon og integrasjonsmuligheter</li>
            <li>få oversikt over det offentlige API-økosystemet</li>
          </ul>
        </div>

      </div>
    </section>
  );
}
