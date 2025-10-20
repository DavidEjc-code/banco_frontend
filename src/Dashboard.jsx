// src/components/Dashboard.jsx
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // 🔹 Llamar a un cliente que exista en la base de datos
    api.get("/cliente/102", { headers: { 'Cache-Control': 'no-cache' } })
      .then(res => {
        // Respuesta del backend
        // Envuelvo en array para poder mapearlo
        setClientes([res.data]);
      })
      .catch(err => {
        console.error(err);
        setError("❌ No se pudo conectar al backend");
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1>🏦 Ventanilla</h1>
      <h2>🔗 Prueba de conexión con el Backend</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {clientes.map((c, i) => (
          <li key={i} style={styles.item}>
            <strong>Nombre:</strong> {c.Nombre} {c.Paterno} {c.Materno}<br/>
            <strong>Email:</strong> {c.Email || "No registrado"}<br/>
            <strong>DNI:</strong> {c.DNI}
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- ESTILOS ---
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem"
  },
  item: {
    backgroundColor: "#242424",
    padding: "1rem",
    borderRadius: "8px",
    width: "300px",
    marginBottom: "1rem"
  }
};
