import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function BienvenidaNegocio() {
  const [negocio, setNegocio] = useState(null);
  const [showDatos, setShowDatos] = useState(false);
  const [showCuenta, setShowCuenta] = useState(false);
  const [showMovimientos, setShowMovimientos] = useState(false);
  const [movimientos, setMovimientos] = useState([]);
  const [showTarjetas, setShowTarjetas] = useState(false);
  const [tarjetas, setTarjetas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setNegocio(JSON.parse(usuarioGuardado));
    }
  }, []);

  const obtenerSaludo = () => {
    if (!negocio) return "";
    return `Bienvenido(a), ${negocio.nombreComercial || negocio.nombre}`;
  };

  const handleMovimientos = async () => {
    if (!negocio) return;
    setShowMovimientos(!showMovimientos);

    if (movimientos.length > 0) return;

    try {
      const token = localStorage.getItem("token");
      const negocioId = negocio.id;
      const response = await api.get(`/negocio/${negocioId}/movimientos?limite=5`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setMovimientos(response.data.data.movimientos);
      } else {
        setMensaje("❌ No se pudieron obtener los movimientos del negocio.");
      }
    } catch (error) {
      console.error("Error obteniendo movimientos del negocio:", error);
      setMensaje("❌ Ocurrió un error al obtener los movimientos.");
    }
  };

 const handleCerrarSesion = () => {
  localStorage.removeItem("usuario");
  navigate("/"); // redirige al login o página principal
};

  const handleTarjetas = async () => {
    if (!negocio) return;
    setShowTarjetas(!showTarjetas);

    if (tarjetas.length > 0) return;

    try {
      const token = localStorage.getItem("token");
      const negocioId = negocio.id;

      const response = await api.get(`/tarjeta/negocio/${negocioId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setTarjetas(response.data.data);
      } else {
        setMensaje("❌ No se pudieron obtener las tarjetas del negocio.");
      }
    } catch (error) {
      console.error("Error obteniendo tarjetas:", error);
      setMensaje("❌ Ocurrió un error al obtener las tarjetas.");
    }
  };

  if (!negocio) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando datos...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏦 BANCO TIKAL</h1>
      <h2 style={styles.welcome}>{obtenerSaludo()}</h2>

      {/* Botón: Datos del negocio */}
      <button style={styles.button} onClick={() => setShowDatos(!showDatos)}>
        {showDatos ? "Ocultar Datos del Negocio" : "Datos del Negocio"}
      </button>

      {showDatos && (
        <div style={styles.infoBox}>
          <p><strong>NIT:</strong> {negocio.nit}</p>
          <p><strong>Email:</strong> {negocio.email}</p>
          <p><strong>Teléfono:</strong> {negocio.telefono}</p>
          <p><strong>Ciudad:</strong> {negocio.ciudad}</p>
          <p><strong>Dirección:</strong> {negocio.direccion}</p>
        </div>
      )}

      {/* Botón: Cuenta */}
      <button style={styles.button} onClick={() => setShowCuenta(!showCuenta)}>
        {showCuenta ? "Ocultar Cuenta" : "Cuenta"}
      </button>

      {showCuenta && (
        <div style={styles.infoBox}>
          {negocio.cuentas && negocio.cuentas.length > 0 ? (
            negocio.cuentas.map((cuenta, index) => (
              <div key={index} style={styles.cuentaBox}>
                <p><strong>Número de cuenta:</strong> {cuenta.int_cuencodigo}</p>
                <p><strong>Saldo:</strong> Q {cuenta.dec_cuensaldo?.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>❌ No se encontraron cuentas asociadas.</p>
          )}
        </div>
      )}

      {/* Botón: Movimientos */}
      <button style={{ ...styles.button, backgroundColor: "#6c5ce7" }} onClick={handleMovimientos}>
        {showMovimientos ? "Ocultar Movimientos" : "Movimientos Recientes"}
      </button>

      {showMovimientos && movimientos.length > 0 && (
        <div style={styles.infoBox}>
          {movimientos.map((mov) => (
            <div key={mov.movimientoNumero} style={styles.movItem}>
              <p><strong>Fecha:</strong> {new Date(mov.fecha).toLocaleString()}</p>
              <p><strong>Tipo:</strong> {mov.tipoCodigo === 1 ? "Depósito" : "Retiro"}</p>
              <p><strong>Monto:</strong> Q {mov.importe.toFixed(2)}</p>
              <p><strong>Cuenta Referencia:</strong> {mov.cuentaId}</p>
              <p><strong>Transacción:</strong> {mov.transaccionId}</p>
            </div>
          ))}
        </div>
      )}

      {/* Botón: Ver Tarjetas */}
      <button
        style={{ ...styles.button, backgroundColor: "#ff9800" }}
        onClick={handleTarjetas}
      >
        💳 {showTarjetas ? "Ocultar Tarjetas" : "Tarjetas Asociadas"}
      </button>

      {showTarjetas && tarjetas.length > 0 && (
        <div style={styles.infoBox}>
          {tarjetas.map((t, index) => (
            <div key={index} style={styles.tarjetaBox}>
              <p><strong>Tipo:</strong> {t.tarjetaTipo}</p>
              <p><strong>Número:</strong> {t.tarjetaMask}</p>
              <p><strong>Estado:</strong> {t.tarjetaEstado}</p>
              <p><strong>Vence:</strong> {new Date(t.fechaVencimiento).toLocaleDateString()}</p>
              <p><strong>Cuenta Asociada:</strong> {t.cuentaId}</p>
            </div>
          ))}
        </div>
      )}

      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}
      <button
  style={{ ...styles.button, backgroundColor: "#e74c3c" }}
  onClick={handleCerrarSesion}
>
  🔒 Cerrar Sesión
</button>

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
  movItem: {
    marginBottom: "8px",
    borderBottom: "1px solid #555",
    paddingBottom: "4px",
  },
  tarjetaBox: {
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "0 0 6px rgba(0,0,0,0.3)",
  },
  cuentaBox: {
    backgroundColor: "#2a2a2a",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "0 0 6px rgba(0,0,0,0.3)",
  },
  mensaje: {
    marginTop: "15px",
    color: "#ffcc00",
    fontWeight: "bold",
  },
};

export default BienvenidaNegocio;
