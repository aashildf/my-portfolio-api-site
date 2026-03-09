
import "./apiCard.css";

export default function ApiCard({ api, title, onClick, style, image }) {
  const displayName = api?.name || title || "Ukjent";

  return (
    <div className="api-card" style={style} onClick={() => onClick?.(api)}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="watercolor" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.035"
              numOctaves="4"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="1"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="api-illustration">
        <div className="api-blob" />
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

