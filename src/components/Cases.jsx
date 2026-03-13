import "../assets/devices.min.css";
import "../styles/cases.css";
import imgCatFacts from "../assets/images/catFacts.png";
import imgVaerapp from "../assets/images/værapp.png";
import imgGutendex from "../assets/images/gutendex (3).png";

const cases = [
  {
    title: "Cat Facts",
    description:
      "En liten app som henter tilfeldige kattfakta og viser dem i et enkelt kortgrensesnitt. Bygget for å utforske enkel API-henting og tilstandshåndtering.",
    api: "catfact.ninja",
    tag: "REST API",
    url: "https://aashildf.github.io/cookie-ny/",
    image: imgCatFacts,
  },
  {
    title: "Været i Bergen",
    description:
      "Værvarsel basert på posisjon. Henter sanntidsdata og viser temperatur, vind og nedbør i et rent grensesnitt tilpasset norske forhold. API-et bak værdata i Bergen kommer fra Meteorologisk institutt.",
    api: "api.met.no",
    tag: "Meteorologisk institutt",
    url: "https://aashildf.github.io/Weather-app/",
    image: imgVaerapp,
  },
  {
    title: "Gutenberg Book Search",
    description:
      "Søk i over 70 000 fritt tilgjengelige bøker fra Project Gutenberg. Filtrer på tittel, forfatter og språk — og last ned direkte.",
    api: "gutendex.com",
    tag: "Open Library",
    url: "https://aashildf.github.io/Gutenberg_booksearch/",
    image: imgGutendex,
  },
];

export default function Cases() {
  return (
    <>
      <section className="cases-intro">
        <div className="cases-intro__inner">
          <h2 className="cases-intro__heading">
            Hva kan du bygge med offentlige API-er?
          </h2>
          <p className="cases-intro__sub">
            Offentlige API-er gjør det mulig å hente data direkte fra eksterne
            tjenester og bruke dem i egne applikasjoner. Her er noen små
            prosjekter jeg har laget, som viser hvordan slike data kan brukes
            til å lage enkle, interaktive grensesnitt. Disse eksemplene er ment
            som inspirasjon for hva du kan bygge ved å utforske de mange API-ene
            som er tilgjengelige gjennom API-studio.
          </p>
        </div>
      </section>

      <section className="cases">
        <div className="cases__inner">
          <p className="cases-intro__label">Eksempelprosjekter</p>
          <div className="cases__grid">
            {cases.map((c) => (
              <a
                key={c.title}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="case-card"
              >
                <div className="phone-wrapper">
                  <div className="device device-iphone-x">
                    <div className="device-frame">
                      <div className="device-screen">
                        <img
                          src={c.image}
                          alt={c.title}
                          className="case-card__img"
                        />
                        <div className="case-card__overlay">
                          <p className="case-card__tag">{c.tag}</p>
                          <h3 className="case-card__title">{c.title}</h3>
                          <p className="case-card__desc">{c.description}</p>
                          <span className="case-card__cta">Åpne app →</span>
                        </div>
                      </div>
                    </div>
                    <div className="device-stripe" />
                    <div className="device-header" />
                    <div className="device-sensors" />
                    <div className="device-btns" />
                    <div className="device-power" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
