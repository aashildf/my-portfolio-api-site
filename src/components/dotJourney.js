/*
  Prikk-reisen — ett sprett per klikk:

    1. klikk på prikken over i-en → spretter ned og lander OPPÅ "Utforsk",
       ordet flytter seg til side, og kula hopper ned på plassen foran det
    2. klikk på kula → samme ved "Bla gjennom kategoriene"
       og så ved "Hva kan du bygge …"
    3. klikk på kula → spretter rolig fra mobil 1 til 2 til 3 (på smal
       skjerm: tre sprett på mobilen som vises), ruller ned fra den siste
       og triller bort til plassen under mobilene

  Scroller man nedover uten å klikke, spretter kula videre av seg selv.
    4. klikk på kula → spretter helt opp igjen og blir prikken over i-en

  Kula tegnes imperativt med requestAnimationFrame (ikke React-state),
  så det ikke blir en re-render per frame. startDotJourney() returnerer
  en cancel()-funksjon som rydder alt bort igjen (brukes ved unmount).

  Koordinater er side-koordinater (px fra toppen av dokumentet).
  Et "punkt" er der kulas bunn-midtpunkt skal stå.

  Et mål (target) kan ha:
    point()  – hvor kula skal (kalles hver frame, så målet kan flytte seg)
    apex     – hvor høyt over startpunktet buen går (px)
    gravity  – lavere = roligere, mer svevende sprett
    pause    – sekunder kula blir liggende etter treff før neste hopp
    roll     – true: rull dit i stedet for å sprette (med speed og ease)
    bump     – element som "dukker" litt når kula treffer
    onLand() – kalles i det kula treffer
*/

import { BALL_SVG } from "./dotBallSvg";

const GRAVITY = 2800; // px/s²
const CONTACT_TIME = 0.07; // sekunder kula "klemmes" mot overflaten
const SQUASH_TIME = 0.16;

const toPage = (x, y) => ({ x: x + window.scrollX, y: y + window.scrollY });

const EASE = {
  in: (k) => k * k,
  out: (k) => 1 - (1 - k) * (1 - k),
  inOut: (k) => k * k * (3 - 2 * k),
};

/* ---------- Stoppene ---------- */

// Kula lander oppå ordet, ordet flytter seg til side (margin-left, se
// .dot-slot-word--open i CSS), og kula hopper ned på plassen foran det.
function slotStop(word, apex, ballSize) {
  const gap = () => parseFloat(getComputedStyle(word).fontSize) * 0.3;
  const onTop = () => {
    const r = word.getBoundingClientRect();
    // Toppen av bokstavene (≈ 25 % ned i linjeboksen)
    return toPage(r.left + r.width / 2, r.top + r.height * 0.25);
  };
  const slot = () => {
    const r = word.getBoundingClientRect();
    // Bunnen av kula på tekstens grunnlinje (≈ 83 % ned i linjeboksen)
    return toPage(r.left - gap() - ballSize / 2, r.top + r.height * 0.83);
  };
  const open = () => {
    word.style.setProperty("--dot-space", `${ballSize + gap() * 1.6}px`);
    word.classList.add("dot-slot-word--open");
  };
  return {
    close: () => word.classList.remove("dot-slot-word--open"),
    // Scroller man forbi uten å klikke, spretter kula hit når ordet er
    // kommet opp over denne andelen av skjermhøyden
    trigger: word,
    triggerAt: 0.45,
    targets: [
      { point: onTop, apex, bump: word, onLand: open },
      { point: slot, apex: ballSize * 0.9 + 10 },
      // to små etter-sprett på plassen
      { point: slot, apex: Math.max(10, ballSize * 0.4) },
      { point: slot, apex: Math.max(3, ballSize * 0.12) },
    ],
  };
}

