# API Studio — Utforskningsportal for offentlige API-er

En nettside for å bla gjennom og utforske offentlige API-er fra [Felles datakatalog (data.norge.no)](https://data.norge.no).

Dataen er hentet som et snapshot fra Felles datakatalog og lagret lokalt som en statisk JSON-fil.

## Hva siden gjør

- Viser en interaktiv karusell med API-kategorier på forsiden
- Lar deg bla gjennom kategorier via navigasjonsmenyen eller karusellen
- Viser alle API-er innenfor en kategori, med søk og filtrering
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

![Forsiden](src/assets/images/readme/Skjermbilde%202026-03-16%20154913.png)

![Kategori-karusell](src/assets/images/readme/Skjermbilde%202026-03-16%20155056.png)

![Eksempelprosjekter](src/assets/images/readme/Skjermbilde%202026-03-16%20155018.png)

![Detaljside for API](src/assets/images/readme/Skjermbilde%202026-03-16%20155531.png)

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
