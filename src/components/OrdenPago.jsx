import { useState } from "react";
import api from "../services/api"; // ✅ Usa tu instancia configurada

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
      const usuario = JSON.parse(localStorage.getItem("usuario"));

      if (!usuario) {
        setMensaje("❌ No se encontró información del usuario. Inicia sesión nuevamente.");
        return;
      }

      const clienteId = usuario.id;

      // ✅ Llamada al backend usando la instancia api
      const response = await api.post(
        `/cliente/${clienteId}/pagar-orden`,
        { codigoOrden, claveAcceso },
        { headers: { Authorization: `Bearer ${token}` } }
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
      <h1 style={styles.title}>Pagar Orden de Pago</h1>

      <div style={styles.card}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Código de Orden</label>
          <input
            type="text"
            value={codigoOrden}
            onChange={(e) => setCodigoOrden(e.target.value)}
            style={styles.input}
            placeholder="Ej: ORD1234567"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Clave de Acceso</label>
          <input
            type="password"
            value={claveAcceso}
            onChange={(e) => setClaveAcceso(e.target.value)}
            style={styles.input}
            placeholder="Ingresa tu clave"
          />
        </div>

        <button style={styles.button} onClick={handlePagarOrden}>
          Pagar Orden
        </button>

        {mensaje && <p style={styles.mensaje}>{mensaje}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "3rem auto",
    padding: "2rem",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 4px 25px rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "25px",
    color: "#f7fbfdff",
    letterSpacing: "1px",
  },
  card: {
    backgroundColor: "#2a2a2a",
    padding: "1.5rem",
    borderRadius: "16px",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.4)",
    textAlign: "left",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#ddd",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #555",
    backgroundColor: "#111",
    color: "#fff",
    fontSize: "1rem",
    transition: "border 0.3s, box-shadow 0.3s",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
    transition: "background-color 0.3s, transform 0.2s",
  },
  mensaje: {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#333",
    color: "#eee",
    textAlign: "center",
    whiteSpace: "pre-wrap",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },
};

export default OrdenPago;
