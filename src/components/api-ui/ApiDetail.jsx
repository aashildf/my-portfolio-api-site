

export default function ApiDetail({ api }) {
  if (!api) return <p>Ingen API valgt.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{api.name}</h1>
      <p>{api.description}</p>

      <p>
        <strong>Publisert av:</strong> {api.publisher}
      </p>

      {api.keywords.length > 0 && (
        <p>
          <strong>Nøkkelord:</strong> {api.keywords.join(", ")}
        </p>
      )}

      {api.themes.length > 0 && (
        <p>
          <strong>Temaer:</strong> {api.themes.join(", ")}
        </p>
      )}

      {api.url && (
        <a href={api.url} target="_blank" rel="noreferrer">
          Besøk API
        </a>
      )}
    </div>
  );
}
