

export default function ApiCard({ api }) {
  return (
    <div className={`api-card ${api.color}`}>
      {/* innhold */}
      <h3>{api.title}</h3>
      // <p>{api.description}</p>
    </div>
  );
}

// [ Tilbake-knapp ]

// [ API-navn ]
// [ Beskrivelse ]
// [ Organisasjon ]
// [ Lenker ]
// [ Dokumentasjon ]
// [ Kontaktinfo ]
// [ Metadata i listeform ]
