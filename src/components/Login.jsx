import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [tipo, setTipo] = useState("cliente"); // cliente o negocio
  const [modoCliente, setModoCliente] = useState("cuenta"); // dpi o cuenta
  const [modoNegocio, setModoNegocio] = useState("nit"); // nit o cuenta
  const [identificador, setIdentificador] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username: identificador, // 👈 CORREGIDO: usamos el campo correcto
        password,
      });

      if (response.data.success) {
        console.log("✅ Login exitoso:", response.data);

        // Guardar token y usuario
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

        // Redirigir según tipo
        if (response.data.usuario.tipo === "cliente") {
          navigate("/bienvenida");
        } else if (response.data.usuario.tipo === "negocio") {
          navigate("/bienvenida-negocio");
        }
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err);
      setError("Error en el inicio de sesión. Verifica tus datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏦 BANCO TIKAL</h1>

      <div style={styles.switchContainer}>
        <button
          style={{
            ...styles.switchButton,
            backgroundColor: tipo === "cliente" ? "#007bff" : "#444",
          }}
          onClick={() => setTipo("cliente")}
        >
          Cliente
        </button>
        <button
          style={{
            ...styles.switchButton,
            backgroundColor: tipo === "negocio" ? "#007bff" : "#444",
          }}
          onClick={() => setTipo("negocio")}
        >
          Negocio
        </button>
      </div>

      <form onSubmit={handleLogin} style={styles.form}>
        {/* CLIENTE */}
        {tipo === "cliente" && (
          <>
            <div style={styles.radioContainer}>
              <label>
                <input
                  type="radio"
                  name="modoCliente"
                  value="dpi"
                  checked={modoCliente === "dpi"}
                  onChange={(e) => setModoCliente(e.target.value)}
                />
                Ingresar con DPI
              </label>
              <label>
                <input
                  type="radio"
                  name="modoCliente"
                  value="cuenta"
                  checked={modoCliente === "cuenta"}
                  onChange={(e) => setModoCliente(e.target.value)}
                />
                Ingresar con Cuenta
              </label>
            </div>

            <label style={styles.label}>
              {modoCliente === "dpi"
                ? "Número de DPI"
                : "Número de Cuenta del Cliente"}
            </label>
            <input
              style={styles.input}
              type="text"
              placeholder={
                modoCliente === "dpi" ? "Ej: 34567890123456" : "Ej: PF0809"
              }
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
            />
          </>
        )}

        {/* NEGOCIO */}
        {tipo === "negocio" && (
          <>
            <div style={styles.radioContainer}>
              <label>
                <input
                  type="radio"
                  name="modoNegocio"
                  value="nit"
                  checked={modoNegocio === "nit"}
                  onChange={(e) => setModoNegocio(e.target.value)}
                />
                Ingresar con NIT
              </label>
              <label>
                <input
                  type="radio"
                  name="modoNegocio"
                  value="cuenta"
                  checked={modoNegocio === "cuenta"}
                  onChange={(e) => setModoNegocio(e.target.value)}
                />
                Ingresar con Cuenta
              </label>
            </div>

            <label style={styles.label}>
              {modoNegocio === "nit"
                ? "Número de NIT"
                : "Número de Cuenta del Negocio"}
            </label>
            <input
              style={styles.input}
              type="text"
              placeholder={
                modoNegocio === "nit" ? "Ej: 852147963-2" : "Ej: tikal"
              }
              value={identificador}
              onChange={(e) => setIdentificador(e.target.value)}
            />
          </>
        )}

        <label style={styles.label}>Contraseña</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Validando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#222",
    borderRadius: "16px",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
    textAlign: "center",
    color: "#fff",
  },
  title: {
    marginBottom: "20px",
    fontSize: "1.5rem",
  },
  switchContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  switchButton: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  radioContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "10px",
    fontSize: "0.9rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    textAlign: "left",
    fontWeight: "600",
    marginTop: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #555",
    backgroundColor: "#333",
    color: "#fff",
  },
  button: {
    marginTop: "15px",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "13px",
  },
};

export default Login;
