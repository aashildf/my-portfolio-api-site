export default function ApiCard({ api }) {
  return (
    <div
      className="api-card"
      onClick={() => (window.location.href = `/kategori/${api.slug}`)}
    >
      <h3>{api.title}</h3>
      <p>{api.description}</p>
    </div>
  );
}
