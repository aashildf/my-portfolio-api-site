# API Studio — Utforskningsportal for offentlige API-er

En nettside for å bla gjennom og utforske offentlige API-er fra [Felles datakatalog (data.norge.no)](https://data.norge.no).

Dataen er hentet som et snapshot fra Felles datakatalog og lagret lokalt som en statisk JSON-fil.

## Hva siden gjør

- Viser en interaktiv karusell med API-kategorier på forsiden
- Lar deg bla gjennom kategorier via header-menyen eller karusellen
- Viser alle API-er innenfor en kategori på en egen side
- Klikk på et API-kort for å se detaljer: beskrivelse, utgiver, tema og lenke til API-et
- Støtter lyst og mørkt tema

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

## Prosjektstruktur

```
src/
  components/
    api/
      card/       # ApiCard – kort som viser ett API
      carousel/   # ApiCarousel – interaktiv karusell på forsiden
      views/      # ApiList og ApiDetail – liste og detaljvisning
  config/
    publisherCategories.js  # Kobler utgiver til kategori (kilde til sannhet)
  data/
    fetchApis.js        # Henter og normaliserer data fra JSON-filen
    publisherGroups.js  # Utleder kategori → [utgivere] fra publisherCategories
  pages/
    Home.jsx          # Forside
    CategoryPage.jsx  # Kategoriside
public/
  data/
    apis.json   # Snapshot av API-data fra data.norge.no
```
