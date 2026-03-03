


HUSK Å ENDRE FRA README.txt til README.md


Bygget en Express-proxy som prosesserer offentlig DCAT-data og eksponerer et optimalisert REST-endpoint til React frontend.
En utforskningsportal for API-er fra Felles datakatalog

--------------------------------------------------
ApiCarousel/ → alt som handler om karusellen

api/ → alt som handler om API‑katalogen

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


trengs litt backend for å hente og vise alle apier: 
Du lager en liten proxy som kjører sammen med Vite.
Frontend → din proxy → data.norge.no → frontend
→ CORS er løst.

-installer Express: npm install express
-Lag en ny fil i rotmappen (samme nivå som package.json):
-server.js

Dette gjør:

kjører en liten server på localhost:3001

henter ekte data fra data.norge.no

legger på CORS‑header

sender dataene videre til frontend

'Express trenger cors for å tillate at frontend får lov til å hente data fra backend‑en din.
Det er en helt vanlig del av en proxy‑server:

-installer cors:
-npm install cors
-svar ja på spm om tilgang