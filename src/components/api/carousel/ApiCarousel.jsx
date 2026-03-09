import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiCard from "../card/ApiCard";
import "./carousel.css";

export default function ApiCarousel({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const stageRef = useRef(null);
  const cardsRef = useRef(null);
  const dragStartRef = useRef(null);
  const dragHappenedRef = useRef(false);

  // For at data-hentingen skal fungere på GitHub Pages
  const base = import.meta.env.BASE_URL;
  const categoryImages = {
    "Statistikk & Analyse": base + "images/apis/statistikk.svg",
    Kommuner: base + "images/apis/kommuner.svg",
    "Miljø & Energi": base + "images/apis/miljo.svg",
    "Transport & Kart": base + "images/apis/transport.svg",
    "Økonomi & Næring": base + "images/apis/okonomi.svg",
    "Forsvar & Beredskap": base + "images/apis/forsvar.svg",
    "Offentlig forvaltning": base + "images/apis/forvaltning.svg",
  };

  const categoryColors = {
    "Miljø & Energi": "#8F9F99",
    "Transport & Kart": "#9FB3BD",
    "Økonomi & Næring": "#E4E1E2",
    "Statistikk & Analyse": "#B7B9B5",
    "Forsvar & Beredskap": "#8A7D7A",
    Kommuner: "#B1BEC3",
    "Offentlig forvaltning": "#BCA6A2",
  };

  const count = items?.length ?? 0;
  const prevIndex = (activeIndex - 1 + count) % count;
  const nextIndex = (activeIndex + 1) % count;

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
    <section className="carousel-section">
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
              <ApiCard
                api={item}
                title={item.name}
                image={categoryImages[item.id]}
                style={{ "--card-color": categoryColors[item.id] }}
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
