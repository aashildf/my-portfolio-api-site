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

export default function ApiCarousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef(null);
  const dragStartRef = useRef(null);
  const dragHappenedRef = useRef(false);
  const isPausedRef = useRef(false);

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
    "Statistikk & Analyse": "#C7CBC3",
    "Forsvar & Beredskap": "#BCA6A2",
    Kommuner: "#ADB3B4",
    "Offentlig forvaltning": "#8A7D7A",
  };

  const count = items?.length ?? 0;
  const prevIndex = (activeIndex - 1 + count) % count;
  const nextIndex = (activeIndex + 1) % count;

  // Scroll-triggered entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => {
      if (!isPausedRef.current) {
        setActiveIndex((i) => (i + 1) % count);
      }
    }, 5000);
    return () => clearInterval(id);
  }, [count]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    // pointerdown på scenen starter draget
    const onDown = (e) => {
      if (e.target.closest("button")) return; // ikke forstyrr pil-klikk
      dragStartRef.current = e.clientX;
      dragHappenedRef.current = false;
    };

    // pointermove og pointerup lytter på window — da mister vi aldri
    // slipp-hendelsen selv om pekeren glir utenfor scenen.
    const onWindowMove = (e) => {
      if (dragStartRef.current === null) return;
      if (Math.abs(e.clientX - dragStartRef.current) > 8) {
        dragHappenedRef.current = true;
      }
    };

    const onWindowUp = (e) => {
      if (dragStartRef.current === null) return;
      const dx = e.clientX - dragStartRef.current;
      dragStartRef.current = null;
      if (dx > 50) setActiveIndex((i) => (i - 1 + count) % count);
      else if (dx < -50) setActiveIndex((i) => (i + 1) % count);
    };

    // Capture-phase click-blocker: hindrer at et drag trigger onClick på slot
    const onClickCapture = (e) => {
      if (dragHappenedRef.current) {
        e.stopPropagation();
        dragHappenedRef.current = false;
      }
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowUp);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("pointerup", onWindowUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [count]);

  if (!items || items.length === 0) return null;

  const slots = [
    { item: items[prevIndex], position: "prev", index: prevIndex },
    { item: items[activeIndex], position: "active", index: activeIndex },
    { item: items[nextIndex], position: "next", index: nextIndex },
  ];

  return (
    <section
      className={`carousel-section${visible ? " carousel-section--visible" : ""}`}
      ref={sectionRef}
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
    >
      <p className="carousel-label">Bla gjennom kategoriene</p>

      <div className="carousel-stage" ref={stageRef}>
        {/* Pilene er absolute og sitter utenfor kortene */}
        <button
          className="carousel-arrow carousel-arrow--left"
          onClick={() => setActiveIndex(prevIndex)}
          aria-label="Forrige"
        />
        <button
          className="carousel-arrow carousel-arrow--right"
          onClick={() => setActiveIndex(nextIndex)}
          aria-label="Neste"
        />

        <div className="carousel-cards" ref={cardsRef}>
          {slots.map(({ item, position, index }) => (
            <div
              key={item.id + "-" + position}
              className={`carousel-slot carousel-slot--${position}`}
              onClick={
                position === "active"
                  ? () => navigate(`/kategori/${encodeURIComponent(item.id)}`)
                  : () => setActiveIndex(index)
              }
            >
              <CategoryCard
                name={item.name}
                image={categoryImages[item.id]}
                color={categoryColors[item.id]}
                count={item.count}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prikker som viser posisjon i karusellen */}
      <div className="carousel-dots">
        {items.map((item, i) => (
          <button
            key={item.id}
            className={`carousel-dot${i === activeIndex ? " carousel-dot--active" : ""}`}
            onClick={() => setActiveIndex(i)}
            aria-label={item.name}
          />
        ))}
      </div>
    </section>
  );
}
