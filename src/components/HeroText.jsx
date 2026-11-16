import { useEffect, useRef, useState } from "react";
import { startDotJourney, FIRST_TRIGGER_SELECTOR, FIRST_TRIGGER_AT } from "./dotJourney";
import { BALL_SVG } from "./dotBallSvg";
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
  // "idle"   = prikken sitter på i-en og hinter om klikk
  // "away"   = prikken er på reise nedover siden (ett sprett per klikk),
  //            helt til den spretter tilbake hit igjen
  const [dotPhase, setDotPhase] = useState("idle");
  const cancelJourneyRef = useRef(null);
  const dotRef = useRef(null);

  // Fjern kula hvis man navigerer bort fra forsiden
  useEffect(() => () => cancelJourneyRef.current?.(), []);

  // followCamera: true ved klikk (siden scroller etter kula),
  // false når kula starter fordi brukeren selv scroller
  const startJourney = (followCamera) => {
    if (!dotRef.current) return;
    cancelJourneyRef.current?.();
    cancelJourneyRef.current = startDotJourney({
      startEl: dotRef.current,
      followCamera,
      onReturned: () => {
        cancelJourneyRef.current = null;
        setDotPhase("idle");
      },
    });
    setDotPhase("away");
  };

  const handleDotClick = () => {
    if (dotPhase !== "away") startJourney(true);
  };

  // Har man ikke klikket, men scroller nedover forbi "Utforsk",
  // spretter prikken ned av seg selv
  useEffect(() => {
    if (dotPhase !== "idle") return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > lastY;
      lastY = y;
      if (!down) return;
      const word = document.querySelector(FIRST_TRIGGER_SELECTOR);
      if (word && word.getBoundingClientRect().top < window.innerHeight * FIRST_TRIGGER_AT) {
        startJourney(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dotPhase]);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-title">
          <div className="hero-title__letters">
            {API_LETTERS.map((src, i) => (
              <div key={i} className={`hero-letter-wrap${i === 2 ? " hero-letter-wrap--accent-i" : ""}`}>
                <span className="hero-letter-shadow hero-letter-shadow--api">{API_CHARS[i]}</span>
                <img
                  src={src}
                  alt=""
                  className="hero-letter hero-letter--api"
                  draggable={false}
                />
                {i === 2 && (
                  <>
                    <button
                      ref={dotRef}
                      type="button"
                      className={`hero-letter-idot hero-letter-idot--${dotPhase}`}
                      onClick={handleDotClick}
                      aria-label="Klikk på prikken og se hvor den spretter"
                      title="Klikk meg!"
                      disabled={dotPhase === "away"}
                    >
                      <span
                        className="dot-ball hero-idot-ball"
                        dangerouslySetInnerHTML={{ __html: BALL_SVG }}
                      />
                    </button>
                    <span className={`hero-dot-shadow hero-dot-shadow--${dotPhase}`} aria-hidden="true">●</span>
                  </>
                )}
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
