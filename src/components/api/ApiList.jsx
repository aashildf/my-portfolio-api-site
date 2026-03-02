import ApiCard from "./card/ApiCard";

export default function ApiList({ apis }) {
  if (!apis || apis.length === 0) {
    return <p style={{ padding: "2rem" }}>Ingen API-er funnet.</p>;
  }

  return (
    <section style={{ padding: "2rem" }}>
      <h2>Offentlige API-er</h2>

      <div className="api-grid">
        {apis.map((api) => (
          <ApiCard key={api.id} api={api} />
        ))}
      </div>
    </section>
  );
}
