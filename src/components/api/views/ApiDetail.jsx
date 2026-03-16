import { useState } from "react";
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

export default function ApiDetail({ apis, isLoading, publisherGroups }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEndpointHelp, setShowEndpointHelp] = useState(false);
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
        {isLoading ? (
          <p>Laster...</p>
        ) : (
          <p>Ingen API funnet.</p>
        )}
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

        <div className="detail-card__links">
          <a
            href={`https://data.norge.no/data-services/${api.id}`}
            target="_blank"
            rel="noreferrer"
            className="api-link-btn"
          >
            Se på data.norge.no ↗
          </a>
          {api.endpoint && (
            <a
              href={api.endpoint}
              target="_blank"
              rel="noreferrer"
              className="api-link-btn api-link-btn--secondary"
            >
              API-endepunkt ↗
            </a>
          )}
        </div>

        {api.endpoint && (
          <div className="endpoint-help">
            <button
              className="endpoint-help__toggle"
              onClick={() => setShowEndpointHelp((v) => !v)}
            >
              Får du ikke opp API-endepunktet? {showEndpointHelp ? "▲" : "▼"}
            </button>
            {showEndpointHelp && (
              <p className="endpoint-help__text">
                API-endepunkter er maskinlesbare grensesnitt beregnet på programvare, ikke nettlesere. Når du åpner lenken kan du se rå data i JSON- eller XML-format, eller en helt tom side — det er normalt. For å bruke APIet trenger du vanligvis et programmeringsspråk som JavaScript, Python eller lignende, og gjerne en API-nøkkel fra tilbyderen. For mer informasjon om hvordan du kan bruke APIet, se dokumentasjonen på data.norge.no eller kontakt API-tilbyderen direkte.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
