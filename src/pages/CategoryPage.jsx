import { useParams } from "react-router-dom";
import ApiList from "../components/api/views/ApiList";

export default function CategoryPage({ apis, publisherGroups }) {
  const { slug } = useParams();

  const decodedCategory = decodeURIComponent(slug);

  const filteredApis = apis.filter((api) =>
    publisherGroups[decodedCategory]?.includes(api.publisher),
  );

  return (
    <div style={{ padding: "4rem 2rem" }}>
      <h1>{decodedCategory}</h1>
      <ApiList apis={filteredApis} />
    </div>
  );
}
