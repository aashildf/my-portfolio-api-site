export async function fetchApis() {
  const res = await fetch(import.meta.env.BASE_URL + "data/apis.json");

  if (!res.ok) {
    throw new Error("Kunne ikke hente API-er");
  }

  const data = await res.json();

  return data.hits.map((source) => ({
    id: source.id,
    name: source.title?.nb || source.title?.en || "Uten navn",
    description: source.description?.nb || source.description?.en || "",
    publisher:
      source.organization?.prefLabel?.nb ||
      source.organization?.name ||
      "Ukjent",
    endpoint: source.uri || null,
    keywords: source.keyword || [],
    theme:
      source.dataTheme?.[0]?.title?.nb ||
      source.dataTheme?.[0]?.title?.en ||
      null,
  }));
}
