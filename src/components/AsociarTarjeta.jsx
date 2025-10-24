import { useState } from "react";
import api from "../services/api"; // usa tu configuración de axios

function AsociarTarjeta() {
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [tarjetaInfo, setTarjetaInfo] = useState(null);

  const handleAsociar = async (e) => {
    e.preventDefault();
    setMensaje("");
    setTarjetaInfo(null);
    setLoading(true);

    try {
      const response = await api.post("/tarjeta/", {
        cuencodigo: Number(numeroCuenta),
      });

      const { success, message, data } = response.data;

      if (success) {
        setMensaje(`✅ ${message}`);
        setTarjetaInfo(data);
      } else {
        setMensaje("❌ No se pudo crear la tarjeta.");
      }
    } catch (error) {
      console.error("Error al asociar tarjeta:", error);
      setMensaje("⚠️ Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h2>💳Asociar Tarjeta</h2>
      <p style={styles.subtitle}>Asocia una tarjeta a la cuenta de un cliente.</p>

      <form style={styles.form} onSubmit={handleAsociar}>
        <input
          type="number"
          placeholder="Número de cuenta"
          value={numeroCuenta}
          onChange={(e) => setNumeroCuenta(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Procesando..." : "Asociar Tarjeta"}
        </button>
      </form>

      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}

      {tarjetaInfo && (
        <div style={styles.card}>
          <h3>💠 Tarjeta Generada</h3>
          <p><strong>Número:</strong> {tarjetaInfo.TarjetaGenerada}</p>
          <p><strong>CVV:</strong> {tarjetaInfo.CVVGenerado}</p>
          <p><strong>Expira:</strong> {tarjetaInfo.FechaExpiracion}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: "2rem",
    gap: "1rem",
  },
  subtitle: {
    color: "#aaa",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    maxWidth: "400px",
  },
  input: {
    padding: "0.85rem",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    textAlign: "center",
  },
  button: {
    padding: "0.85rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#646cff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
  },
  mensaje: {
    marginTop: "1rem",
    color: "#00e676",
  },
  card: {
    marginTop: "1.5rem",
    backgroundColor: "#2a2a2a",
    padding: "1rem 1.5rem",
    borderRadius: "12px",
    border: "1px solid #555",
    textAlign: "left",
    maxWidth: "400px",
  },
};

export default AsociarTarjeta;