function phonesStop(ballSize) {
  const landing = document.querySelector(".dot-landing");
  const phones = [...document.querySelectorAll(".cases .phone-wrapper")];
  if (!landing || !phones.length) return null;
  const row = document.querySelector(".cases__grid");

  // Ruta bygges i det kula skal hit (build), fordi den avhenger av
  // om alle mobilene vises (desktop) eller bare én om gangen (mobil).
  const build = () => {
    // Sveipbar rad (mobil) = overflow-x: auto og innhold bredere enn raden.
    // (På desktop stikker raden litt ut, men kan ikke scrolles.)
    const rowScrolls =
      row &&
      ["auto", "scroll"].includes(getComputedStyle(row).overflowX) &&
      row.scrollWidth > row.clientWidth + 1;

    // Mobil: bruk telefonen som vises nå — kula scroller ikke raden
    const visiblePhone = () => {
      const rr = row.getBoundingClientRect();
      const mid = rr.left + rr.width / 2;
      return phones.reduce((best, p) => {
        const r = p.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        return !best || d < best.d ? { p, d } : best;
      }, null).p;
    };
    const last = rowScrolls ? visiblePhone() : phones[phones.length - 1];

    // Hvilken vei kula skal ut over kanten (mot landingsplassen)
    const dir = () => {
      const r = last.getBoundingClientRect();
      const dx = landing.getBoundingClientRect().left - (r.left + r.width / 2);
      return Math.abs(dx) < 10 ? 1 : Math.sign(dx);
    };
    // Punkt på toppen av en mobil, `frac` (0–1) av bredden målt i fartsretningen
    const onPhone = (phone, frac) => () => {
      const r = phone.getBoundingClientRect();
      const x = dir() > 0 ? r.left + r.width * frac : r.right - r.width * frac;
      return toPage(x, r.top + 3);
    };

    // Boink, boink, boink: høye, myke buer. Lav tyngdekraft gjør at den
    // svever rolig gjennom buen, og den spretter videre med en gang.
    const boink = (phone, frac, apex) => ({
      apex,
      gravity: 950,
      pause: 0.03,
      bump: phone,
      point: onPhone(phone, frac),
    });

    const targets = rowScrolls
      ? // Mobil: tre boink på samme telefon, mens den driver mot kanten
        [boink(last, 0.35, 120), boink(last, 0.5, 130), boink(last, 0.65, 120)]
      : // Desktop: fra mobil 1 til 2 til 3
        phones.map((phone, i) => boink(phone, 0.5, i === 0 ? 120 : 150));

    // Fra den siste: rull mot kanten og dett av. Kula beholder farten
    // fremover: den lander et stykke ut, spretter videre fremover i
    // stadig lavere buer, og ruller bare litt til slutt.
    //
    // Strekningen på "gulvet" regnes ut én gang i det kula detter av, og
    // lagres relativt til landingsfeltet (så den ligger stille om man
    // senere sveiper i mobil-raden). Den går mot landingsplassen hvis den
    // ligger i fartsretningen, ellers så langt det er plass.
    let plan = null;
    const makePlan = () => {
      const r = last.getBoundingClientRect();
      const l = landing.getBoundingClientRect();
      const section = landing.closest(".cases")?.getBoundingClientRect() ?? {
        left: 0,
        right: window.innerWidth,
      };
      const d = dir();
      const start = d > 0 ? r.right + ballSize * 0.55 : r.left - ballSize * 0.55;
      const room = (d > 0 ? section.right - start : start - section.left) - ballSize - 12;
      const toLanding = (l.left - start) * d;
      const total = Math.max(
        20,
        toLanding > 0 ? Math.min(toLanding, room) : Math.min(room, 140)
      );
      plan = { startOffset: start - l.left, d, total };
    };
    const floorAt = (frac) => () => {
      if (!plan) makePlan();
      const l = landing.getBoundingClientRect();
      return toPage(l.left + plan.startOffset + plan.d * plan.total * frac, l.top);
    };

    targets.push(
      { roll: true, speed: 110, ease: "in", point: onPhone(last, 0.83) },
      { apex: 4, gravity: 1400, pause: 0.03, point: floorAt(0.3) },
      { apex: 55, gravity: 1300, pause: 0.03, point: floorAt(0.62) },
      { apex: 20, gravity: 1300, pause: 0.03, point: floorAt(0.84) },
      { apex: 6, gravity: 1300, pause: 0.03, point: floorAt(0.95) },
      { roll: true, speed: 45, ease: "out", point: floorAt(1) }
    );
    return targets;
  };

  return { build, final: true, trigger: phones[0], triggerAt: 0.5 };
}

