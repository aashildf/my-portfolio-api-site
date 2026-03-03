import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(cors());

app.get("/api/dataservices", (req, res) => {
  try {
  const raw = fs.readFileSync(path.join(__dirname, "snapshot/apis.json"));
    const data = JSON.parse(raw);

    const cleaned = data.hits.map((source) => ({
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

    res.json(cleaned);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke lese snapshot" });
  }
});

app.listen(3001, () => {
  console.log("Proxy server kjører på http://localhost:3001");
});
