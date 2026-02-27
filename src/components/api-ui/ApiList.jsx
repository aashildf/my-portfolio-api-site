

import { useEffect, useState } from "react";
import { fetchApis } from "../../data/fetchApis";

export default function ApiList() {
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApis()
      .then((cleanData) => {
        setApis(cleanData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Laster API-er...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Offentlige API-er i Norge</h1>

      {apis.map((api) => (
        <div
          key={api.id}
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ margin: 0 }}>{api.name}</h2>
          <p style={{ opacity: 0.8 }}>{api.description}</p>

          <p>
            <strong>Publisert av:</strong> {api.publisher}
          </p>

          {api.url && (
            <a href={api.url} target="_blank" rel="noreferrer">
              Besøk API
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
