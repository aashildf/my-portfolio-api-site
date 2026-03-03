export async function fetchApis() {
  const res = await fetch("http://localhost:3001/api/dataservices");

  if (!res.ok) {
    throw new Error("Kunne ikke hente API-er");
  }

  return await res.json();
}
