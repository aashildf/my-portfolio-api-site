import raw from "./dataservices.json";

export async function fetchApis() {
  const data = raw;

  return data.map((api) => ({
    id: api.id,
    name: api.title?.nb || api.title?.en || "Uten navn",
    description: api.description?.nb || api.description?.en || "",
    url: api.landingPage,
    publisher: api.publisher?.name || "Ukjent",
    keywords: api.keywords?.map((k) => k.label) || [],
    themes: api.themes?.map((t) => t.title) || [],
    endpoints: api.endpointURLs || [],
  }));
}
