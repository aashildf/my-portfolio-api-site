import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => { document.title = "404 – Side ikke funnet | API-Studio"; }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", padding: "2rem" }}>
      <p style={{ fontSize: "5rem", fontWeight: 700, opacity: 0.12, lineHeight: 1 }}>404</p>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 500, color: "rgba(0,0,0,0.7)", margin: 0 }}>Siden finnes ikke</h1>
      <p style={{ fontSize: "0.95rem", color: "rgba(0,0,0,0.45)", margin: 0 }}>Lenken du fulgte peker ingen steder.</p>
      <button
        onClick={() => navigate("/")}
        style={{ marginTop: "0.5rem", background: "#989692", color: "white", border: "none", borderRadius: "40px", padding: "0.8rem 2rem", fontSize: "0.95rem", cursor: "pointer" }}
      >
        ← Til forsiden
      </button>
    </div>
  );
}
