import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Bienvenida() {
  const [cliente, setCliente] = useState(null);
  const [showDatos, setShowDatos] = useState(false);
  const [showCuenta, setShowCuenta] = useState(false);
  const [mensaje, setMensaje] = useState(""); // 🔹 Nuevo estado para el mensaje temporal
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setCliente(JSON.parse(usuarioGuardado));
    }
  }, []);

  const obtenerSaludo = () => {
    if (!cliente) return "";
    return `Bienvenido${cliente.genero === "F" ? "a" : ""}, ${cliente.nombre}`;
  };

  const handleTarjetas = () => {
    setMensaje("🚧 Sección de Tarjetas en mantenimiento 🚧");
    setTimeout(() => setMensaje(""), 3000); // Limpia el mensaje después de 3 segundos
  };

  if (!cliente) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando datos...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏦 BANCO TIKAL</h1>
      <h2 style={styles.welcome}>{obtenerSaludo()}</h2>

      {/* Botón: Datos Personales */}
      <button style={styles.button} onClick={() => setShowDatos(!showDatos)}>
        {showDatos ? "Ocultar Datos Personales" : "Datos de la Cuenta"}
      </button>

      {showDatos && (
        <div style={styles.infoBox}>
          <p><strong>DPI:</strong> {cliente.dpi}</p>
          <p><strong>Email:</strong> {cliente.email}</p>
          <p><strong>Teléfono:</strong> {cliente.telefono}</p>
          <p><strong>Ciudad:</strong> {cliente.ciudad}</p>
          <p><strong>Dirección:</strong> {cliente.direccion}</p>
        </div>
      )}

      {/* Botón: Cuenta */}
      <button style={styles.button} onClick={() => setShowCuenta(!showCuenta)}>
        {showCuenta ? "Ocultar Cuenta" : "Cuenta"}
      </button>

      {showCuenta && (
        <div style={styles.infoBox}>
          <p><strong>Número de cuenta:</strong> {cliente.cuentas?.[0]?.int_cuencodigo}</p>
          <p><strong>Saldo:</strong> Q {cliente.cuentas?.[0]?.dec_cuensaldo?.toFixed(2)}</p>
        </div>
      )}

      {/* Botón: Transferencias */}
      <button
        style={{ ...styles.button, backgroundColor: "#007bff" }}
        onClick={() => navigate("/transferencias")}
      >
        💸 Transferencias
      </button>

      {/* Botón: Orden de Pago */}
      <button
        style={{ ...styles.button, backgroundColor: "#28a745" }}
        onClick={() => navigate("/orden-pago")}
      >
        🧾 Pagar Orden de Pago
      </button>

      {/* Botón: Tarjetas */}
      <button
        style={{ ...styles.button, backgroundColor: "#ff9800" }}
        onClick={handleTarjetas}
      >
        💳 Tarjetas
      </button>

      {/* Mensaje de mantenimiento */}
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
    fontSize: "1.8rem",
    marginBottom: "10px",
  },
  welcome: {
    fontSize: "1.3rem",
    marginBottom: "25px",
    color: "#00bfff",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#444",
    border: "none",
    color: "#fff",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
  infoBox: {
    backgroundColor: "#333",
    borderRadius: "10px",
    padding: "10px",
    marginTop: "10px",
    textAlign: "left",
    fontSize: "0.95rem",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
  },
  mensaje: {
    marginTop: "15px",
    color: "#ffcc00",
    fontWeight: "bold",
  },
};

export default Bienvenida;
