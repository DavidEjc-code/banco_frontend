import { useEffect, useState } from "react";
import api from "../services/api";

function TestConexion() {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");

useEffect(() => {
  api.get("/cliente/115") // este ID debe existir en tu DB
    .then(res => setClientes([res.data])) // envolver en array para mapear
    .catch(err => {
      console.error(err);
      setError("No se pudo conectar al backend");
    });
}, []);




return (
  <div style={{ padding: "1rem" }}>
    <h1>🔗 Prueba de conexión con el Backend</h1>
    {error && <p style={{ color: "red" }}>{error}</p>}
<ul>
  {clientes.length === 0 && !error && <li>No hay clientes disponibles</li>}
  {clientes.map((c, i) => (
    <li key={i}>
      {c.Nombre} {c.Paterno} {c.Materno} ({c.Email})
    </li>
  ))}
</ul>

  </div>
);



}

export default TestConexion;
