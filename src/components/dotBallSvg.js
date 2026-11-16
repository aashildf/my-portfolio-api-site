/*
  Tegnet ball med litt 3D, matt overflate:
    - mørk grunnfarge = skyggesiden nede til høyre
    - lysere sirkler forskjøvet opp mot venstre = den belyste delen
    - myk, utvisket lysflekk (ikke blank glans) oppe til venstre
    - tynn, dempet kontur i en mørkere tone av ballfargen
*/

export const BALL_SVG = `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
  <defs>
    <filter id="dot-ball-soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5"/>
    </filter>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#8f4c40"/>
  <circle cx="47" cy="46.5" r="42.5" fill="#a35d50"/>
  <circle cx="45" cy="44" r="38.5" fill="#b26a5c"/>
  <ellipse cx="36" cy="32" rx="15" ry="10" transform="rotate(-35 36 32)" fill="#e9c0b4" opacity="0.45" filter="url(#dot-ball-soft)"/>
  <circle cx="50" cy="50" r="46" fill="none" stroke="#7a3d33" stroke-width="1.6" opacity="0.6"/>
</svg>`;
