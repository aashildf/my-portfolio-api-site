export async function fetchApis() {
  const response = await fetch("http://localhost:3001/api/dataservices");

  if (!response.ok) {
    throw new Error("Kunne ikke hente API-data");
  }

  const data = await response.json();

  return data.map((api) => ({
    id: api.id,
    name: api.title?.nb || api.title?.en || "Uten navn",
    description: api.description?.nb || api.description?.en || "",
    publisher:
      api.catalog?.publisher?.prefLabel?.nb ||
      api.catalog?.publisher?.name ||
      "Ukjent",
    uri: api.uri,
  }));
}
