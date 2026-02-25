import { useEffect, useState } from "react";

export default function ApiList() {
  const [apis, setApis] = useState([]);

  useEffect(() => {
    fetch("https://data.norge.no/api/dataservices")
      .then((res) => res.json())
      .then((data) => setApis(data))
      .catch((err) => console.error(err));
  }, []);

  const normalized = data.map((api) => ({
    id: api.id,
    name: api.title?.nb || api.title?.en || "Uten navn",
    description: api.description?.nb || api.description?.en || "",
    url: api.landingPage,
    publisher: api.publisher?.name,
    keywords: api.keywords?.map((k) => k.label) || [],
    themes: api.themes?.map((t) => t.title) || [],
    formats: api.formats || [],
    endpoints: api.endpointURLs || [],
  }));


const filtered = apis.filter(
  (api) =>
    api.name.toLowerCase().includes(query) ||
    api.description.toLowerCase().includes(query) ||
    api.keywords.some((k) => k.toLowerCase().includes(query)) ||
    api.themes.some((t) => t.toLowerCase().includes(query)) ||
    api.publisher?.toLowerCase().includes(query),
);


  return (
    <div style={{ padding: "2rem" }}>
      <h1>Offentlige API-er i Norge</h1>

      {apis.length === 0 && <p>Laster API-er...</p>}

      <ul>
        {apis.map((api) => (
          <li key={api.id} style={{ marginBottom: "1rem" }}>
            <strong>{api.title?.nb || api.title?.en || "Uten navn"}</strong>
            <br />
            {api.landingPage && (
              <a href={api.landingPage} target="_blank" rel="noreferrer">
                Besøk API
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
