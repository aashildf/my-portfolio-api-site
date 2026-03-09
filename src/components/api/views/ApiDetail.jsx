import { useParams, useNavigate } from "react-router-dom";
import "./apiDetail.css";

const categoryColors = {
  "Miljø & Energi": "#8F9F99",
  "Transport & Kart": "#9FB3BD",
  "Økonomi & Næring": "#E4E1E2",
  "Statistikk & Analyse": "#B7B9B5",
  "Forsvar & Beredskap": "#8A7D7A",
  Kommuner: "#ADB3B4",
  "Offentlig forvaltning": "#BCA6A2",
};

export default function ApiDetail({ apis, publisherGroups }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = apis?.find((a) => a.id === id);

  const category = api
    ? Object.keys(publisherGroups ?? {}).find((cat) =>
        publisherGroups[cat].includes(api.publisher)
      )
    : null;
  const headerColor = categoryColors[category] ?? "#a1b4b2";

  if (!api) {
    return (
      <div className="detail-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Tilbake
        </button>
        <p>Ingen API funnet.</p>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Tilbake
      </button>

      <div className="detail-card">
        <div className="detail-card__header" style={{ "--card-color": headerColor }}>
          <p className="detail-card__publisher">{api.publisher}</p>
          <h1 className="detail-card__title">{api.name}</h1>
        </div>

        {api.description && (
          <p className="detail-card__desc">{api.description}</p>
        )}

        <div className="detail-card__meta">
          {api.theme && (
            <div className="meta-item">
              <span className="meta-label">Tema</span>
              <span className="meta-value">{api.theme}</span>
            </div>
          )}

          {api.keywords?.length > 0 && (
            <div className="meta-item">
              <span className="meta-label">Nøkkelord</span>
              <div className="keyword-list">
                {api.keywords.map((kw) => (
                  <span key={kw} className="keyword-tag">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {api.endpoint ? (
          <div>
            <a
              href={api.endpoint}
              target="_blank"
              rel="noreferrer"
              className="api-link-btn"
            >
              Åpne API-endepunkt ↗
            </a>
            <p className="detail-card__link-note">
              Åpner API-et direkte — kan vise rå data i nettleseren.
            </p>
          </div>
        ) : (
          <p className="detail-card__no-link">Ingen lenke tilgjengelig</p>
        )}
      </div>
    </div>
  );
}
