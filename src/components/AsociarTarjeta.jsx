import { useState } from "react";

function AsociarTarjeta() {
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleAsociar = (e) => {
    e.preventDefault();
    // Aquí pondrías la lógica real con tu API
    setMensaje(`✅ Tarjeta ${numeroTarjeta} asociada a la cuenta ${numeroCuenta}`);
  };

  return (
    <div style={styles.page}>
      <h2>💳 Servicio al Cliente - Asociar Tarjeta</h2>
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
        <input
          type="number"
          placeholder="Número de tarjeta"
          value={numeroTarjeta}
          onChange={(e) => setNumeroTarjeta(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Asociar Tarjeta
        </button>
      </form>

      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}
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
};

export default AsociarTarjeta;
