import { useState } from "react";
import api from "../services/api";
import axios from "axios";


function OrdenPago() {
  const [codigoOrden, setCodigoOrden] = useState("");
  const [claveAcceso, setClaveAcceso] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handlePagarOrden = async () => {
    if (!codigoOrden || !claveAcceso) {
      setMensaje("⚠️ Por favor completa todos los requisitos: Código de Orden y Clave de Acceso.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

const response = await axios.post(
  `https://banco-gt-api-aa7d620b23f8.herokuapp.com/api/v1/cliente/107/pagar-orden`,
  {
    codigoOrden,
    claveAcceso,
  },
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);


      if (response.data.success) {
        setMensaje(`✅ Orden pagada exitosamente: ${codigoOrden}`);
        setCodigoOrden("");
        setClaveAcceso("");
      } else {
        setMensaje(`❌ ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error pagando orden:", error);
      setMensaje("❌ Ocurrió un error al procesar la orden.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>💳 Pagar Orden de Pago</h1>

      {/* Texto de requisitos sobre los inputs */}
      <p style={styles.requisitos}>Requisitos:</p>
      <p style={styles.requisitosText}>• Código de Orden (Ej: ORD1234567)</p>
      <p style={styles.requisitosText}>• Clave de Acceso proporcionada por el banco</p>

      <input
        type="text"
        value={codigoOrden}
        onChange={(e) => setCodigoOrden(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        value={claveAcceso}
        onChange={(e) => setClaveAcceso(e.target.value)}
        style={styles.input}
      />

      <button style={styles.button} onClick={handlePagarOrden}>
        Pagar Orden
      </button>

      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "3rem auto",
    padding: "2rem",
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 0 25px rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "#00bfff",
  },
  requisitos: {
    textAlign: "left",
    fontWeight: "600",
    marginTop: "10px",
    marginBottom: "2px",
  },
  requisitosText: {
    textAlign: "left",
    fontSize: "0.9rem",
    margin: "0 0 8px 0",
    color: "#ccc",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #555",
    backgroundColor: "#111",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  mensaje: {
    marginTop: "15px",
    whiteSpace: "pre-wrap",
  },
};

export default OrdenPago;
