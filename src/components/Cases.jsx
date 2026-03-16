import { useState, useEffect } from "react";
import "../assets/devices.min.css";
import "../styles/cases.css";
import imgCatFacts from "../assets/images/cat_facrt_animated.png";
import imgVaerapp from "../assets/images/værapp (1).png";
import imgGutendex from "../assets/images/gutendex (1).png";
import animCat from "../assets/animations/animated_cat.gif";
import animWeather from "../assets/animations/animated_weather_snow_girl.mp4";
import k1 from "../assets/images/k1.png";
import k2 from "../assets/images/k2.png";
import k3 from "../assets/images/k3.png";
import k4 from "../assets/images/k4.png";
import k5 from "../assets/images/k5.png";
import k6 from "../assets/images/k6.png";

const bookImages = [k1, k2, k3, k4, k5, k6];
// 9 items: original 6 + first 3 duplicated for seamless loop
const trackImages = [...bookImages, bookImages[0], bookImages[1], bookImages[2]];

function BookCarousel() {
  const [pos, setPos] = useState(0);
  const [noAnim, setNoAnim] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setPos((p) => p + 1);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // After snap-back (no animation), re-enable animation on next frame
  useEffect(() => {
    if (noAnim) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setNoAnim(false))
      );
    }
  }, [noAnim]);

  const handleTransitionEnd = () => {
    // pos 6 shows clones of 0,1,2 — snap back to pos 0 (same visual, no jump)
    if (pos >= 6) {
      setNoAnim(true);
      setPos(0);
    }
  };

  // Each step = 1/9 of track width = 1/3 of container
  const translatePct = (pos * 100) / trackImages.length;

  return (
    <div className="book-carousel">
      <div
        className="book-track"
        style={{
          transform: `translateX(-${translatePct}%)`,
          transition: noAnim ? "none" : "transform 0.55s cubic-bezier(0.4,0,0.2,1)",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {trackImages.map((img, i) => (
          <img key={i} src={img} alt="" className="book-img" />
        ))}
      </div>
    </div>
  );
}

const cases = [
  {
    title: "Cat Facts",
    description:
      "En liten app som henter tilfeldige kattfakta og viser dem i et enkelt kortgrensesnitt. Bygget for å utforske enkel API-henting og tilstandshåndtering.",
    api: "catfact.ninja",
    tag: "REST API",
    url: "https://aashildf.github.io/cookie-ny/",
    screen: (
      <>
        <img src={imgCatFacts} alt="Cat Facts" className="case-card__img" />
        <img src={animCat} alt="" className="case-cat-anim" />
      </>
    ),
  },
  {
    title: "Været i Bergen",
    description:
      "Værvarsel basert på posisjon. Henter sanntidsdata og viser temperatur, vind og nedbør i et rent grensesnitt tilpasset norske forhold. API-et bak værdata i Bergen kommer fra Meteorologisk institutt.",
    api: "api.met.no",
    tag: "Meteorologisk institutt",
    url: "https://aashildf.github.io/Weather-app/",
    screen: (
      <>
        <img src={imgVaerapp} alt="Været i Bergen" className="case-card__img" />
        <video
          className="case-weather-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={animWeather} type="video/mp4" />
        </video>
      </>
    ),
  },
  {
    title: "Gutenberg Book Search",
    description:
      "Søk i over 70 000 fritt tilgjengelige bøker fra Project Gutenberg. Filtrer på tittel, forfatter og språk — og last ned direkte.",
    api: "gutendex.com",
    tag: "Open Library",
    url: "https://aashildf.github.io/Gutenberg_booksearch/",
    screen: (
      <>
        <img src={imgGutendex} alt="Gutenberg Book Search" className="case-card__img" />
        <div className="book-carousel-wrapper">
          <BookCarousel />
        </div>
      </>
    ),
  },
];

export default function Cases() {
  return (
    <>
      <section className="cases-intro" id="eksempelprosjekter">
        <div className="cases-intro__inner">
          <h2 className="cases-intro__heading">
            Hva kan du bygge med offentlige API-er?
          </h2>
          <p className="cases-intro__sub">
            Offentlige API-er gjør det mulig å hente data direkte fra eksterne
            tjenester og bruke dem i egne applikasjoner. Her er noen små
            prosjekter jeg har laget, som viser hvordan slike data kan brukes
            til å lage enkle, interaktive grensesnitt. Disse eksemplene er ment
            som inspirasjon for hva du kan bygge ved å utforske de mange norske API-ene
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
                        {c.screen}
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
