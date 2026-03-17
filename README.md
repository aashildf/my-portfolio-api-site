# API Studio — Utforskningsportal for offentlige API-er

Et oversiktsverktøy for å finne og utforske offentlige API-er fra norske statlige etater. Dataen er hentet fra [Felles datakatalog (data.norge.no)](https://data.norge.no) og lagret lokalt som en statisk JSON-fil — ingen backend nødvendig.

## Hva siden gjør

- Samler 583 API-er fra 14 etater på ett sted, gruppert etter kategori
- Søk direkte fra forsiden for å finne API-er etter navn, utgiver eller beskrivelse
- Bla gjennom kategorier for å se alle tilgjengelige API-er innenfor et tema
- Klikk på et API for å se detaljer: beskrivelse, utgiver, tema, nøkkelord og lenke til data.norge.no
- Hamburger-meny tilgjengelig fra alle sider med navigasjon til kategorier og eksempelprosjekter

## Kategorier

API-ene er gruppert etter utgiver i følgende kategorier:

- Miljø & Energi
- Transport & Kart
- Økonomi & Næring
- Statistikk & Analyse
- Forsvar & Beredskap
- Offentlig forvaltning
- Kommuner

## Teknisk

- **React 19** med **Vite** som byggverktøy
- **React Router** for navigasjon mellom sider
- Data hentes fra en statisk JSON-fil (`public/data/apis.json`) — ingen backend nødvendig
- Deployes til **GitHub Pages**

## Kjør lokalt

```bash
npm install
npm run dev
```

Siden åpnes på `http://localhost:5173`.

## Deploy til GitHub Pages

```bash
npm run deploy
```

## Skjermbilder

![Forsiden](src/assets/images/readme/Skjermbilde%202026-03-17%20144115.png)

![Kategori-karusell](src/assets/images/readme/Skjermbilde%202026-03-17%20144330.png)

![Eksempelprosjekter](src/assets/images/readme/Skjermbilde%202026-03-17%20144347.png)

![Kategoriside](src/assets/images/readme/Skjermbilde%202026-03-17%20144532.png)

## Prosjektstruktur

```
src/
  components/
    api/
      card/       # ApiCard og CategoryCard – kortvising
      carousel/   # ApiCarousel – interaktiv karusell på forsiden
      views/      # ApiDetail – detaljvisning av enkelt-API
    GlobalNav.jsx   # Fast logo og hamburger-meny (alle sider)
    Header.jsx      # Header med søk og meny (kun forsiden)
    HeroText.jsx    # Hero-seksjon på forsiden
    IntroSection.jsx
    Cases.jsx
    Footer.jsx
  data/
    fetchApis.js        # Henter og normaliserer data fra JSON-filen
    publisherGroups.js  # Kategori → [utgivere]-mapping
  pages/
    Home.jsx            # Forside
    CategoriesPage.jsx  # Oversikt over alle kategorier
    CategoryPage.jsx    # Kategoriside med API-liste og søk
public/
  data/
    apis.json   # Snapshot av API-data fra data.norge.no
```
