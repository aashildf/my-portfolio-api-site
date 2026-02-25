import { useRef, useEffect, useState } from "react";
import { apiList } from "../../data/apiList";
import ApiCard from "./ApiCard";
import "./carousel.css";

export default function ApiCarousel() {
  const carouselRef = useRef(null);
  const [scaleMap, setScaleMap] = useState({});
  const isDraggingRef = useRef(false);

  // slik at karusellen går rundt og rundt
  const items = [...apiList, ...apiList, ...apiList];

  // 1️ infinite loop
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const jumpToMiddle = () => {
      const third = container.scrollWidth / 3;
      container.scrollLeft = third;
    };

    requestAnimationFrame(jumpToMiddle);

    const onScroll = () => {
      if (isDraggingRef.current) return;

      const third = container.scrollWidth / 3;
      const x = container.scrollLeft;
      const buffer = 300;

      if (x < buffer) {
        container.scrollLeft = x + third;
      }

      if (x > third * 2 - buffer) {
        container.scrollLeft = x - third;
      }
    };

    container.addEventListener("scroll", onScroll);
    window.addEventListener("resize", jumpToMiddle);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", jumpToMiddle);
    };
  }, []);


  
  // 2️ Scale effect 
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = container.querySelectorAll(".carousel-item");

      const rect = container.getBoundingClientRect();
      const center = rect.left + rect.width / 2;

      const newScaleMap = {};

      cards.forEach((card, index) => {
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const distance = Math.abs(center - cardCenter);

        const scale = Math.max(0.85, 1.35 - distance / 500);
        newScaleMap[index] = scale;
      });

      setScaleMap(newScaleMap);
    };

    handleScroll();

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);



  // 3  Drag-effect
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let isPointerDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let dragged = false;

    const DRAG_THRESHOLD = 6; // px før vi sier "dette er drag, ikke klikk"

    const onPointerDown = (e) => {
      // Bare venstre museknapp på desktop
      if (e.pointerType === "mouse" && e.button !== 0) return;

      isPointerDown = true;
      isDraggingRef.current = true;

      dragged = false;

      startX = e.clientX;
      startScrollLeft = container.scrollLeft;

      container.setPointerCapture?.(e.pointerId);

      // Hindrer tekstmarkering/ghost-drag
      e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!isPointerDown) return;

      const dx = e.clientX - startX;

      if (Math.abs(dx) > DRAG_THRESHOLD) {
        dragged = true;
        container.classList.add("is-dragging");
      }

      // "Grab to move": dra til høyre => innhold følger hånda
      container.scrollLeft = startScrollLeft - dx;

      e.preventDefault();
    };

    const endDrag = () => {
      isPointerDown = false;
      isDraggingRef.current = false;
      container.classList.remove("is-dragging");
    };

    const onPointerUp = () => endDrag();
    const onPointerCancel = () => endDrag();

    // Stopp klikk hvis vi faktisk dro
    const onClickCapture = (e) => {
      if (!dragged) return;
      e.preventDefault();
      e.stopPropagation();
      dragged = false; // reset etter å ha stoppet ett klikk
    };

    container.addEventListener("pointerdown", onPointerDown, {
      passive: false,
    });
    container.addEventListener("pointermove", onPointerMove, {
      passive: false,
    });
    container.addEventListener("pointerup", onPointerUp, { passive: true });
    container.addEventListener("pointercancel", onPointerCancel, {
      passive: true,
    });

    // Capture = vi stopper klikk før det når kortet/lenker inni
    container.addEventListener("click", onClickCapture, true);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerCancel);
      container.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return (
    <section className="carousel-section">
      <div className="carousel" ref={carouselRef}>
        <div className="carousel-track">
          {items.map((api, index) => (
            <div
              key={index}
              className="carousel-item"
              style={{
                transform: `scale(${scaleMap[index] || 1})`,
                zIndex: scaleMap[index] > 1.2 ? 10 : 1,
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
