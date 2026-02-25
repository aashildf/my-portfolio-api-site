export default function HeroText() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          API-STUDIO
          <br />
          Fullstendig oversikt over alle registrerte offentlige
          API-er i Norge 
        </h1>
        <p>
          Finn lett det du trenger via kategori og søkefunksjon
        </p>
      </div>

      {/* Buet avslutning */}
      <div className="hero-curve"></div>
    </section>
  );
}

// https://data.norge.no/api/dataservices
// Dette endepunktet gir deg:

// en liste over alle registrerte offentlige API-er i Norge

// med metadata som:

// title

// description

// landingPage

// publisher

// keywords

// themes

// id

// endpointURLs

// isOpenData

// isOpenAPI

// formats

// accessRights
