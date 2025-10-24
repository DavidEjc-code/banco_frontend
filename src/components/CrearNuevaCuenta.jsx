import { useState } from "react";
import api from "../services/api";

function CrearCuentaNueva() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCrearCuenta = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const loginRes = await api.post("/auth/login", { username, password });

      if (!loginRes.data.success) {
        setMensaje("❌ Usuario o contraseña incorrectos.");
        setLoading(false);
        return;
      }

      const usuario = loginRes.data.usuario;
      const isCliente = usuario.tipo === "cliente";
      const userId = usuario.id;

      const cuentaRes = await api.post("/cuenta", {
        monedaId: "01",
        sucursalId: "001",
        empleadoId: 101,
        saldoInicial: 100,
        ...(isCliente ? { clienteId: userId } : { negocioId: userId }),
      });

      if (cuentaRes.data.CodigoCuenta) {
        setMensaje(
          `✅ Cuenta creada exitosamente\nCódigo: ${cuentaRes.data.CodigoCuenta}`
        );
      } else {
        setMensaje("❌ No se pudo crear la cuenta.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("⚠️ Error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h2>🆕 Crear Cuenta Nueva</h2>
      <p style={styles.subtitle}>
        Ingresa tus credenciales para crear automáticamente una cuenta.
      </p>

      <form style={styles.form} onSubmit={handleCrearCuenta}>
        <label style={styles.label}>Ingresa tu usuario:</label>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Ingresa tu contraseña:</label>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Procesando..." : "Crear Cuenta"}
        </button>
      </form>

      {mensaje && <pre style={styles.mensaje}>{mensaje}</pre>}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: "2rem",
  },
  subtitle: {
    color: "#aaa",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    maxWidth: "400px",
  },
  label: {
    color: "#ccc",
    fontSize: "0.9rem",
    marginBottom: "0.2rem",
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
    transition: "0.3s",
  },
  mensaje: {
    marginTop: "1.5rem",
    backgroundColor: "#333",
    padding: "1rem",
    borderRadius: "8px",
    whiteSpace: "pre-wrap",
  },
};

export default CrearCuentaNueva;
