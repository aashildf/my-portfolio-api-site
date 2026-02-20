import { apiList } from "../../data/apiList";
import ApiCard from "./ApiCard";
import "./carousel.css";

export default function ApiCarousel() {
  return (
    <section className="carousel-section">
      <div className="carousel">
        {apiList.map((api, index) => (
          <ApiCard key={index} api={api} />
        ))}
      </div>
    </section>
  );
}
