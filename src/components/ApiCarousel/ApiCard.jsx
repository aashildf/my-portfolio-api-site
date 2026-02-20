export default function ApiCard({ api }) {
  return (
    <div className={`api-card color-${api.color}`}>
      <h3>{api.title}</h3>
      <p className="meta">
        {api.version} — {api.protocol}
      </p>
      <p className="description">{api.description}</p>
    </div>
  );
}
