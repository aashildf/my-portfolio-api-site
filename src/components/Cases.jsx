import { cases } from "../data/cases";

export default function Cases() {
  return (
    <section className="cases">
      <h2>Brukseksempler</h2>
      <div className="case-grid">
        {cases.map((item, index) => (
          <div key={index} className="case-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
