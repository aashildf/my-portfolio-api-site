import { useEffect, useMemo, useRef, useState } from "react";
import { apiList } from "../../data/apiList";
import ApiCard from "./ApiCard";
import "./carousel.css";

export default function ApiCarousel() {
  const lastClientYRef = useRef(0);
  const baseWidthRef = useRef(1);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  // Render mange ganger for å kunne wrappe sømløst
  const REPEATS = 7; // 5–9 funker fint
  const items = useMemo(() => {
    const out = [];
    for (let i = 0; i < REPEATS; i++) out.push(...apiList);
    return out;
  }, []);

  // State for scaling per index
  const [scaleMap, setScaleMap] = useState({});

  // "Physics" refs
  const xRef = useRef(0); // current translateX (px)
  const vRef = useRef(0); // velocity (px/frame-ish)
  const isDownRef = useRef(false);
  const lastClientXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const trackWidthRef = useRef(1);
  const viewportWidthRef = useRef(1);
  const dragBlockClickRef = useRef(false);

  // Helpers
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

   const measure = () => {
     viewportWidthRef.current = viewport.clientWidth;
     trackWidthRef.current = track.scrollWidth || 1;

     // 🔥 bredden av én original liste
     baseWidthRef.current = trackWidthRef.current / REPEATS;

     // start i midten (repeat 3 eller 4)
     xRef.current = -baseWidthRef.current * Math.floor(REPEATS / 2);
   };

    measure();

    // Resize observer for å tåle font/innhold endringer
    const ro = new ResizeObserver(() => measure());
    ro.observe(viewport);
    ro.observe(track);

    return () => ro.disconnect();
  }, [items.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const friction = 0.92; // 0.88–0.95 (høyere = mer glide)
    const spring = 0.18; // "responsiveness" ved drag
    const maxVel = 80; // safety

    const tick = () => {
      const viewportW = viewportWidthRef.current;
      const trackW = trackWidthRef.current;

      // Inertia når ikke drar
      if (!isDownRef.current) {
        vRef.current *= friction;
        if (Math.abs(vRef.current) < 0.02) vRef.current = 0;
        xRef.current += vRef.current;
      }

      const base = baseWidthRef.current;
      xRef.current = (((xRef.current % base) + base) % base) - base;

      // Apply transform
      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;

      // Scale-beregning (smooth) – basert på avstand til viewport center
      // Vi leser alle .carousel-item og måler senterposisjon
      const cards = track.querySelectorAll(".carousel-item");
      const center = viewport.getBoundingClientRect().left + viewportW / 2;

      const newScale = {};
      cards.forEach((card, idx) => {
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const dist = Math.abs(center - cardCenter);

        // litt mer smooth falloff
        const t = clamp(1 - dist / 500, 0, 1);
        const scale = 0.85 + t * (1.35 - 0.85);
        newScale[idx] = scale;
      });
      setScaleMap(newScale);

      requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onPointerDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      isDownRef.current = true;
      dragBlockClickRef.current = false;

      lastClientXRef.current = e.clientX;
      lastClientYRef.current = e.clientY;   
      lastTimeRef.current = performance.now();

      viewport.setPointerCapture?.(e.pointerId);
      viewport.classList.add("is-dragging");
      e.preventDefault();
    };

   const onPointerMove = (e) => {
     if (!isDownRef.current) return;

     const now = performance.now();
     const dx = e.clientX - lastClientXRef.current;
     const dy = e.clientY - (lastClientYRef.current ?? e.clientY);
     const dt = Math.max(1, now - lastTimeRef.current);



     //  Hvis brukeren beveger mer vertikalt enn horisontalt
     // la browser håndtere scroll opp/ned
     if (Math.abs(dy) > Math.abs(dx)) {
       isDownRef.current = false;
       viewport.classList.remove("is-dragging");
       return;
     }

     xRef.current += dx;

     const instVel = (dx / dt) * 16.67;
     vRef.current = clamp(instVel, -80, 80);

     if (Math.abs(dx) > 3) dragBlockClickRef.current = true;

     lastClientXRef.current = e.clientX;
     lastClientYRef.current = e.clientY;
     lastTimeRef.current = now;

     e.preventDefault(); 
   };

    const end = () => {
      isDownRef.current = false;
      viewport.classList.remove("is-dragging");
    };

    // Stop click on cards after drag
    const onClickCapture = (e) => {
      if (!dragBlockClickRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      dragBlockClickRef.current = false;
    };

   const onWheel = (e) => {
     // Kun horisontal wheel (eller Shift + wheel) skal styre karusellen
     if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
       e.preventDefault();
       vRef.current += (e.deltaX || e.deltaY) * -0.15;
       vRef.current = clamp(vRef.current, -80, 80);
     }
   };

    viewport.addEventListener("pointerdown", onPointerDown, { passive: false });
    viewport.addEventListener("pointermove", onPointerMove, { passive: false });
    viewport.addEventListener("pointerup", end, { passive: true });
    viewport.addEventListener("pointercancel", end, { passive: true });
    viewport.addEventListener("click", onClickCapture, true);
    viewport.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", end);
      viewport.removeEventListener("pointercancel", end);
      viewport.removeEventListener("click", onClickCapture, true);
      viewport.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <section className="carousel-section">
      <div className="carousel-viewport" ref={viewportRef}>
        <div className="carousel-track" ref={trackRef}>
          {items.map((api, index) => (
            <div
              key={`${api?.id ?? api?.name ?? "api"}-${index}`}
              className="carousel-item"
              style={{
                transform: `scale(${scaleMap[index] || 1})`,
                zIndex: (scaleMap[index] || 1) > 1.2 ? 10 : 1,
              }}
            >
              <ApiCard api={api} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
