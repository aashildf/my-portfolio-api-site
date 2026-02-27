


HUSK Å ENDRE FRA README.txt til README.md

--------------------------------------------------
ApiCarousel/ → alt som handler om karusellen

api-ui/ → alt som handler om API‑katalogen

data/ → alt som handler om datahenting

----------------------------------------------

🧩 Hvordan dette henger sammen i praksis

Karusellen (ApiCarousel)
→ viser kategorier eller utvalgte API‑er
→ bruker ApiCard.jsx  
→ får data som props (du bestemmer senere)

API‑listen (ApiList.jsx)
→ viser alle API‑ene i grid eller liste
→ bruker data fra fetchApis()  
→ senere kobles til søk og filtrering

API‑detaljer (ApiDetail.jsx)
→ viser info om ett API
→ brukes når man klikker på et kort

fetchApis.js
→ henter data
→ normaliserer data
→ brukes av ApiList, ApiCarousel, ApiDetail

