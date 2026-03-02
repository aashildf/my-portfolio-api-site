


export default function ApiCard({ api, title, onClick }) {
  const displayName = api?.name || title || "Ukjent";

  return (
    <div className="api-card" onClick={() => onClick?.(api)}>
      <h3>{displayName}</h3>

      {api?.publisher && (
        <p>
          <strong>Publisert av:</strong> {api.publisher}
        </p>
      )}

      {api?.description && <p style={{ opacity: 0.8 }}>{api.description}</p>}
    </div>
  );
}

