import { useState } from "react";
import api from "../services/api";

function Depositar() {
  const CUENTA_BASE = 143;

  const [cuentaDestino, setCuentaDestino] = useState("");
  const [monto, setMonto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDepositar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const response = await api.post(`/cliente/${CUENTA_BASE}/transferir`, {
        cuentaDestino: parseInt(cuentaDestino),
        monto: parseFloat(monto),
        concepto: "Depósito realizado",
      });

      if (response.data.success) {
        const { nombreDestino, cuentaDestino, monto } = response.data.data;
        setMensaje(
          `✅ Depósito realizado con éxito\n\nCuenta: ${cuentaDestino}\nTitular: ${nombreDestino}\nMonto depositado: Q${monto.toFixed(
            2
          )}`
        );
      } else {
        setMensaje("❌ No se pudo completar el depósito.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("⚠️ Error al procesar el depósito.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>💰 Depósitos</h2>
        <p style={styles.subtitle}>Ingresa la cuenta y el monto a depositar.</p>

        <form style={styles.form} onSubmit={handleDepositar}>
          <input
            type="number"
            placeholder="Número de cuenta"
            value={cuentaDestino}
            onChange={(e) => setCuentaDestino(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Monto (Q)"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Procesando..." : "Depositar"}
          </button>
        </form>

        {mensaje && <pre style={styles.mensaje}>{mensaje}</pre>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw", // 🔹 asegura que ocupe todo el ancho
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
    padding: "1rem",
  },
  card: {
    backgroundColor: "#2a2a2a",
    padding: "2.5rem",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    marginBottom: "0.5rem",
    fontSize: "1.8rem",
    color: "#646cff",
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#aaa",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.85rem",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    textAlign: "center",
    transition: "0.2s",
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
    transition: "0.3s",
  },
  mensaje: {
    marginTop: "1.5rem",
    backgroundColor: "#333",
    padding: "1rem",
    borderRadius: "8px",
    whiteSpace: "pre-wrap",
    textAlign: "left",
    fontSize: "0.95rem",
    lineHeight: "1.5",
  },
};

export default Depositar;
