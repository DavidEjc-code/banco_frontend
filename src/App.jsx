import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import TestConexion from "./components/TestConexion";
import Login from "./components/Login";
import Bienvenida from "./components/Bienvenida";
import Transferencias from "./components/Transferencias";
import OrdenPago from "./components/OrdenPago";

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
  return (
    <div>
      <h2>🏦 Ventanilla</h2>
    </div>
  );
}

function Reporte() {
  return (
    <div style={styles.page}>
      <h2>📋 Servicio al Cliente</h2>
    </div>
  );
}

function Configuracion() {
  return (
    <div>
      <h2>💳 Área de Créditos</h2>
      <TestConexion />
    </div>
  );
}

// 🌐 --- ÁREA VIRTUAL (ahora con login incluido) ---
function Acerca() {
  return (
    <div >
      <div>
        <h2></h2>
        <Login />
      </div>
    </div>
  );
}

// 🎉 Página de bienvenida tras iniciar sesión
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
        <Route path="/" element={<Login />} />
        <Route path="/bienvenida" element={<Bienvenida />} />
        <Route path="/transferencias" element={<Transferencias />} />
        <Route path="/orden-pago" element={<OrdenPago />} />
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
    backgroundColor: "#242424",
    color: "#fff",
    gap: "2rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
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
    backgroundColor: "#646cff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
  },
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    fontSize: "1.2rem",
  },
};

export default App;
