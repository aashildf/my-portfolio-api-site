import "./categoryCard.css";

export default function CategoryCard({ name, image, color, count }) {
  return (
    <div
      className="cat-card"
      style={{ ...(image ? { "--cat-img": `url(${image})` } : {}), "--cat-color": color }}
    >
      <div className="cat-card__stamp">API Studio</div>

      <div className="cat-card__footer">
        <p className="cat-card__name">
          {name}
        </p>
        {count != null && (
          <p className="cat-card__count">{count} API-er</p>
        )}
      </div>
    </div>
  );
}