function buildStops(ballSize) {
  const stops = [];
  const utforsk = document.querySelector(".intro-title__first");
  if (utforsk) stops.push(slotStop(utforsk, 60, ballSize));
  const bla = document.querySelector(".carousel-label__first");
  if (bla) stops.push(slotStop(bla, 80, ballSize));
  const hva = document.querySelector(".cases-intro__first");
  if (hva) stops.push(slotStop(hva, 90, ballSize));
  const phones = phonesStop(ballSize);
  if (phones) stops.push(phones);
  return stops;
}

/* ---------- Fysikk ---------- */

function makeMove(from, target) {
  const to = target.point();
  if (target.roll) {
    const dist = Math.hypot(to.x - from.x, to.y - from.y);
    return { roll: true, from, to0: to, target, T: Math.max(0.25, dist / target.speed) };
  }
  // Ballistisk bue med toppunkt `apex` px over det høyeste av de to punktene
  const g = target.gravity ?? GRAVITY;
  const apexY = Math.min(from.y, to.y) - target.apex;
  const up = Math.sqrt((2 * (from.y - apexY)) / g);
  const down = Math.sqrt((2 * Math.max(0, to.y - apexY)) / g);
  return { from, to0: to, target, g, vy0: -g * up, T: up + down };
}

function movePosition(move, t) {
  const k = Math.min(t / move.T, 1);
  const live = move.target.point();

  if (move.roll) {
    const e = (EASE[move.target.ease] ?? EASE.inOut)(k);
    return {
      x: move.from.x + (live.x - move.from.x) * e,
      y: move.from.y + (live.y - move.from.y) * e,
      vy: 0,
      live,
    };
  }

  // Målet kan flytte seg underveis (f.eks. teksten som glir til side)
  // — vi glir gradvis over til det levende punktet.
  const dx = live.x - move.to0.x;
  const dy = live.y - move.to0.y;
  return {
    x: move.from.x + (move.to0.x - move.from.x) * k + dx * k,
    y: move.from.y + move.vy0 * t + 0.5 * move.g * t * t + dy * k,
    vy: move.vy0 + move.g * t,
    live,
  };
}

function bumpElement(el) {
  if (!el?.animate) return;
  el.animate(
    [
      { transform: "translateY(0)" },
      { transform: "translateY(4px)", offset: 0.35 },
      { transform: "translateY(0)" },
    ],
    { duration: 320, easing: "ease-out", composite: "add" }
  );
}

/* ---------- Selve reisen ---------- */

/*
  Hjelper for HeroText: skal kula starte av seg selv fordi brukeren har
  scrollet ned forbi "Utforsk" uten å klikke?
*/
export const FIRST_TRIGGER_SELECTOR = ".intro-title__first";
export const FIRST_TRIGGER_AT = 0.45;

