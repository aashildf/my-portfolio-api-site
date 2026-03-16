import imgA from "../assets/images/a.png";
import imgP from "../assets/images/p.png";
import imgI from "../assets/images/i.png";
import imgS from "../assets/images/s.png";
import imgT from "../assets/images/t.png";
import imgU from "../assets/images/u.png";
import imgD from "../assets/images/d.png";
import imgO from "../assets/images/o.png";
import imgHyphen from "../assets/images/hyphen.png";

const API_LETTERS = [imgA, imgP, imgI];
const STUDIO_LETTERS = [imgS, imgT, imgU, imgD, imgI, imgO];
const API_CHARS = ["A", "P", "I"];
const STUDIO_CHARS = ["S", "T", "U", "D", "I", "O"];

export default function HeroText() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-title">
          <div className="hero-title__letters">
            {API_LETTERS.map((src, i) => (
              <div key={i} className="hero-letter-wrap">
                <span className="hero-letter-shadow hero-letter-shadow--api">{API_CHARS[i]}</span>
                <img
                  src={src}
                  alt=""
                  className="hero-letter hero-letter--api"
                  draggable={false}
                />
              </div>
            ))}
            <br />
            <div className="hero-letter-wrap">
              <span className="hero-letter-shadow hero-letter-shadow--hyphen">-</span>
              <img src={imgHyphen} alt="-" className="hero-title__hyphen" draggable={false} />
            </div>
            <br />
            {STUDIO_LETTERS.map((src, i) => (
              <div key={i} className="hero-letter-wrap">
                <span className="hero-letter-shadow hero-letter-shadow--studio">{STUDIO_CHARS[i]}</span>
                <img
                  src={src}
                  alt=""
                  className="hero-letter hero-letter--studio"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
        <h2 className="hero-subtitle">
           Oversikt over alle offentlige API-er i
          Norge
        </h2>
        <h2 className="hero-tagline">Utforsk via kategori og søkefunksjon</h2>

        {/* Embosset skillelinje */}
        <div className="hero-divider" />
      </div>

      {/* Buet avslutning */}
      <div className="hero-curve"></div>
    </section>
  );
}
