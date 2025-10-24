import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import TestConexion from "./components/TestConexion";
import Login from "./components/Login";
import Bienvenida from "./components/Bienvenida";
import Transferencias from "./components/Transferencias";
import OrdenPago from "./components/OrdenPago";
import CrearCuenta from "./components/CrearCuenta";
import Depositar from "./components/Depositar";
import CrearNuevaCuenta from "./components/CrearNuevaCuenta";
import AsociarTarjeta from "./components/AsociarTarjeta";
import BienvenidaNegocio from "./components/BienvenidaNegocio";
import fondo from "./assets/fondo.jpg";


// --- PÁGINA PRINCIPAL ---
function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>BANCO TIKAL</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/dashboard")}>
          Ventanilla
        </button>
        <button style={styles.button} onClick={() => navigate("/reporte")}>
          Servicio al Cliente
        </button>
        <button style={styles.button} onClick={() => navigate("/configuracion")}>
          Área de Créditos
        </button>
        <button style={styles.button} onClick={() => navigate("/acerca")}>
          Área Virtual
        </button>
      </div>
    </div>
  );
}

// --- PÁGINAS SECUNDARIAS ---
function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <h2>🏦 Ventanilla</h2>
      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button style={styles.button} onClick={() => navigate("/crear-cuenta")}>
          Crear Cuenta
        </button>
        <button style={styles.button} onClick={() => navigate("/depositar")}>
          Depositar
        </button>
      </div>
    </div>
  );
}

function Reporte() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <h2>📋 Servicio al Cliente</h2>
      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexDirection: "column" }}>
        <button
          style={styles.button}
          onClick={() => navigate("/servicio/crear-cuenta")}
        >
          Crear Nueva Cuenta
        </button>
        <button
          style={styles.button}
          onClick={() => navigate("/servicio/asociar-tarjeta")}
        >
          Asociar Tarjeta
        </button>
      </div>
    </div>
  );
}

function Configuracion() {
  return (
    <div style={styles.page}>
      <TestConexion />
    </div>
  );
}

function Acerca() {
  return (
    <div style={styles.page}>
      <Login />
    </div>
  );
}

function BienvenidaPage() {
  return <Bienvenida />;
}

// --- APP PRINCIPAL ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reporte" element={<Reporte />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/bienvenida" element={<BienvenidaPage />} />
        <Route path="/transferencias" element={<Transferencias />} />
        <Route path="/orden-pago" element={<OrdenPago />} />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/depositar" element={<Depositar />} />
        <Route path="/servicio/crear-cuenta" element={<CrearNuevaCuenta />} />
        <Route path="/servicio/asociar-tarjeta" element={<AsociarTarjeta />} />
        <Route path="/bienvenida-negocio" element={<BienvenidaNegocio />} />
      </Routes>
    </Router>
  );
}

// --- ESTILOS ---
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100vw", // 🔹 asegura que ocupe todo el ancho
    backgroundImage: `url(${fondo})`,
    backgroundSize: "cover",       // hace que ocupe toda la pantalla
    backgroundPosition: "center",  // centra la imagen
    backgroundRepeat: "no-repeat", // evita que se repita
    color: "#fff",
    gap: "2rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textShadow: "2px 2px 8px #000", // mejora la legibilidad
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  button: {
    padding: "1rem 2rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "rgba(100,108,255,0.85)",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
  },
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    width: "100vw", // 🔹 asegura que ocupe todo el ancho
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    fontSize: "1.2rem",
  },
};


export default App;