export function startDotJourney({ startEl, onReturned, followCamera: followAtStart = true }) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startRect = startEl.getBoundingClientRect();
  const size = startRect.width; // kula beholder denne størrelsen hele veien
  let pos = toPage(startRect.left + size / 2, startRect.bottom);

  // Hjem igjen: prikken over i-en
  const homePoint = () => {
    const r = startEl.getBoundingClientRect();
    return toPage(r.left + r.width / 2, r.bottom);
  };

  const stops = buildStops(size);
  let stopIndex = -1;
  let busy = false;
  let atEnd = false;
  let raf = 0;
  let follow = true;
  let restTarget = null;
  let stickUntil = 0;
  let ownScrollUntil = 0; // scroll vi selv har laget (kamera) skal ikke telle som brukerscroll

  // Ytre knapp: posisjon (translate). Indre: klem og "klikk meg"-hopp.
  const ball = document.createElement("button");
  ball.type = "button";
  ball.className = "dot-traveller";
  ball.setAttribute("aria-label", "Klikk for å sprette videre");
  ball.style.width = ball.style.height = `${size}px`;
  ball.innerHTML = `<span class="dot-ball">${BALL_SVG}</span>`;
  const inner = ball.firstElementChild;

  const shadow = document.createElement("div");
  shadow.className = "dot-ball-shadow";
  shadow.style.width = `${size * 1.2}px`;
  shadow.style.height = `${size * 0.32}px`;

  document.body.append(shadow, ball);

  const draw = (x, y, sx = 1, sy = 1) => {
    ball.style.transform = `translate3d(${x - size / 2}px, ${y - size}px, 0)`;
    inner.style.transform = sx === 1 && sy === 1 ? "" : `scale(${sx}, ${sy})`;
  };

  // Skyggen ligger på overflaten rett under kula. `fade` (0–1) demper den
  // når kula ikke er over overflaten den skal lande på ennå.
  const drawShadow = (surface, height, fade = 1) => {
    const closeness = Math.max(0, 1 - height / 420) * fade;
    const k = 0.45 + 0.55 * closeness;
    shadow.style.opacity = String(0.5 * closeness);
    shadow.style.transform = `translate3d(${surface.x - size * 0.6}px, ${surface.y - size * 0.16}px, 0) scale(${k})`;
  };

  /* --- Hvile: kula ligger stille, hinter om klikk og følger layouten --- */

  const redrawRest = () => {
    if (busy || !restTarget) return;
    pos = restTarget.point();
    draw(pos.x, pos.y);
    drawShadow(pos, 0);
  };

  // Teksten glir litt etter at kula har landet — følg med en liten stund
  const stick = (now) => {
    redrawRest();
    if (!busy && now < stickUntil) raf = requestAnimationFrame(stick);
  };

  const setResting = (on) => {
    ball.classList.toggle("dot-traveller--resting", on);
    inner.classList.toggle("dot-ball--idle", on);
    if (on) {
      stickUntil = performance.now() + 700;
      raf = requestAnimationFrame(stick);
    }
  };

  const resizeObserver = new ResizeObserver(redrawRest);
  resizeObserver.observe(document.body);
  window.addEventListener("resize", redrawRest);

  /* --- Kamera: scroll etter kula, men gi slipp hvis brukeren scroller selv --- */

  const stopFollow = () => (follow = false);
  const userEvents = ["wheel", "touchmove", "keydown"];
  userEvents.forEach((e) => window.addEventListener(e, stopFollow, { passive: true }));

  const followCamera = (y) => {
    if (!follow) return;
    const vh = window.innerHeight;
    const ballViewY = y - size / 2 - window.scrollY;
    const lo = vh * 0.28;
    const hi = vh * 0.6;
    let delta = 0;
    if (ballViewY > hi) delta = ballViewY - hi;
    else if (ballViewY < lo) delta = ballViewY - lo;
    // Mykt etter, men aldri slik at kula forsvinner ut av bildet
    let step = delta * 0.2;
    const after = ballViewY - step;
    if (after > vh * 0.88) step = ballViewY - vh * 0.88;
    if (after < vh * 0.08) step = ballViewY - vh * 0.08;
    if (Math.abs(step) > 0.5) {
      ownScrollUntil = performance.now() + 150;
      window.scrollTo(0, window.scrollY + step);
    }
  };

  /* --- Én serie med bevegelser (ett klikk) --- */

  const runMoves = (targets, onArrive) => {
    busy = true;
    setResting(false);
    cancelAnimationFrame(raf);

    const last = targets[targets.length - 1];

    if (reduceMotion) {
      targets.forEach((t) => t.onLand?.());
      pos = last.point();
      busy = false;
      restTarget = last;
      draw(pos.x, pos.y);
      drawShadow(pos, 0);
      if (follow) {
        ownScrollUntil = performance.now() + 150;
        window.scrollTo({ top: pos.y - window.innerHeight / 2 });
      }
      onArrive();
      return;
    }

    let index = 0;
    let move = makeMove(pos, targets[0]);
    let moveStart = performance.now();
    let contactUntil = 0;
    let contactTarget = null;
    let impactAt = -1;

    const next = (now, withContact) => {
      index += 1;
      if (withContact) {
        // pause: hvor lenge kula blir liggende før neste hopp
        contactUntil = now + (contactTarget?.pause ?? CONTACT_TIME) * 1000;
      } else {
        contactUntil = now;
        impactAt = -1;
      }
      move = makeMove(pos, targets[index]);
      moveStart = contactUntil;
    };

    const frame = (now) => {
      // Kula ligger mot overflaten et øyeblikk (klemt flat)
      if (now < contactUntil) {
        const live = contactTarget.point();
        const k = (now - impactAt) / 1000 / SQUASH_TIME;
        const sq = 0.25 * (1 - Math.min(k, 1));
        draw(live.x, live.y, 1 + sq * 0.8, 1 - sq);
        drawShadow(live, 0);
        followCamera(live.y);
        raf = requestAnimationFrame(frame);
        return;
      }

      const secs = Math.max(0, (now - moveStart) / 1000);
      const p = movePosition(move, secs);

      if (secs >= move.T) {
        const target = move.target;
        pos = p.live;

        if (target === last) {
          if (!target.roll) bumpElement(target.bump);
          target.onLand?.();
          busy = false;
          restTarget = target;
          draw(pos.x, pos.y);
          drawShadow(pos, 0);
          onArrive();
          return;
        }

        if (target.roll) {
          // Ruller rett over i neste bevegelse, uten klem
          next(now, false);
        } else {
          // Treff!
          bumpElement(target.bump);
          target.onLand?.();
          impactAt = now;
          contactTarget = target;
          next(now, true);
          draw(pos.x, pos.y, 1.25, 0.75);
        }
        raf = requestAnimationFrame(frame);
        return;
      }

      // I lufta: strekk litt i fartsretningen, og litt "etter-klem" rett etter avspark
      let sx = 1;
      let sy = 1;
      if (!move.roll) {
        const sinceImpact = impactAt < 0 ? Infinity : (now - impactAt) / 1000;
        if (sinceImpact < SQUASH_TIME) {
          const sq = 0.25 * (1 - sinceImpact / SQUASH_TIME);
          sx = 1 + sq * 0.8;
          sy = 1 - sq;
        } else {
          const s = Math.min(Math.abs(p.vy) / 7000, 0.14);
          sx = 1 - s * 0.5;
          sy = 1 + s;
        }
      }

      draw(p.x, p.y, sx, sy);
      if (move.roll) {
        drawShadow({ x: p.x, y: p.y }, 0);
      } else {
        // Først synlig når kula er nesten rett over landingsstedet
        const dx = Math.abs(p.x - p.live.x);
        const fade = Math.max(0, 1 - dx / (size * 2.5));
        drawShadow({ x: p.x, y: p.live.y }, p.live.y - p.y, fade);
      }
      followCamera(p.y);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
  };

  // followCam: true ved klikk (siden scroller etter kula), false når det er
  // brukerens egen scrolling som sender kula videre
  const goToStop = (n, followCam = true) => {
    const stop = stops[n];
    if (!stop) return;
    stops[stopIndex]?.close?.(); // teksten vi forlater glir tilbake
    stopIndex = n;
    follow = followCam;
    runMoves(stop.build ? stop.build() : stop.targets, () => {
      atEnd = Boolean(stop.final);
      setResting(true);
      // Har brukeren scrollet forbi neste stopp mens kula var i lufta,
      // fortsetter den dit med en gang
      if (!followCam) maybeAdvanceOnScroll();
    });
  };

  const maybeAdvanceOnScroll = () => {
    if (busy || atEnd) return;
    const next = stops[stopIndex + 1];
    if (!next?.trigger) return;
    if (next.trigger.getBoundingClientRect().top < window.innerHeight * next.triggerAt) {
      goToStop(stopIndex + 1, false);
    }
  };

  // Scroller brukeren nedover forbi neste stopp uten å klikke, spretter
  // kula dit av seg selv (men aldri tilbake til i-en — det krever klikk)
  let lastScrollY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    const down = y > lastScrollY;
    lastScrollY = y;
    if (!down || performance.now() < ownScrollUntil) return;
    maybeAdvanceOnScroll();
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  const destroy = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    userEvents.forEach((e) => window.removeEventListener(e, stopFollow));
    resizeObserver.disconnect();
    window.removeEventListener("resize", redrawRest);
    stops.forEach((s) => s.close?.());
    ball.remove();
    shadow.remove();
  };

  // Siste klikk: helt opp igjen til i-en
  const goHome = () => {
    follow = true;
    ball.setAttribute("aria-label", "Kula spretter tilbake til i-en");
    runMoves([{ point: homePoint, apex: 90 }], () => {
      destroy();
      onReturned?.();
    });
  };

  ball.addEventListener("click", () => {
    if (busy) return;
    if (atEnd) goHome();
    else goToStop(stopIndex + 1);
  });

  // Start: første sprett skjer med en gang (klikket på i-en)
  draw(pos.x, pos.y);
  if (stops.length) goToStop(0, followAtStart);
  else {
    destroy();
    onReturned?.();
  }

  return destroy;
}
