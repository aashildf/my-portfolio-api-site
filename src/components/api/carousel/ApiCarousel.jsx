import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../card/CategoryCard";
import "./carousel.css";

import imgStatistikk from "../../../assets/images/statistikk.jpg";
import imgKommuner from "../../../assets/images/kommune.jpg";
import imgMiljo from "../../../assets/images/miljo.jpg";
import imgTransport from "../../../assets/images/transport.jpg";
import imgOkonomi from "../../../assets/images/okonomi.jpg";
import imgForsvar from "../../../assets/images/forsvar.jpg";
import imgForvaltning from "../../../assets/images/forvaltning.jpg";

const categoryImages = {
  "Statistikk & Analyse": imgStatistikk,
  Kommuner: imgKommuner,
  "Miljø & Energi": imgMiljo,
  "Transport & Kart": imgTransport,
  "Økonomi & Næring": imgOkonomi,
  "Forsvar & Beredskap": imgForsvar,
  "Offentlig forvaltning": imgForvaltning,
};

const categoryColors = {
  "Miljø & Energi": "#99A6A1",
  "Transport & Kart": "#A7B7BF",
  "Økonomi & Næring": "#88857E",
  "Statistikk & Analyse": "#555C50",
  "Forsvar & Beredskap": "#BCA6A2",
  Kommuner: "#ADB3B4",
  "Offentlig forvaltning": "#8A7D7A",
};

const FACE_WIDTH = 260;

export default function ApiCarousel({ items }) {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const navigate = useNavigate();
  const isPaused = useRef(false);

  const count = items?.length ?? 0;
  if (!items || items.length === 0) return null;

  const goTo = (idx) => {
    const i = ((idx % count) + count) % count;
    setActiveIndex(i);
  };

  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  // Scroll entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance
  useEffect(() => {
    if (count === 0) return;
    const id = setInterval(() => {
      if (!isPaused.current) next();
    }, 4000);
    return () => clearInterval(id);
  }, [count, activeIndex]);

  // Drag (swipe) – bare bytter activeIndex
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    let startX = 0;
    let dragging = false;

    const onDown = (e) => {
      startX = e.clientX;
      dragging = true;
    };

    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 60) {
        if (dx > 0) prev();
        else next();
        dragging = false;
      }
    };

    const onUp = () => {
      dragging = false;
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [activeIndex, count]);

  return (
    <section
      className={`carousel-section${visible ? " carousel-section--visible" : ""}`}
      ref={sectionRef}
      onMouseEnter={() => {
        isPaused.current = true;
      }}
      onMouseLeave={() => {
        isPaused.current = false;
      }}
    >
      <p className="carousel-label">Bla gjennom kategoriene</p>

      <div className="carousel-3d-stage" ref={stageRef}>
        <button
          className="carousel-arrow carousel-arrow--left"
          onClick={prev}
          aria-label="Forrige"
        >
          ‹
        </button>

        <div className="carousel-3d-perspective">
          <div
            className="carousel-3d-cylinder"
            style={{
              width: FACE_WIDTH,
              transformStyle: "preserve-3d",
              position: "relative",
              height: "100%",
            }}
          >
            {items.map((item, i) => {
              const rawDist = Math.abs(i - activeIndex);
              const dist = Math.min(rawDist, count - rawDist);

              const side =
                (i - activeIndex + count) % count > count / 2 ? -1 : 1;

              const offset = dist * 220 * side;
              const tilt = side * -18 * dist;
              const depth =
                dist === 0 ? 120 : dist === 1 ? 0 : dist === 2 ? -80 : -140;

              const opacity =
                dist === 0 ? 1 : dist === 1 ? 0.72 : dist === 2 ? 0.18 : 0;

              return (
                <div
                  key={item.id}
                  className="carousel-3d-face"
                  style={{
                    width: `${FACE_WIDTH}px`,
                    transform: `
                      translateX(calc(-50% + ${offset}px))
                      translateZ(${depth}px)
                      rotateY(${tilt}deg)
                    `,
                    opacity,
                    transition:
                      "transform 0.6s cubic-bezier(.22,.61,.36,1), opacity 0.4s ease",
                  }}
                  onClick={() =>
                    navigate(`/kategori/${encodeURIComponent(item.id)}`)
                  }
                >
                  <CategoryCard
                    name={item.name}
                    image={categoryImages[item.id]}
                    color={categoryColors[item.id]}
                    count={item.count}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="carousel-arrow carousel-arrow--right"
          onClick={next}
          aria-label="Neste"
        >
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {items.map((item, i) => (
          <button
            key={item.id}
            className={`carousel-dot${
              i === activeIndex ? " carousel-dot--active" : ""
            }`}
            onClick={() => goTo(i)}
            aria-label={item.name}
          />
        ))}
      </div>
    </section>
  );
}
