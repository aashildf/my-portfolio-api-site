import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/dataservices", async (req, res) => {
  try {
    const response = await fetch(
      "https://search.api.fellesdatakatalog.digdir.no/search",
      {
        method: "POST", // 👈 VIKTIG
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: "",
          filters: {
            type: "data-service",
          },
          size: 100,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Digdir svarte med status: ${response.status}`);
    }

    const data = await response.json();

    // search API legger resultatene i hits
    res.json(data.hits || []);
  } catch (err) {
    console.error("SERVER FEIL:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log("Proxy server kjører på http://localhost:3001");
});
