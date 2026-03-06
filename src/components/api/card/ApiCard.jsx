
import "./apiCard.css";



export default function ApiCard({ api, title, onClick, style, image }) {
  const displayName = api?.name || title || "Ukjent";

  return (
    <div className="api-card" style={style} onClick={() => onClick?.(api)}>
      <div className="api-illustration">
        {image && <img src={image} alt="illustrasjon fra kategorien" />}
      </div>

      <div className="api-content">
        <h3>{displayName}</h3>

        {api?.publisher && (
          <p>
            <strong>Publisert av:</strong> {api.publisher}
          </p>
        )}

        {api?.description && <p className="api-desc">{api.description}</p>}
      </div>
    </div>
  );
}

